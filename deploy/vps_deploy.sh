#!/bin/bash
set -e

echo "🚀 VibeCode VPS Deployment Script"
echo "=================================="

# Configuration
GITHUB_REPO="https://github.com/Troyboy911/vibecode.git"
DOCKERHUB_USER="${DOCKERHUB_USERNAME}"
DOCKERHUB_TOKEN="${DOCKERHUB_TOKEN}"
DEPLOY_DIR="/opt/vibecode"

# Validate required environment variables
if [ -z "$DOCKERHUB_USERNAME" ]; then
  echo "❌ Error: DOCKERHUB_USERNAME environment variable not set"
  echo "Usage: DOCKERHUB_USERNAME=your-user DOCKERHUB_TOKEN=your-token ./vps_deploy.sh"
  exit 1
fi

if [ -z "$DOCKERHUB_TOKEN" ]; then
  echo "❌ Error: DOCKERHUB_TOKEN environment variable not set"
  echo "Usage: DOCKERHUB_USERNAME=your-user DOCKERHUB_TOKEN=your-token ./vps_deploy.sh"
  exit 1
fi

# Check if running as root or with sudo
if [ "$EUID" -ne 0 ]; then 
  echo "⚠️  Please run with sudo for full installation"
  USE_SUDO="sudo"
else
  USE_SUDO=""
fi

# Install Docker if not present
if ! command -v docker &> /dev/null; then
  echo "📦 Installing Docker..."
  curl -fsSL https://get.docker.com -o get-docker.sh
  $USE_SUDO sh get-docker.sh
  $USE_SUDO usermod -aG docker $USER
  rm get-docker.sh
  echo "✅ Docker installed"
else
  echo "✅ Docker already installed"
fi

# Install Docker Compose if not present
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
  echo "📦 Installing Docker Compose..."
  $USE_SUDO curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  $USE_SUDO chmod +x /usr/local/bin/docker-compose
  echo "✅ Docker Compose installed"
else
  echo "✅ Docker Compose already installed"
fi

# Clone or update repository
if [ -d "$DEPLOY_DIR" ]; then
  echo "📂 Updating existing repository..."
  cd $DEPLOY_DIR
  git pull
else
  echo "📂 Cloning repository..."
  $USE_SUDO git clone $GITHUB_REPO $DEPLOY_DIR
  cd $DEPLOY_DIR
fi

# Login to Docker Hub
echo "🔐 Logging into Docker Hub..."
echo $DOCKERHUB_TOKEN | docker login -u $DOCKERHUB_USER --password-stdin

# Build images
echo "🏗️  Building Docker images..."
docker compose build

# Push to Docker Hub
echo "📤 Pushing images to Docker Hub..."
docker tag vibecode-backend:latest $DOCKERHUB_USER/vibecode-backend:latest
docker tag vibecode-frontend:latest $DOCKERHUB_USER/vibecode-frontend:latest
docker push $DOCKERHUB_USER/vibecode-backend:latest
docker push $DOCKERHUB_USER/vibecode-frontend:latest

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker compose down || true

# Start services
echo "🚀 Starting services..."
docker compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Health check
echo "🏥 Checking service health..."
if curl -f http://localhost:4000/api/health > /dev/null 2>&1; then
  echo "✅ Backend is healthy"
else
  echo "⚠️  Backend health check failed"
fi

if curl -f http://localhost:3000 > /dev/null 2>&1; then
  echo "✅ Frontend is healthy"
else
  echo "⚠️  Frontend health check failed"
fi

# Show status
echo ""
echo "📊 Container Status:"
docker compose ps

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "Access your application:"
echo "  Frontend: http://$(hostname -I | awk '{print $1}'):3000"
echo "  Backend:  http://$(hostname -I | awk '{print $1}'):4000"
echo ""
echo "View logs:"
echo "  docker compose logs -f"
echo ""
echo "Default admin credentials:"
echo "  Username: admin"
echo "  Password: admin123"
echo "  ⚠️  CHANGE THESE IMMEDIATELY!"
