import { useState } from 'react'
import api from '../services/api'

export default function AgentControl({ agents }) {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const runAgent = async (agentId) => {
    setLoading(true)
    try {
      const res = await api.post(`/agents/${agentId}/run`, { input: 'test' })
      setResult(res.data)
    } catch (err) {
      setResult({ error: err.message })
    }
    setLoading(false)
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold text-purple-400 mb-4">🤖 Agent Control</h2>
      <div className="space-y-3">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-gray-800 p-3 rounded border border-purple-900">
            <h3 className="font-semibold text-purple-300">{agent.name}</h3>
            <p className="text-xs text-gray-400 mb-2">{agent.description}</p>
            <button 
              onClick={() => runAgent(agent.id)}
              disabled={loading}
              className="w-full px-3 py-1 bg-purple-700 hover:bg-purple-600 rounded text-sm disabled:opacity-50"
            >
              {loading ? 'Running...' : 'Deploy Agent'}
            </button>
          </div>
        ))}
      </div>
      {result && (
        <div className="mt-4 p-3 bg-gray-800 rounded text-xs">
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
