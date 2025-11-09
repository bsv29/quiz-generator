const BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

async function handleRes(res) {
  if (!res.ok) {
    let errorMessage = res.statusText
    try {
      const data = await res.json()
      errorMessage = data.error || data.detail || JSON.stringify(data)
    } catch {
      const text = await res.text()
      if (text) errorMessage = text
    }
    throw new Error(errorMessage)
  }
  return res.json()
}

export async function generateQuiz(url) {
  try {
    const res = await fetch(`${BASE}/generate_quiz`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    })
    return handleRes(res)
  } catch (err) {
    if (err.message === 'Failed to fetch' || err.name === 'TypeError') {
      throw new Error(`Cannot connect to backend at ${BASE}. Make sure the server is running.`)
    }
    throw err
  }
}

export async function getHistory() {
  try {
    const res = await fetch(`${BASE}/history`)
    return handleRes(res)
  } catch (err) {
    if (err.message === 'Failed to fetch' || err.name === 'TypeError') {
      throw new Error(`Cannot connect to backend at ${BASE}. Make sure the server is running.`)
    }
    throw err
  }
}

export async function getQuiz(id) {
  try {
    const res = await fetch(`${BASE}/quiz/${id}`)
    return handleRes(res)
  } catch (err) {
    if (err.message === 'Failed to fetch' || err.name === 'TypeError') {
      throw new Error(`Cannot connect to backend at ${BASE}. Make sure the server is running.`)
    }
    throw err
  }
}
