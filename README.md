# AI Wiki Quiz Generator

This repository contains a scaffold for an AI-powered quiz generator that:
- Accepts a Wikipedia URL
- Scrapes the article and cleans text
- Generates a multiple-choice quiz (5-10 questions)
- Stores the source, scraped text, and quiz JSON in a database

This scaffold focuses on a fully working Python backend (FastAPI) and a minimal frontend scaffold with instructions to set up React + Vite + Tailwind.

## Quick start — backend (Windows PowerShell)

1. Open PowerShell and create a venv inside `backend`:

```powershell
cd "c:\Users\BH V S S N RAJU\Desktop\projects\ai_quiz_generator\backend"
python -m venv venv
# activate
venv\Scripts\activate

# install dependencies
pip install -r requirements.txt
```

2. (Optional) Add your Gemini API key as an environment variable (if you plan to wire LangChain/Gemini):

```powershell
setx GEMINI_API_KEY "YOUR_KEY_HERE"
# restart shell after setx or use $Env:GEMINI_API_KEY = 'KEY'
```

3. Run the backend:

```powershell
# from backend folder with venv activated
uvicorn backend.main:app --reload --port 8000
```

4. Endpoints:
- POST /generate_quiz — body: { "url": "https://en.wikipedia.org/wiki/Example" }
- GET /history — list of saved quizzes
- GET /quiz/{id} — get quiz JSON

## Notes / assumptions
- For fast local development, the scaffold uses SQLite (file: `backend/quiz_history.db`). You can change `backend/database.py` to use Postgres/MySQL.
- Gemini/LangChain path is left as an optional integration; a robust fallback quiz generator is included so you can run and test immediately without API keys.

## Frontend
A simple `frontend` scaffold and README were created with instructions to initialize a React + Vite + Tailwind app that talks to the FastAPI backend.

---
If you want, I can now:
- Implement a real LangChain + Gemini integration (requires your GEMINI_API_KEY)
- Create a full React + Vite + Tailwind app files and wire API calls
- Add tests for the backend endpoints

Tell me which of these to do next and I'll continue.  