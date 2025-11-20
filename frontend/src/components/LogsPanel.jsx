import { useState, useEffect } from 'react'

export default function LogsPanel() {
  const [logs, setLogs] = useState([
    { time: new Date().toISOString(), level: 'info', message: 'VibeCode Suite initialized' },
    { time: new Date().toISOString(), level: 'success', message: 'Backend connected' }
  ])

  return (
    <div className="h-full bg-black p-4 overflow-y-auto">
      <h3 className="text-sm font-bold text-purple-400 mb-2">📊 Logs & Build Output</h3>
      <div className="space-y-1 font-mono text-xs">
        {logs.map((log, idx) => (
          <div key={idx} className={`${log.level === 'error' ? 'text-red-400' : log.level === 'success' ? 'text-green-400' : 'text-gray-400'}`}>
            [{log.time.split('T')[1].split('.')[0]}] {log.message}
          </div>
        ))}
      </div>
    </div>
  )
}
