import { useState } from 'react'

export default function CodeExplorer() {
  const [files] = useState([
    { name: 'frontend/', type: 'folder' },
    { name: 'backend/', type: 'folder' },
    { name: 'agents/', type: 'folder' },
    { name: 'docker-compose.yml', type: 'file' }
  ])

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold text-purple-400 mb-4">📁 Code Explorer</h2>
      <div className="space-y-2">
        {files.map((file, idx) => (
          <div key={idx} className="text-sm hover:bg-purple-900 p-2 rounded cursor-pointer">
            {file.type === 'folder' ? '📂' : '📄'} {file.name}
          </div>
        ))}
      </div>
    </div>
  )
}
