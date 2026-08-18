# Fix Hardcoded Secrets

Replace hardcoded secrets with environment variables (managed via Doppler).

## Before You Start

1. You haven't pushed yet, so the secret isn't exposed
2. Never commit the hardcoded secret — fix it before committing
3. If already pushed, rotate immediately (see [fix-exposed-secrets.md](./fix-exposed-secrets.md))

## Step 1: Find Hardcoded Secrets

```bash
rg -i "(api.?key|token|secret|password|bearer).*[:=].*['\"]" apps/ packages/ tools/ --type ts
rg "(sk-|pk-|xoxb-|ghp_|gho_|ghs_)" apps/ packages/ tools/ --type ts
```

## Step 2: Move to Doppler

All secrets are managed via Doppler for every environment.

```bash
# Log into Doppler dashboard
open https://dashboard.doppler.com

# Navigate to your project > environment
# Add the secret with appropriate name
```

## Step 3: Update Code

**Before (hardcoded):**

```typescript
const apiKey = 'sk-ant-api03-xxxxx'
```

**After (environment variable):**

```typescript
const apiKey = process.env.ANTHROPIC_API_KEY
if (!apiKey) throw new Error('ANTHROPIC_API_KEY not set')
```

## Step 4: Verify

```bash
# Confirm no secrets staged
git diff --cached

# Test with Doppler
doppler run -- bun run dev
```

## Prevention Checklist

- [ ] No hardcoded API keys
- [ ] No hardcoded tokens or passwords
- [ ] All secrets use `process.env.*`
- [ ] `.env.local` not staged
- [ ] Runtime validation for required env vars

## After Fixing

Continue with [pre-pr-checks.md](../pre-pr-checks.md).
