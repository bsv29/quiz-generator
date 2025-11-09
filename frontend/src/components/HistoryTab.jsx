import { useEffect, useState } from 'react'
import { getHistory as apiHistory, getQuiz as apiGetQuiz } from '../services/api'
import Modal from './Modal'
import QuizDisplay from './QuizDisplay'
import './HistoryTab.css'

export default function HistoryTab() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedQuiz, setSelectedQuiz] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    fetchHistory()
  }, [])

  async function fetchHistory() {
    setLoading(true)
    try {
      const h = await apiHistory()
      setHistory(h)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function openDetails(id) {
    try {
      const q = await apiGetQuiz(id)
      setSelectedQuiz(q)
      setModalOpen(true)
    } catch (err) {
      console.error(err)
      alert('Failed to fetch quiz details')
    }
  }

  return (
    <div className="history-tab">
      <div className="history-header">
        <h2 className="history-title">Quiz History</h2>
      </div>

      {loading ? (
        <div className="loading-state">
          <span className="loading-spinner"></span>
          Loading history...
        </div>
      ) : history.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📚</div>
          <p>No quiz history yet. Generate your first quiz to get started!</p>
        </div>
      ) : (
        <div className="history-table-container">
          <table className="history-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>URL</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {history.map((r) => (
                <tr key={r.id}>
                  <td className="history-id">#{r.id}</td>
                  <td className="history-title-cell">{r.title || 'Untitled'}</td>
                  <td className="history-url" title={r.url}>{r.url}</td>
                  <td className="history-date">{new Date(r.date_generated).toLocaleString()}</td>
                  <td>
                    <button className="details-button" onClick={() => openDetails(r.id)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && selectedQuiz && (
        <Modal onClose={() => setModalOpen(false)}>
          <QuizDisplay quiz={selectedQuiz} />
        </Modal>
      )}
    </div>
  )
}
