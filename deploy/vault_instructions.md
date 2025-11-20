# 🔒 Vault & Secrets Management

## GitHub Secrets Setup

1. Go to your GitHub repository
2. Navigate to **Settings** > **Secrets and variables** > **Actions**
3. Click **New repository secret**
4. Add the following secrets:

### Required Secrets

| Secret Name | Description | Where to Get It |
|-------------|-------------|-----------------|
| `DOCKERHUB_USERNAME` | Your Docker Hub username | [hub.docker.com](https://hub.docker.com) |
| `DOCKERHUB_TOKEN` | Docker Hub access token | Docker Hub > Account Settings > Security > New Access Token |
| `EASYPANEL_API_KEY` | EasyPanel API key | EasyPanel dashboard > Settings > API Keys |
| `EASYPANEL_URL` | Your EasyPanel instance URL | Provided by Hostinger (e.g., `https://89.116.151.31:3000`) |

### Optional Secrets

| Secret Name | Description |
|-------------|-------------|
| `GITHUB_TOKEN` | Automatically provided by GitHub Actions |
| `PERPLEXITY_API_KEY` | For Perplexity MCP integration |
| `OPENAI_API_KEY` | For OpenAI integrations |

## Hostinger/EasyPanel API Key Creation

### Method 1: Via EasyPanel Dashboard

1. Login to EasyPanel at your VPS URL
2. Go to **Settings** > **API Keys**
3. Click **Generate New API Key**
4. Copy the key immediately (it won't be shown again)
5. Add to GitHub Secrets as `EASYPANEL_API_KEY`

### Method 2: Via Hostinger hPanel

1. Login to [hpanel.hostinger.com](https://hpanel.hostinger.com)
2. Select your VPS
3. Go to **Docker Manager** or **EasyPanel** section
4. Generate API credentials
5. Note the API endpoint URL

## Docker Hub Token Creation

1. Login to [hub.docker.com](https://hub.docker.com)
2. Click your username > **Account Settings**
3. Go to **Security** tab
4. Click **New Access Token**
5. Name it "vibecode-ci" and set permissions to **Read & Write**
6. Copy the token and add to GitHub Secrets

## Environment Variables for Local Development

Create `.env` files in both frontend and backend directories:

### Backend `.env`
```bash
PORT=4000
NODE_ENV=development
JWT_SECRET=your-local-jwt-secret
```

### Frontend `.env`
```bash
VITE_API_URL=http://localhost:4000/api
```

## Security Best Practices

1. **Never commit `.env` files** - They're in `.gitignore`
2. **Rotate secrets regularly** - At least every 90 days
3. **Use different secrets for dev/prod** - Never reuse production secrets locally
4. **Limit API key permissions** - Only grant what's necessary
5. **Monitor API usage** - Check Docker Hub and EasyPanel dashboards regularly

## Troubleshooting

### "Unauthorized" errors in CI/CD
- Verify secrets are correctly set in GitHub
- Check secret names match exactly (case-sensitive)
- Regenerate tokens if they've expired

### EasyPanel connection failures
- Verify EASYPANEL_URL includes protocol (`https://`)
- Check if VPS firewall allows connections
- Ensure API key has deployment permissions

### Docker Hub push failures
- Verify DOCKERHUB_TOKEN has write permissions
- Check if repository exists on Docker Hub
- Ensure username is correct (lowercase)

## Backup & Recovery

Store a backup of all credentials in a secure password manager:
- 1Password
- Bitwarden
- LastPass
- Vault by HashiCorp (for teams)

**Never store credentials in:**
- Plain text files
- Email
- Slack/Discord messages
- Code comments
- Git commits
