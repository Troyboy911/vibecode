# 🚀 EasyPanel Deployment Guide

## Quick Deploy to EasyPanel

Your VibeCode platform is ready to deploy! Follow these steps to get it running on your Hostinger VPS with EasyPanel.

## Prerequisites

✅ GitHub repository created: `https://github.com/Troyboy911/vibecode`
✅ EasyPanel installed on Hostinger VPS
✅ Docker Hub account

## Deployment Method 1: GitHub Integration (Recommended)

### Step 1: Setup GitHub Secrets

1. Go to your repository settings: Settings > Secrets and variables > Actions
2. Add these secrets (use your actual credentials):

```
DOCKERHUB_USERNAME = your-dockerhub-username
DOCKERHUB_TOKEN = your-dockerhub-access-token
EASYPANEL_API_KEY = your-easypanel-api-key
EASYPANEL_URL = your-easypanel-url (e.g., https://your-vps-ip:3000)
```

### Step 2: Trigger GitHub Actions

The CI/CD pipeline will automatically:
- Build Docker images
- Push to Docker Hub
- Deploy to EasyPanel

Simply push any commit to trigger:
```bash
git commit --allow-empty -m "Trigger deployment"
git push origin main
```

## Deployment Method 2: Manual EasyPanel Setup

### Step 1: Login to EasyPanel

1. Open your EasyPanel URL in browser
2. Login with your credentials

### Step 2: Create New Project

1. Click **"New Project"**
2. Name: `vibecode`
3. Select **"Docker Compose"** as deployment method

### Step 3: Configure Docker Compose

Copy this production-ready compose configuration:

```yaml
version: '3.8'

services:
  backend:
    image: YOUR_DOCKERHUB_USERNAME/vibecode-backend:latest
    container_name: vibe_backend
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=production
      - PORT=4000
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:4000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  frontend:
    image: YOUR_DOCKERHUB_USERNAME/vibecode-frontend:latest
    container_name: vibe_frontend
    ports:
      - "3000:3000"
    environment:
      - VITE_API_URL=http://backend:4000/api
    depends_on:
      - backend
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3

networks:
  default:
    name: vibecode_network
```

### Step 4: Build Images

**On your VPS (SSH into it):**
```bash
# Clone the repository
git clone https://github.com/Troyboy911/vibecode.git
cd vibecode

# Login to Docker Hub
docker login

# Build and push backend
cd backend
docker build -t YOUR_USERNAME/vibecode-backend:latest .
docker push YOUR_USERNAME/vibecode-backend:latest

# Build and push frontend
cd ../frontend
docker build -t YOUR_USERNAME/vibecode-frontend:latest .
docker push YOUR_USERNAME/vibecode-frontend:latest
```

### Step 5: Deploy in EasyPanel

1. In EasyPanel, paste the docker-compose configuration
2. Replace YOUR_DOCKERHUB_USERNAME with your actual username
3. Click **"Deploy"**
4. Wait for containers to start
5. Access your app at the provided URL

## Deployment Method 3: Direct VPS Deployment

### SSH into your VPS

```bash
ssh your-user@your-vps-ip
```

### Deploy with Docker Compose

```bash
# Clone repository
git clone https://github.com/Troyboy911/vibecode.git
cd vibecode

# Build images
docker compose build

# Start services
docker compose up -d

# Check status
docker compose ps

# View logs
docker compose logs -f
```

## Post-Deployment

### 1. Verify Deployment

```bash
# Check backend health
curl http://your-vps-ip:4000/api/health

# Check frontend
curl http://your-vps-ip:3000
```

### 2. Access the Application

- **Frontend**: http://your-vps-ip:3000 or your custom domain
- **Backend API**: http://your-vps-ip:4000/api

### 3. Configure Domain (Optional)

In EasyPanel:
1. Go to your project settings
2. Add custom domain
3. Configure DNS records to point to your VPS IP
4. Enable SSL/TLS

### 4. Monitor Logs

```bash
# Via Docker
docker compose logs -f

# Via EasyPanel
Check the Logs tab in your project dashboard
```

## Troubleshooting

### Images not pulling
```bash
# Login to Docker Hub on VPS
docker login

# Pull images manually
docker pull YOUR_USERNAME/vibecode-backend:latest
docker pull YOUR_USERNAME/vibecode-frontend:latest
```

### Port conflicts
```bash
# Check what's using the ports
sudo netstat -tulpn | grep :3000
sudo netstat -tulpn | grep :4000

# Stop conflicting services or change ports in docker-compose.yml
```

### EasyPanel connection issues
- Verify VPS firewall allows ports 3000, 4000
- Check if EasyPanel service is running: `sudo systemctl status easypanel`
- Restart EasyPanel: `sudo systemctl restart easypanel`

### Container crashes
```bash
# Check logs
docker compose logs backend
docker compose logs frontend

# Restart services
docker compose restart
```

## Next Steps

1. ✅ Deploy to EasyPanel
2. 🔒 Change default admin credentials (username: admin, password: admin123)
3. 🌐 Configure custom domain
4. 🔐 Enable HTTPS/SSL
5. 📊 Set up monitoring and alerts
6. 🤖 Test agent system functionality

## Support

- GitHub Issues: https://github.com/Troyboy911/vibecode/issues
- EasyPanel Docs: https://easypanel.io/docs
- Docker Docs: https://docs.docker.com/

---

**Built with VibeCode Suite** - Ruthless. Fast. Automated.
