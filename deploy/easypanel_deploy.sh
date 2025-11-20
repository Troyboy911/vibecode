#!/bin/bash
set -e

echo "🚀 Deploying VibeCode to EasyPanel..."

# Configuration
EASYPANEL_URL="${EASYPANEL_URL:-https://89.116.151.31:3000}"
EASYPANEL_API_KEY="${EASYPANEL_API_KEY}"
PROJECT_NAME="vibecode"

if [ -z "$EASYPANEL_API_KEY" ]; then
  echo "❌ Error: EASYPANEL_API_KEY not set"
  exit 1
fi

# Create or update project via EasyPanel API
echo "📦 Creating/updating project in EasyPanel..."

# Note: EasyPanel typically uses Docker Compose or Git-based deployment
# This script assumes you're using the compose file approach

# Copy docker-compose to a deployment-ready version
cp docker-compose.yml docker-compose.prod.yml

# Update image references to use Docker Hub
sed -i 's|build:|#build:|g' docker-compose.prod.yml
sed -i 's|context:|#context:|g' docker-compose.prod.yml
sed -i 's|dockerfile:|#dockerfile:|g' docker-compose.prod.yml

# Add image references
cat > docker-compose.prod.yml << 'EOF'
version: '3.8'

services:
  backend:
    image: ${DOCKERHUB_USERNAME}/vibecode-backend:latest
    container_name: vibe_backend
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=production
      - PORT=4000
    restart: unless-stopped

  frontend:
    image: ${DOCKERHUB_USERNAME}/vibecode-frontend:latest
    container_name: vibe_frontend
    ports:
      - "3000:3000"
    environment:
      - VITE_API_URL=http://backend:4000/api
    depends_on:
      - backend
    restart: unless-stopped

networks:
  default:
    name: vibecode_network
EOF

echo "✅ Deployment configuration ready"
echo "📋 Next steps:"
echo "1. Upload docker-compose.prod.yml to EasyPanel via web UI"
echo "2. Or use EasyPanel CLI/API to deploy"
echo "3. Access your app at the EasyPanel-provided URL"

# If using EasyPanel API (example - adjust based on actual API)
# curl -X POST "$EASYPANEL_URL/api/projects" \
#   -H "Authorization: Bearer $EASYPANEL_API_KEY" \
#   -H "Content-Type: application/json" \
#   -d @deployment_config.json

echo "🎉 Deployment script completed!"
