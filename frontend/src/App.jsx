
import { useState } from 'react'
import './App.css'
import GenerateQuizTab from './components/GenerateQuizTab'
import HistoryTab from './components/HistoryTab'

export default function App() {
  const [activeTab, setActiveTab] = useState('generate')

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">AI Wiki Quiz Generator</h1>
        <p className="app-subtitle">Generate intelligent quizzes from Wikipedia articles</p>
      </header>

      <div className="tab-container">
        <button
          className={`tab-button ${activeTab === 'generate' ? 'active' : ''}`}
          onClick={() => setActiveTab('generate')}
        >
          Generate Quiz
        </button>
        <button
          className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          History
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'generate' ? (
          <GenerateQuizTab />
        ) : (
          <HistoryTab />
        )}
      </div>
    </div>
  )
}
