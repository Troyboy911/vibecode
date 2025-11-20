import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'online', timestamp: new Date().toISOString() })
})

// Get all agents
app.get('/api/agents', (req, res) => {
  try {
    const agentsPath = path.join(__dirname, '../agents')
    const files = fs.readdirSync(agentsPath).filter(f => f.endsWith('.json'))
    const agents = files.map(file => {
      const data = JSON.parse(fs.readFileSync(path.join(agentsPath, file), 'utf-8'))
      return data
    })
    res.json(agents)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Run agent
app.post('/api/agents/:id/run', async (req, res) => {
  try {
    const { id } = req.params
    const { input } = req.body
    
    // Load agent
    const agentPath = path.join(__dirname, `../agents/${id}.json`)
    if (!fs.existsSync(agentPath)) {
      return res.status(404).json({ error: 'Agent not found' })
    }
    
    const agent = JSON.parse(fs.readFileSync(agentPath, 'utf-8'))
    
    // Execute agent logic (simplified)
    const result = {
      agentId: id,
      input,
      output: `Agent ${agent.name} executed successfully`,
      timestamp: new Date().toISOString()
    }
    
    res.json(result)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Auth endpoints
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body
  // Simplified auth - replace with real implementation
  if (username === 'admin' && password === 'admin123') {
    res.json({ token: 'demo-token', role: 'admin' })
  } else {
    res.status(401).json({ error: 'Invalid credentials' })
  }
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 VibeCode Backend running on port ${PORT}`)
})
