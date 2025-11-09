import './QuizDisplay.css'

export default function QuizDisplay({ quiz }) {
  if (!quiz) return null

  return (
    <div className="quiz-display">
      <div className="quiz-header">
        <h3 className="quiz-title">{quiz.title || 'Untitled Quiz'}</h3>
        {quiz.summary && <p className="quiz-summary">{quiz.summary}</p>}
      </div>

      {quiz.questions && quiz.questions.length > 0 && (
        <div className="quiz-questions">
          <h4 className="questions-title">Questions</h4>
          <ol className="questions-list">
            {quiz.questions.map((q, i) => (
              <li key={i} className="question-item">
                <div className="question-text">{q.question}</div>
                <ul className="options-list">
                  {q.options.map((opt, idx) => (
                    <li
                      key={idx}
                      className={`option-item ${idx === q.correct_index ? 'correct' : ''}`}
                    >
                      <input
                        type="radio"
                        name={`q-${i}`}
                        className="option-radio"
                        disabled
                        checked={idx === q.correct_index}
                      />
                      <span className="option-text">{opt}</span>
                      {idx === q.correct_index && (
                        <span className="correct-badge">Correct</span>
                      )}
                    </li>
                  ))}
                </ul>
                {q.explanation && (
                  <div className="question-explanation">
                    <strong>Explanation:</strong> {q.explanation}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}

      {quiz.keywords && quiz.keywords.length > 0 && (
        <div className="quiz-keywords">
          <div className="keywords-title">Keywords</div>
          <div className="keywords-list">
            {quiz.keywords.map((keyword, idx) => (
              <span key={idx} className="keyword-tag">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
