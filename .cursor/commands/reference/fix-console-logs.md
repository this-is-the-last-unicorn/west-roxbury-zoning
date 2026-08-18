# Fix Console Logs

Remove debug console.log statements found during pre-PR checks.

## Step 1: Find All Console Logs

```bash
rg "console\.log" apps/*/src packages/*/src tools/*/src --type ts
```

## Step 2: Review Each Instance

**Keep these (acceptable):**

```typescript
console.error('Error message:', error)
console.warn('Warning:', message)
```

**Remove these (debug output):**

```typescript
console.log('Debug:', data)
console.log('User:', user)
console.log('TODO: fix this')
```

**In API routes, replace with proper logging:**

```typescript
// Before:
console.log('Processing request:', req.body)
// After:
logger.info('Processing request', { path: req.url })
```

## Step 3: Verify Removal

```bash
# Check all console.logs are gone (except acceptable)
rg "console\.log" apps/*/src packages/*/src --type ts

# Should only show console.error and console.warn
rg "console\." apps/*/src --type ts | rg -v "console\.(error|warn)"
```

## Step 4: Test & Commit

```bash
bun run typecheck
bun run lint
```

## After Fixing

Continue with [pre-pr-checks.md](../pre-pr-checks.md).
