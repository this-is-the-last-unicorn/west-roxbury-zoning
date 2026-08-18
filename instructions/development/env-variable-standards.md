# Environment Variable Standards

## Overview

Consistent environment variable naming makes configuration predictable, searchable, and maintainable. This guide covers naming conventions, public vs private variables, service vs personal credentials, and integration with Doppler and Render.

**Related:** [Deployment Guide](./deployment.md) for Doppler setup and Render configuration.

---

## Public vs Private Variables

### ⚠️ Critical: Client Exposure Rules

Variables prefixed with `NEXT_PUBLIC_` are **embedded in the client bundle** and visible to anyone. This is permanent and cannot be undone after deployment.

```bash
# 🔴 PRIVATE - Server-side only (NEVER prefix with NEXT_PUBLIC_)
DATABASE_URL=xxx              # Database credentials
STRIPE_SECRET_KEY=sk_xxx      # Secret keys
BETTER_AUTH_SECRET=xxx        # Auth signing secret
OPENAI_API_KEY=sk-xxx         # API keys with billing
INTERNAL_SECRET=xxx           # Service-to-service auth

# 🟢 PUBLIC - Safe to expose to browser (use NEXT_PUBLIC_ prefix)
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_xxx
NEXT_PUBLIC_POSTHOG_KEY=phc_xxx
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-xxx
```

### What CAN Be Public

| Type             | Examples                        | Why Safe                              |
| ---------------- | ------------------------------- | ------------------------------------- |
| Publishable keys | `pk_xxx`, `phc_xxx`             | Designed for client use, rate-limited |
| Public URLs      | API endpoints, CDN URLs         | Already accessible                    |
| Feature flags    | `NEXT_PUBLIC_FEATURE_X_ENABLED` | Non-sensitive config                  |
| Analytics IDs    | GA, Mixpanel, PostHog           | Public by design                      |
| App identifiers  | App IDs, project IDs            | Not secrets                           |

### What MUST Stay Private

| Type                | Examples                       | Why Private              |
| ------------------- | ------------------------------ | ------------------------ |
| Secret keys         | `sk_xxx`, `secret_xxx`         | Full API access, billing |
| Database URLs       | `DATABASE_URL`                 | Contains credentials     |
| Auth secrets        | `JWT_SECRET`, `SESSION_SECRET` | Token forgery risk       |
| Service credentials | `AWS_SECRET_ACCESS_KEY`        | Full service access      |
| Internal tokens     | `INTERNAL_SECRET`              | Service bypass           |
| Webhook secrets     | `STRIPE_WEBHOOK_SECRET`        | Signature verification   |

### Public Variable Checklist

Before adding `NEXT_PUBLIC_`:

- [ ] Does the service provide this as a "publishable" or "public" key?
- [ ] Can this value be safely shared with any user?
- [ ] Is there NO billing/quota tied directly to this key?
- [ ] Would exposing this NOT allow data access or modification?

**If any answer is NO → Keep it private (server-side only)**

---

## Service IDs vs Personal Credentials

### 🚫 Never Use Personal Credentials

Always create service accounts or team credentials. Personal credentials cause:

- **Bus factor risk** — If the person leaves, credentials must be rotated
- **Audit confusion** — Actions attributed to person, not service
- **Scope creep** — Personal accounts often have broader permissions
- **Compliance issues** — SOC2/GDPR require service attribution

```bash
# ❌ Bad - Personal credentials
GITHUB_TOKEN=ghp_johns_personal_token
SLACK_TOKEN=xoxp-johns-user-token
OPENAI_API_KEY=sk-johns-personal-key
AWS_ACCESS_KEY_ID=AKIA_johns_iam_user

# ✅ Good - Service/team credentials
GITHUB_TOKEN=ghp_myapp_bot_token
SLACK_BOT_TOKEN=xoxb-myapp-bot
OPENAI_API_KEY=sk-proj-myapp-production
AWS_ACCESS_KEY_ID=AKIA_myapp_service_role
```

### Creating Service Credentials

| Service         | How to Create Service Credentials                      |
| --------------- | ------------------------------------------------------ |
| **OpenAI**      | Create project-specific API key in Settings → API Keys |
| **Anthropic**   | Create workspace API key (not personal)                |
| **GitHub**      | Create GitHub App or fine-grained PAT for org          |
| **Slack**       | Create bot user in Slack App, use `xoxb-` tokens       |
| **AWS**         | Create IAM role with minimal permissions               |
| **Stripe**      | Use API keys from Dashboard (already service-level)    |
| **Better Auth** | DB-backed, uses BETTER_AUTH_SECRET (local)             |
| **Linear**      | Create workspace API key in Settings                   |
| **Notion**      | Create internal integration, not personal token        |

### Naming Service Credentials

Include the service/project name when creating credentials:

```bash
# Pattern: [SERVICE]_[PROJECT]_[ENVIRONMENT]
# Examples:
OPENAI_API_KEY      → Created as "myapp-production" in OpenAI
SLACK_BOT_TOKEN     → Bot named "MyApp Bot"
GITHUB_TOKEN        → GitHub App named "MyApp CI"
LINEAR_API_KEY      → Workspace key named "myapp-automation"
```

---

## Doppler Environment Strategy

### Initial Setup

Run the setup script to create the project with the standard environment layout:

```bash
./scripts/setup-doppler.sh <project-name> [database-url]
```

### Environment Configs

| Config         | Purpose                | Who Uses            | Syncs To            |
| -------------- | ---------------------- | ------------------- | ------------------- |
| `dev`          | Shared development     | All developers      | Local via CLI       |
| `dev_personal` | Personal overrides     | Individual dev      | Local via CLI       |
| `preview`      | PR preview deployments | CI/CD               | Render preview envs |
| `prd`          | Production             | Production services | Render production   |

### Config Hierarchy (Doppler)

```
root
├── dev              # Shared dev defaults
│   └── dev_personal # Personal overrides (branched from dev)
├── preview          # Preview/staging
└── prd              # Production
```

### What Goes Where

#### `dev` Config (Shared Development)

Team-shared development values. **Everyone uses these defaults.**

```bash
# Shared dev database (or local)
DATABASE_URL=postgresql://localhost:5432/myapp_dev

# Shared dev Redis
REDIS_URL=redis://localhost:6379

# Development service URLs
API_URL=http://localhost:3001
FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001

# Shared test API keys (non-production, limited scope)
OPENAI_API_KEY=sk-proj-myapp-development
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx

# Monitoring (dev projects/DSNs)
SENTRY_DSN=https://xxx@sentry.io/dev-project
LOG_LEVEL=debug
```

#### `dev_personal` Config (Personal Overrides)

Branch from `dev`. Override only what differs for your machine.

```bash
# Personal database (if not using shared)
DATABASE_URL=postgresql://myuser@localhost:5432/myapp_myname

# Personal port overrides (conflicts)
API_PORT=3011

# Personal test keys (if needed)
# Usually inherit from dev - only override if necessary
```

**Key principle:** `dev_personal` inherits from `dev`. Only set overrides, not duplicates.

#### `preview` Config (PR Previews)

Shared preview environment for PR deployments.

```bash
# Shared preview database
DATABASE_URL=postgresql://xxx/myapp_preview

# Preview service URLs (set by Render or use placeholders)
API_URL=https://myapp-api-preview.onrender.com
FRONTEND_URL=https://myapp-web-preview.onrender.com
NEXT_PUBLIC_API_URL=https://myapp-api-preview.onrender.com

# Test mode API keys
STRIPE_SECRET_KEY=sk_test_xxx
BETTER_AUTH_SECRET=preview-secret-xxx

# Preview monitoring
SENTRY_DSN=https://xxx@sentry.io/preview-project
LOG_LEVEL=info
```

#### `prd` Config (Production)

Production values. **Restricted access.**

```bash
# Production database (set via Render, but backup in Doppler)
DATABASE_URL=postgresql://xxx/myapp_production

# Production URLs
API_URL=https://api.myapp.com
FRONTEND_URL=https://myapp.com
NEXT_PUBLIC_API_URL=https://api.myapp.com

# Production API keys (live mode)
STRIPE_SECRET_KEY=sk_live_xxx
BETTER_AUTH_SECRET=production-secret-xxx
OPENAI_API_KEY=sk-proj-myapp-production

# Production monitoring
SENTRY_DSN=https://xxx@sentry.io/production-project
LOG_LEVEL=info
```

### Local Development Commands

```bash
# Use shared dev config (default)
doppler setup --project myapp --config dev
doppler run -- bun run dev

# Use personal overrides (branches from dev)
doppler setup --project myapp --config dev_personal
doppler run -- bun run dev

# Run against preview (testing)
doppler run --config preview -- bun run db:migrate:status

# Run against production (careful!)
doppler run --config prd -- bun run db:migrate:status
```

---

## render.yaml vs Doppler Split

### In render.yaml (Infrastructure References)

Only put values that **reference Render infrastructure**:

```yaml
envVars:
  # Static values
  - key: NODE_ENV
    value: production
  - key: MCP_HTTP
    value: 'true'

  # Infrastructure references (Render resolves these)
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

### In Doppler (Everything Else)

All secrets, API keys, and configuration:

```bash
# Service URLs (varies by environment)
FRONTEND_URL=https://myapp.com
NEXT_PUBLIC_API_URL=https://api.myapp.com

# All API keys and secrets
BETTER_AUTH_SECRET=xxx
OPENAI_API_KEY=sk-xxx
STRIPE_SECRET_KEY=sk_live_xxx
JWT_SECRET=xxx

# Monitoring
SENTRY_DSN=https://xxx@sentry.io/123

# Feature flags
ANALYTICS_ENABLED=true
```

### Precedence Rule

**Doppler overwrites render.yaml values.** If both define `FRONTEND_URL`, Doppler wins.

This means:

- render.yaml = infrastructure defaults
- Doppler = secrets and environment-specific overrides

---

## General Naming Rules

### Naming Format

```
[APP_PREFIX_]CATEGORY_NAME[_SUFFIX]
```

- **SCREAMING_SNAKE_CASE** — Always uppercase with underscores
- **Descriptive names** — Clear purpose without being verbose
- **Consistent suffixes** — Use standard suffixes for common types

### Standard Suffixes

| Suffix     | Use For                       | Example                   |
| ---------- | ----------------------------- | ------------------------- |
| `_URL`     | Connection strings, endpoints | `DATABASE_URL`, `API_URL` |
| `_KEY`     | API keys, access keys         | `OPENAI_API_KEY`          |
| `_SECRET`  | Secret tokens, signing keys   | `JWT_SECRET`              |
| `_ID`      | Identifiers, account IDs      | `STRIPE_ACCOUNT_ID`       |
| `_DSN`     | Data Source Names             | `SENTRY_DSN`              |
| `_PORT`    | Port numbers                  | `API_PORT`                |
| `_HOST`    | Hostnames                     | `REDIS_HOST`              |
| `_ENABLED` | Boolean feature flags         | `ANALYTICS_ENABLED`       |
| `_MODE`    | Mode selection                | `LOG_MODE`                |
| `_TIMEOUT` | Timeout values (ms)           | `REQUEST_TIMEOUT`         |
| `_LIMIT`   | Numeric limits                | `RATE_LIMIT`              |
| `_PATH`    | File/directory paths          | `UPLOAD_PATH`             |
| `_TOKEN`   | Auth tokens                   | `SLACK_BOT_TOKEN`         |

### App-Specific Prefixes

Use prefixes when variables are specific to an app:

```bash
# ✅ Good - Clear app ownership
MCP_API_KEY=xxx
MCP_USER_ID=user-123
WORKER_CONCURRENCY=5
DASHBOARD_PORT=3002

# ❌ Bad - Ambiguous ownership
API_KEY=xxx           # Which service?
USER_ID=user-123      # Which app uses this?
```

| Prefix         | Use For                       |
| -------------- | ----------------------------- |
| `MCP_`         | MCP server configuration      |
| `WORKER_`      | Background worker settings    |
| `DASHBOARD_`   | Dashboard app settings        |
| `NEXT_PUBLIC_` | Client-exposed vars (Next.js) |

### Shared Variables (No Prefix)

Variables used across multiple apps:

```bash
DATABASE_URL=xxx
REDIS_URL=xxx
NODE_ENV=production
LOG_LEVEL=info
SENTRY_DSN=xxx
```

---

## Common Services Reference

### AI/LLM Services

```bash
# OpenAI (use project keys, not personal)
OPENAI_API_KEY=sk-proj-xxx        # Project API key
OPENAI_ORG_ID=org-xxx             # Organization ID

# Anthropic
ANTHROPIC_API_KEY=sk-ant-xxx

# Braintrust (observability)
BRAINTRUST_API_KEY=xxx

# Other AI
REPLICATE_API_TOKEN=r8_xxx
GROQ_API_KEY=gsk_xxx
TOGETHER_API_KEY=xxx
PERPLEXITY_API_KEY=pplx-xxx
COHERE_API_KEY=xxx
```

### Authentication

```bash
# Better Auth (DB-backed, local-first)
BETTER_AUTH_SECRET=xxx                           # Private — signing key
BETTER_AUTH_URL=http://localhost:3000             # Public — app base URL
AUTH0_ISSUER_BASE_URL=https://xxx.auth0.com     # Can be public
```

### Payments

```bash
# Stripe
STRIPE_SECRET_KEY=sk_xxx                        # Private (sk_test_ or sk_live_)
STRIPE_PUBLISHABLE_KEY=pk_xxx                   # Can be public
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_xxx       # Public
STRIPE_WEBHOOK_SECRET=whsec_xxx                 # Private
```

### Monitoring & Logging

```bash
# Sentry
SENTRY_DSN=https://xxx@sentry.io/123           # Can be public (just identifies project)
SENTRY_AUTH_TOKEN=sntrys_xxx                   # Private (for releases/sourcemaps)
SENTRY_ORG=my-org
SENTRY_PROJECT=my-project

# Logging
LOG_LEVEL=info
LOGTAIL_TOKEN=xxx                              # Private
```

### Databases & Cache

```bash
# PostgreSQL
DATABASE_URL=postgresql://user:pass@host:5432/db    # Private

# Redis
REDIS_URL=redis://host:6379                         # Private
```

### Storage

```bash
# AWS S3
AWS_ACCESS_KEY_ID=AKIA...                      # Private
AWS_SECRET_ACCESS_KEY=xxx                      # Private
AWS_REGION=us-east-1
AWS_S3_BUCKET=my-bucket

# Cloudflare R2
CLOUDFLARE_R2_ACCESS_KEY=xxx                   # Private
CLOUDFLARE_R2_SECRET_KEY=xxx                   # Private
CLOUDFLARE_R2_BUCKET=my-bucket
CLOUDFLARE_R2_ENDPOINT=https://xxx.r2.cloudflarestorage.com
```

### CRM & Integrations

```bash
# Slack (use bot tokens, not user tokens)
SLACK_BOT_TOKEN=xoxb-xxx                       # Private (xoxb- = bot)
SLACK_SIGNING_SECRET=xxx                       # Private
SLACK_WEBHOOK_URL=https://hooks.slack.com/xxx  # Private

# Linear (use workspace keys)
LINEAR_API_KEY=lin_api_xxx                     # Private

# Notion (use integration tokens)
NOTION_API_KEY=secret_xxx                      # Private

# Attio
ATTIO_API_KEY=xxx                              # Private
```

---

## Anti-Patterns

### ❌ Don't Expose Secrets as Public

```bash
# ❌ DANGEROUS - Secret key exposed to browser
NEXT_PUBLIC_STRIPE_SECRET_KEY=sk_live_xxx
NEXT_PUBLIC_DATABASE_URL=postgresql://user:pass@host/db
NEXT_PUBLIC_OPENAI_API_KEY=sk-xxx

# ✅ Good - Only publishable keys are public
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
```

### ❌ Don't Use Personal Credentials

```bash
# ❌ Bad - Personal account
OPENAI_API_KEY=sk-johns-personal-key
GITHUB_TOKEN=ghp_johns_pat

# ✅ Good - Service account
OPENAI_API_KEY=sk-proj-myapp-production
GITHUB_TOKEN=ghp_myapp_bot
```

### ❌ Don't Include Environment in Name

```bash
# ❌ Bad - Environment in variable name
PROD_DATABASE_URL=xxx
DEV_STRIPE_KEY=xxx

# ✅ Good - Same name, different values per Doppler config
DATABASE_URL=xxx        # Different value in dev vs prd
STRIPE_SECRET_KEY=xxx   # sk_test_ in dev, sk_live_ in prd
```

### ❌ Don't Use Generic Names

```bash
# ❌ Bad - Ambiguous
KEY=xxx
URL=http://example.com
SECRET=xxx

# ✅ Good - Clear purpose
STRIPE_SECRET_KEY=xxx
API_URL=http://example.com
JWT_SECRET=xxx
```

### ❌ Don't Duplicate Across Doppler Configs

```bash
# ❌ Bad - Same value copy-pasted in dev, preview, prd
# (If it changes, you must update 3 places)

# ✅ Good - Use Doppler's inheritance
# dev_personal branches from dev
# Only override what differs
```

---

## Validation Pattern

Always validate required env vars at startup:

```typescript
import { z } from 'zod'

const envSchema = z.object({
  // Required connections
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),

  // Required secrets (private)
  BETTER_AUTH_SECRET: z.string().min(32),

  // API keys with format validation
  OPENAI_API_KEY: z.string().startsWith('sk-').optional(),
  STRIPE_SECRET_KEY: z
    .string()
    .regex(/^sk_(test|live)_/)
    .optional(),

  // Optional with defaults
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  PORT: z.coerce.number().default(3000),

  // Optional monitoring
  SENTRY_DSN: z.string().url().optional(),

  // Feature flags
  ANALYTICS_ENABLED: z.coerce.boolean().default(false),
})

export const env = envSchema.parse(process.env)
```

---

## Checklist for New Env Vars

When adding a new environment variable:

### Naming

- [ ] Uses SCREAMING_SNAKE_CASE
- [ ] Has appropriate suffix (`_URL`, `_KEY`, `_SECRET`, etc.)
- [ ] Uses app prefix if app-specific (`MCP_`, `WORKER_`, etc.)
- [ ] No prefix if shared across apps

### Security

- [ ] **Is this safe to expose to browsers?** → Only then use `NEXT_PUBLIC_`
- [ ] Uses service/team credentials, not personal
- [ ] Sensitive values use `_KEY` or `_SECRET` suffix (for auto-redaction in logs)
- [ ] Not hardcoded anywhere in code

### Doppler

- [ ] Added to appropriate Doppler configs (`dev`, `preview`, `prd`)
- [ ] Uses Doppler inheritance (don't duplicate values)
- [ ] Infrastructure refs go in render.yaml, secrets go in Doppler

### Documentation

- [ ] Added to env validation schema
- [ ] Documented in relevant README if new service integration
