export default function PreviewWindow() {
  return (
    <div className="h-full border-2 border-purple-700 rounded-lg neon-glow bg-gray-900 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-purple-400">🖥️ Live Preview</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-purple-700 hover:bg-purple-600 rounded text-sm">Deploy</button>
          <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm">Refresh</button>
        </div>
      </div>
      <div className="h-full bg-black rounded border border-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚡</div>
          <p className="text-purple-300 text-lg">Click elements to modify visually</p>
          <p className="text-gray-500 text-sm mt-2">Preview window ready</p>
        </div>
      </div>
    </div>
  )
}
