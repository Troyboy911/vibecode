# ⚡ VibeCode Suite

**Ruthless. Fast. Automated.**

A production-first AI engineering platform for building, deploying, and operating full-stack applications with minimal input.

## 🎯 Features

- **Neon/Purple Themed UI** - Large live preview window with code explorer and agent control
- **Agent System** - JSON-based agents with actions, tools, and MCP integrations
- **Containerized Architecture** - Docker & Docker Compose ready
- **CI/CD Pipeline** - GitHub Actions for automated builds and deployments
- **EasyPanel Integration** - One-command deployment to Hostinger VPS

## 🏗️ Architecture

```
vibecode/
├── frontend/          # React + Vite + Tailwind CSS
├── backend/           # Node.js + Express REST API
├── agents/            # JSON agent definitions + runner
├── deploy/            # Deployment scripts
└── .github/workflows/ # CI/CD pipelines
```

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
cd frontend && npm install
cd ../backend && npm install

# Run locally with Docker Compose
docker-compose up --build

# Access the app
# Frontend: http://localhost:3000
# Backend: http://localhost:4000
```

### Manual Commands

```bash
# Build containers
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🔧 Configuration

### Environment Variables

Create `.env` files in frontend and backend directories:

**Backend `.env`:**
```
PORT=4000
NODE_ENV=production
JWT_SECRET=your-secret-key
```

**Frontend `.env`:**
```
VITE_API_URL=http://localhost:4000/api
```

### GitHub Secrets

For CI/CD, add these secrets to your GitHub repository:

- `DOCKERHUB_USERNAME` - Your Docker Hub username
- `DOCKERHUB_TOKEN` - Your Docker Hub access token
- `EASYPANEL_API_KEY` - Your EasyPanel API key
- `EASYPANEL_URL` - Your EasyPanel instance URL

## 📦 Deployment to EasyPanel

### Method 1: Automatic (via GitHub Actions)

1. Push to `main` branch
2. GitHub Actions builds and pushes Docker images
3. Deployment script runs automatically

```bash
git add .
git commit -m "Deploy to EasyPanel"
git push origin main
```

### Method 2: Manual Deployment

```bash
# Build and push images
docker build -t yourusername/vibecode-backend:latest ./backend
docker build -t yourusername/vibecode-frontend:latest ./frontend
docker push yourusername/vibecode-backend:latest
docker push yourusername/vibecode-frontend:latest

# Deploy to EasyPanel
./deploy/easypanel_deploy.sh
```

### Method 3: EasyPanel Web UI

1. Login to EasyPanel at `https://89.116.151.31:3000`
2. Create new project: "vibecode"
3. Upload `docker-compose.prod.yml`
4. Configure environment variables
5. Deploy

## 🤖 Agent System

### Available Agents

1. **Generator Agent** (`generator_agent.json`)
   - Generate VibeCode prompts
   - Scaffold new lead-gen apps
   - Trigger deployments

2. **Deploy Agent** (`deploy_agent.json`)
   - Build Docker containers
   - Push to registry
   - Deploy to EasyPanel

### Running Agents

```bash
cd agents
node runner.js generator_agent generate_prompt '{"app_type":"lead-gen","features":["auth","payments"]}'
```

## 🔒 Security

- Change default admin credentials immediately
- Use environment variables for all secrets
- Enable HTTPS in production
- Rotate API keys regularly

**Default Admin Credentials (CHANGE THESE):**
- Username: `admin`
- Password: `admin123`

## 🏥 Health Checks

```bash
# Backend health
curl http://localhost:4000/api/health

# Frontend health
curl http://localhost:3000
```

## 📊 Monitoring

View logs and build output in the bottom panel of the VibeCode Suite UI, or via Docker:

```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

## 🛠️ Troubleshooting

### Port conflicts
```bash
# Change ports in docker-compose.yml if 3000 or 4000 are in use
```

### Build failures
```bash
# Clean rebuild
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```

### EasyPanel connection issues
```bash
# Verify EasyPanel URL and API key
echo $EASYPANEL_URL
echo $EASYPANEL_API_KEY
```

## 📚 Documentation

- [EasyPanel Docs](https://easypanel.io/docs)
- [Docker Compose](https://docs.docker.com/compose/)
- [React + Vite](https://vitejs.dev/)
- [Express.js](https://expressjs.com/)

## 🎯 Roadmap

- [ ] Database integration (Neon Postgres)
- [ ] JWT authentication
- [ ] Telegram bot integration
- [ ] N8N automation triggers
- [ ] Perplexity MCP integration
- [ ] Visual element editing

## 📄 License

MIT

---

**Built with VibeCode Suite** - Maximum creativity. Maximum speed. Zero second-guessing.
