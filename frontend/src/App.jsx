import { useState, useEffect } from 'react'
import CodeExplorer from './components/CodeExplorer'
import PreviewWindow from './components/PreviewWindow'
import AgentControl from './components/AgentControl'
import LogsPanel from './components/LogsPanel'
import api from './services/api'

function App() {
  const [health, setHealth] = useState(null)
  const [agents, setAgents] = useState([])

  useEffect(() => {
    api.get('/health').then(res => setHealth(res.data)).catch(err => console.error(err))
    api.get('/agents').then(res => setAgents(res.data)).catch(err => console.error(err))
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-gradient-to-r from-purple-900 to-black border-b border-purple-700 p-4">
        <h1 className="text-3xl font-bold neon-text">⚡ VibeCode Suite</h1>
        <p className="text-sm text-purple-300">Ruthless. Fast. Automated.</p>
        {health && <span className="text-xs text-green-400">Backend: {health.status}</span>}
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        <div className="w-1/4 border-r border-purple-900 bg-gray-900">
          <CodeExplorer />
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-4">
            <PreviewWindow />
          </div>
          <div className="h-48 border-t border-purple-900">
            <LogsPanel />
          </div>
        </div>

        <div className="w-1/4 border-l border-purple-900 bg-gray-900">
          <AgentControl agents={agents} />
        </div>
      </div>
    </div>
  )
}

export default App
