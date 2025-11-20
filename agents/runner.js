import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class AgentRunner {
  constructor(agentId) {
    this.agentId = agentId
    this.agent = this.loadAgent(agentId)
  }

  loadAgent(agentId) {
    const agentPath = path.join(__dirname, `${agentId}.json`)
    if (!fs.existsSync(agentPath)) {
      throw new Error(`Agent ${agentId} not found`)
    }
    return JSON.parse(fs.readFileSync(agentPath, 'utf-8'))
  }

  async execute(actionName, parameters) {
    console.log(`[${this.agent.name}] Executing action: ${actionName}`)
    
    const action = this.agent.actions.find(a => a.name === actionName)
    if (!action) {
      throw new Error(`Action ${actionName} not found in agent ${this.agentId}`)
    }

    // Execute action based on type
    switch (actionName) {
      case 'generate_prompt':
        return this.generatePrompt(parameters)
      case 'scaffold_app':
        return this.scaffoldApp(parameters)
      case 'trigger_deploy':
        return this.triggerDeploy(parameters)
      case 'build_container':
        return this.buildContainer(parameters)
      case 'deploy_easypanel':
        return this.deployEasyPanel(parameters)
      default:
        return { status: 'success', message: `Action ${actionName} executed` }
    }
  }

  generatePrompt(params) {
    const { app_type, features } = params
    const prompt = `Build a ${app_type} app with features: ${features.join(', ')}`
    return { status: 'success', prompt }
  }

  scaffoldApp(params) {
    const { name, template } = params
    console.log(`Scaffolding ${name} from template ${template}`)
    return { status: 'success', app_name: name, path: `/apps/${name}` }
  }

  triggerDeploy(params) {
    const { app_id, environment } = params
    console.log(`Deploying ${app_id} to ${environment}`)
    return { status: 'success', deployment_id: `deploy-${Date.now()}` }
  }

  buildContainer(params) {
    const { dockerfile_path, tag } = params
    console.log(`Building container from ${dockerfile_path} with tag ${tag}`)
    return { status: 'success', image: tag }
  }

  deployEasyPanel(params) {
    const { app_name, compose_file } = params
    console.log(`Deploying ${app_name} to EasyPanel`)
    return { status: 'success', url: `https://${app_name}.easypanel.host` }
  }
}

// CLI interface
if (process.argv[2]) {
  const agentId = process.argv[2]
  const actionName = process.argv[3]
  const params = JSON.parse(process.argv[4] || '{}')
  
  const runner = new AgentRunner(agentId)
  runner.execute(actionName, params)
    .then(result => console.log(JSON.stringify(result, null, 2)))
    .catch(err => console.error('Error:', err.message))
}

export default AgentRunner
