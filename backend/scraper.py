import requests
from bs4 import BeautifulSoup


def scrape_wikipedia(url: str) -> tuple[str, str]:
    """Fetch a Wikipedia article and return (title, clean_text).

    This function aims to extract the main article paragraphs while removing
    reference superscripts, tables and non-content elements.
    """
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    resp = requests.get(url, headers=headers, timeout=15)
    resp.raise_for_status()

    soup = BeautifulSoup(resp.text, "html.parser")

    # Title
    title_tag = soup.find("h1", id="firstHeading")
    title = title_tag.get_text(strip=True) if title_tag else ""

    # Main content area
    content = soup.find(id="mw-content-text") or soup.find("#content")
    if not content:
        # fallback: use body
        content = soup

    # Remove tables, infoboxes, navboxes, and reference lists
    for selector in content.find_all(["table", "sup", "aside", "style", "script"]):
        selector.decompose()

    # Extract text from paragraphs
    paragraphs = content.find_all("p")
    text_parts = []
    for p in paragraphs:
        txt = p.get_text(strip=True)
        if txt:
            text_parts.append(txt)

    clean_text = "\n\n".join(text_parts)
    return title, clean_text
