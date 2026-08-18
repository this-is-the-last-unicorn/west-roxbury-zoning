# Pre-PR Checks

Run this before creating a pull request to ensure code quality and security.

## AI Instructions (For Cursor)

When this command is invoked, you MUST:

1. **Create a TODO list** immediately with all checks that need to be run
2. **Run all quality checks** and analyze results
3. **Fix ALL issues found** automatically
4. **Report final status** - only say "ready for PR" when all checks pass

DO NOT ask the user to fix things manually. Fix everything automatically.

## Quick Start

```bash
# Run all quality checks
bun run typecheck && bun run lint && bun test && bun run build && bun run format

# Check for console.logs in server code
grep -r "console\." apps/api/src --exclude-dir=node_modules

# Check for hardcoded secrets
grep -rE "(sk-|pk-|xoxb-|ghp_)" apps/ packages/ --exclude-dir=node_modules --exclude-dir=dist --exclude-dir=.next
```

**Expected:** All checks pass → proceed to Commit and Push

**If issues found:** AI will automatically create TODO list and fix all issues

## Step 1: Automated Quality Checks

```bash
# TypeScript compilation
bun run typecheck

# Linting
bun run lint

# Run tests
bun test

# Verify build works
bun run build

# Format code
bun run format
```

**Expected result:** All commands should succeed with exit code 0

**If any fail:**

- AI will automatically create a TODO list with specific fixes
- AI will fix all TypeScript errors, test issues, and type problems
- Don't proceed until all checks pass

## Step 2: Security Checks

### Check for Console Logs

```bash
# Check for console.* in server-side code
grep -rn "console\." apps/api/src --exclude-dir=node_modules
```

**If found in server-side code:**

Replace with structured logging:

```typescript
// ❌ Before
console.log('User action', userId)
console.error('Error:', error)

// ✅ After
import { logger } from '@app/logger'
logger.info('User action', { userId })
logger.error('Error occurred', { error: error.message })
```

### Check for Hardcoded Secrets

```bash
grep -rn -E "(sk-|pk-|xoxb-|ghp_|gho_|ghs_)" apps/ packages/ \
  --exclude-dir=node_modules --exclude-dir=dist --exclude-dir=.next
```

**⚠️ If found any - STOP IMMEDIATELY**

1. **Don't commit yet!**
2. **Fix each secret:**

   ```typescript
   // Replace this:
   const apiKey = 'sk-xxxxx'

   // With this:
   const apiKey = process.env.API_KEY
   if (!apiKey) throw new Error('API_KEY required')
   ```

3. **Add to environment variables**

## Step 3: Commit and Push

**Only proceed if all checks passed!**

```bash
# Stage all changes
git add .

# Commit with descriptive message
git commit -m "feat: [brief description]

- [Specific change 1]
- [Specific change 2]
- [Specific change 3]"

# Push to remote
git push origin HEAD
```

### Commit Message Format

```
<type>: <brief description>

- Bullet point changes
- More details
```

**Types:**

- `feat:` - New feature
- `fix:` - Bug fix
- `chore:` - Maintenance (deps, configs)
- `docs:` - Documentation
- `refactor:` - Code restructuring
- `test:` - Adding/updating tests

## Step 4: Create PR

```bash
gh pr create \
  --title "feat: [Brief description]" \
  --body "## Summary

[What this PR does]

## Changes
- [Change 1]
- [Change 2]

## Testing
- [ ] Manual testing completed
- [ ] All tests passing
- [ ] TypeScript checks passing

## Notes
[Any context for reviewer]" \
  --assignee @me
```

**No GitHub CLI?**

1. Visit GitHub after pushing
2. Click "Compare & pull request"
3. Use the template above

## Troubleshooting

### TypeScript Errors

```bash
# See full errors
bun run typecheck

# AI will automatically fix:
# - Add missing imports
# - Fix type annotations
# - Handle undefined values properly
```

### Test Failures

```bash
# Run tests in watch mode to debug
bun test --watch

# Run specific test
bun test --testNamePattern="test name"
```

### Linting Errors

```bash
# Most are auto-fixed by:
bun run format
```

### Build Errors

```bash
# Usually TypeScript or import issues
bun run build

# AI will automatically check and fix:
# - All imports are correct
# - No missing dependencies
```

## Quick Reference

```bash
# Full quality check
bun run typecheck && bun run lint && bun test && bun run build && bun run format

# Security checks
grep -r "console\." apps/api/src --exclude-dir=node_modules
grep -rE "(sk-|pk-|xoxb-|ghp_)" apps/ packages/ --exclude-dir=node_modules --exclude-dir=dist

# Stage and commit
git add .
git commit -m "feat: description"
git push origin HEAD

# Create PR
gh pr create --assignee @me
```

---

**Pro tip:** Most issues can be prevented by:

- Running tests while developing (`bun test --watch`)
- Using TypeScript strictly with proper undefined handling
- Never hardcoding secrets (always use `process.env.VAR_NAME`)
- Using `logger` from `@app/logger` for all server-side logging
