# Security Checks

Scan the codebase for common security issues and prepare fixes.

## Quick Start

```
Ask me: "Run security checks"
```

## What This Command Does

1. Scans for hardcoded secrets, API keys, tokens
2. Checks for exposed credentials in git history
3. Reviews dependency vulnerabilities
4. Prioritizes findings by severity
5. Helps fix each issue

## Priority Levels

| Priority | SLA        | When to Fix     |
| -------- | ---------- | --------------- |
| Urgent   | Same day   | Drop everything |
| High     | This week  | Schedule today  |
| Medium   | This month | Add to sprint   |
| Low      | Backlog    | When convenient |

## Common Issue Types

### Urgent: Exposed Secrets

**What:** API keys, tokens in code or git history
**Time:** 15-30 minutes (rotation + cleanup)
**Fix:** See [fix-exposed-secrets.md](./reference/fix-exposed-secrets.md)

### High: Missing Security Headers

**What:** HSTS, CSP, X-Frame-Options missing
**Fix:** Add to Next.js config
**Time:** 15 minutes

### High: Outdated Packages

**What:** Dependencies past end-of-life
**Fix:** `bun update`
**Time:** 30 minutes + testing

### Medium: Input Validation Gaps

**What:** Unvalidated inputs
**Fix:** Add Zod validation
**Time:** 1 hour per endpoint

## Quick Commands

```bash
# Scan for hardcoded secrets
rg -i "(api.?key|secret|token|password|bearer)" --type ts -g "!node_modules" -g "!*.d.ts"

# Check for .env files tracked by git
git ls-files | rg "\.env"

# Check dependency vulnerabilities
bun audit 2>/dev/null || echo "Run: bun pm audit"
```

## Related Commands

- **pre-pr-checks.md** - Check before pushing
- **reference/fix-exposed-secrets.md** - Emergency secret rotation
- **reference/fix-hardcoded-secrets.md** - Replace hardcoded secrets
- **reference/fix-console-logs.md** - Remove debug logging
