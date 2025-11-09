import { useState } from 'react'
import { generateQuiz as apiGenerate } from '../services/api'
import QuizDisplay from './QuizDisplay'
import './GenerateQuizTab.css'

export default function GenerateQuizTab() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [quiz, setQuiz] = useState(null)
  const [error, setError] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!url) {
      setError('Please enter a Wikipedia URL')
      return
    }
    setLoading(true)
    setQuiz(null)
    try {
      const data = await apiGenerate(url)
      setQuiz(data)
    } catch (err) {
      setError(err.message || 'Failed to generate quiz')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="generate-quiz-tab">
      <form onSubmit={onSubmit} className="quiz-form">
        <div className="form-group">
          <input
            type="text"
            className="url-input"
            placeholder="https://en.wikipedia.org/wiki/Example"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={loading}
          />
          <button type="submit" className="generate-button" disabled={loading}>
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Generating...
              </>
            ) : (
              'Generate Quiz'
            )}
          </button>
        </div>
      </form>

      {loading && (
        <div className="loading-state">
          <span className="loading-spinner"></span>
          Generating quiz from Wikipedia article — please wait...
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      {quiz && (
        <div className="quiz-result-container">
          <QuizDisplay quiz={quiz} />
        </div>
      )}
    </div>
  )
}
