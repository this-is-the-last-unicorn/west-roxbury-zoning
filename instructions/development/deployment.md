# Deployment Guide

## Overview

This project deploys to [Render](https://render.com/) with secrets managed via [Doppler](https://www.doppler.com/).

**Related:** [Environment Variable Standards](./env-variable-standards.md) for naming conventions and what goes in each Doppler config.

| Service    | Type        | Description                     |
| ---------- | ----------- | ------------------------------- |
| Web        | Web Service | Next.js frontend                |
| API        | Web Service | Express API                     |
| Workers    | Background  | BullMQ job processors           |
| MCP        | Web Service | Authenticated MCP server for AI |
| MCP Docs   | Web Service | Public API docs MCP server      |
| PostgreSQL | Managed DB  | Primary database                |
| Redis      | Key-Value   | Queue storage                   |

## Service Naming Convention

Follow this pattern: `[project]-[category][-subcategory]`

**Categories:**

- `web`, `web-admin`, `web-portal` — Frontend apps
- `api`, `api-public` — Backend APIs
- `workers`, `cron`, `scheduler` — Background processing
- `db`, `db-mq`, `db-cache`, `db-search` — Data stores (prefix with `db-`)
- `mcp`, `mcp-docs` — AI tooling

**Variants:**

- `-ro` (read-only)
- `-internal`, `-public`, `-priority`

**Examples:**

- `myapp-web` — Main frontend
- `myapp-api` — Main API
- `myapp-workers` — Background jobs
- `myapp-db` — PostgreSQL
- `myapp-db-mq` — Redis for queues
- `myapp-mcp` — Authenticated MCP for AI agents
- `myapp-mcp-docs` — Public API documentation MCP

## Quick Start with render.yaml

The repo includes a `render.yaml` Blueprint. To deploy:

1. **Update placeholders:** Replace `[project]` with your project name in `render.yaml`
2. **Connect to Render:** Link your GitHub repo to Render
3. **Create Blueprint:** Dashboard → Blueprints → New Blueprint Instance
4. **Move to Project:** After deploy, move all services into a Render Project (required for Doppler sync)
5. **Connect Doppler:** Set up Doppler sync (see below)

## render.yaml + Doppler Split

Environment variables come from two sources:

### In render.yaml (infrastructure refs):

```yaml
envVars:
  - key: NODE_ENV
    value: production
  - key: DATABASE_URL
    fromDatabase:
      name: myapp-db
      property: connectionString
  - key: REDIS_URL
    fromService:
      type: keyvalue
      name: myapp-db-mq
      property: connectionString
```

### In Doppler (secrets and config):

- `FRONTEND_URL` — CORS origin
- `NEXT_PUBLIC_API_URL` — Client-side API URL
- `SENTRY_DSN` — Error tracking
- `BETTER_AUTH_SECRET` — Auth signing secret
- Any API keys, tokens, etc.

**Important:** Doppler sync overwrites/adds to render.yaml vars. Doppler takes precedence.

## Environment Strategy

| Environment | Platform             | Doppler Config | Database                  |
| ----------- | -------------------- | -------------- | ------------------------- |
| Local (dev) | Your machine         | `dev`          | Local PostgreSQL          |
| Personal    | Your machine         | `dev_personal` | Local PostgreSQL          |
| Preview     | Render preview envs  | `preview`      | Shared `myapp-preview-db` |
| Production  | Full Render services | `prd`          | `myapp-db`                |

### Doppler Configs

Create these configs in Doppler:

- **`dev`** — Shared development defaults (all devs use this)
- **`dev_personal`** — Personal overrides (branches from `dev`, only set differences)
- **`preview`** — Shared preview/staging environment
- **`prd`** — Production secrets (restricted access)

**See:** [Environment Variable Standards](./env-variable-standards.md) for detailed guidance on what goes in each config.

## Prerequisites

1. [Render account](https://dashboard.render.com/)
2. [Doppler account](https://www.doppler.com/) for secrets
3. GitHub repository connected to Render

## Doppler Setup

### 1. Create Project

```bash
doppler projects create myapp
```

### 2. Setup Local Environment

```bash
doppler setup --project myapp --config dev
```

### 3. Run with Doppler

```bash
# Development
doppler run -- bun run dev

# Or use the npm scripts that include doppler
bun run dev
```

### 4. Connect to Render

1. Go to Doppler → Integrations → Render
2. Authorize Render access
3. **Important:** Services must be in a Render Project for sync to work
4. Map Doppler configs to Render services:
   - `prd` → Production services
   - `preview` → Preview environments

## render.yaml Gotchas

### Key-Value Store (Redis)

```yaml
# Use 'keyvalue' type, not 'redis'
# Must be under 'services', not a separate section
- type: keyvalue
  name: myapp-db-mq
  plan: starter
  maxmemoryPolicy: noeviction
  ipAllowList: [] # Required field - empty = internal only
```

### Database Plans

Valid plans: `free`, `basic-256mb`, `basic-1gb`, `basic-4gb`, `pro-4gb`, etc.
(Not `starter` — that's for web services)

### Health Checks

Every web service needs a health check path:

```yaml
healthCheckPath: /api/health # API and Web
healthCheckPath: /health # MCP servers
```

## MCP Servers

### Authenticated MCP (`myapp-mcp`)

- Requires API key: `Authorization: Bearer myapp_...`
- Direct database access for AI agents
- Tools for listing/getting application data
- Port 3003 (or `$PORT` on Render)

### Public MCP Docs (`myapp-mcp-docs`)

- No authentication required
- Reads `docs/openapi.yaml` for API documentation
- Tools: `list-endpoints`, `get-endpoint`, `get-schema`, `search-docs`
- Port 3004 (or `$PORT` on Render)

### Connecting from Cursor/Claude Desktop

```json
{
  "mcpServers": {
    "myapp": {
      "url": "https://myapp-mcp.onrender.com/sse",
      "headers": {
        "Authorization": "Bearer myapp_your_api_key"
      }
    },
    "myapp-docs": {
      "url": "https://myapp-mcp-docs.onrender.com/sse"
    }
  }
}
```

## Database Migrations

### Build-time Migrations

API service runs migrations on start:

```yaml
startCommand: bun run db:migrate:deploy:runtime && bun run start:api
```

### Manual Migrations

```bash
# Production
doppler run --config prd -- bun run db:migrate:deploy

# Preview
doppler run --config preview -- bun run db:migrate:deploy
```

### Local Seeding to Production

External DATABASE_URL needs SSL:

```bash
# In Doppler prd config, use external URL with SSL
DATABASE_URL=postgres://user:pass@host:5432/db?sslmode=require
```

## API Keys

Generate API keys for MCP access:

```bash
# Via API
curl -X POST https://myapp-api.onrender.com/api/auth/api-keys \
  -H "Content-Type: application/json" \
  -d '{"userId": "user_id", "name": "My Key"}'
```

Or through the Settings UI in the web app.

## Preview Environments

Render creates preview deployments for PRs:

1. Enable "Pull Request Previews" in service settings
2. Preview uses shared `preview` database (configure in Doppler)
3. Use CLI to reset data between PRs if needed

## Monitoring

### Health Checks

- **API:** `GET /api/health`
- **Web:** `GET /api/health`
- **MCP:** `GET /health`

### Logs

```bash
# Render CLI
render logs --service myapp-api --tail
```

### Sentry

Version tracking via `build-with-version.sh`:

```typescript
import { getVersion } from '@app/logger'
// Returns: "v0.1.0" or commit hash
```

## Deployment Checklist

Before deploying:

- [ ] All tests passing (`bun test`)
- [ ] TypeScript compiles (`bun run typecheck`)
- [ ] Linting passes (`bun run lint`)
- [ ] Build succeeds (`bun run build`)
- [ ] Environment variables configured in Doppler
- [ ] `FRONTEND_URL` set for CORS
- [ ] `NEXT_PUBLIC_API_URL` set for client-side API calls
- [ ] Database migrations tested locally
- [ ] Health check endpoints working

## Troubleshooting

### Build Failures

- Check build logs in Render Dashboard
- Run `bun run build` locally to reproduce
- Memory issues → temporarily upgrade plan

### Database Connection Issues

- Use **Internal URL** for Render services
- Use **External URL** with `?sslmode=require` for local access
- Verify `DATABASE_URL` is set in Doppler

### CORS Errors

- Set `FRONTEND_URL` in Doppler to match web app URL
- Must include protocol: `https://myapp-web.onrender.com`

### MCP Not Connecting

- Verify API key is valid and not expired
- Check `/health` endpoint responds
- Ensure `MCP_HTTP=true` is set

### Workers Not Processing

1. Check Redis connection (`REDIS_URL`)
2. Verify workers are running (Render Dashboard)
3. Check worker logs for errors

## Cost Optimization

### Free Tier Limits

- Web Services: Spin down after 15 min inactivity
- Databases: 1GB storage, limited connections
- Key-Value: 25MB memory

### Production Recommendations

- Use paid plans to avoid spin-down delays
- Internal URLs are faster (no public internet roundtrip)
- Monitor usage to right-size services
