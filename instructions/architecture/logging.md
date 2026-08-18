# Logging Standards

## Overview

This project uses structured logging with Pino and Sentry for error tracking.

**Key principle:** Never use `console.log` in server-side code. Always use `@app/logger`.

## Using the Logger

### Import

```typescript
import { logger } from '@app/logger'
```

### Basic Usage

```typescript
// Simple message
logger.info('Server started')

// With context (PREFERRED)
logger.info('Server started', { port: 3001, env: 'development' })

// Log levels
logger.debug('Detailed trace info', { query, result })
logger.info('Normal operation', { userId, action })
logger.warn('Warning condition', { threshold, current })
logger.error('Error occurred', error, { context })
```

### Error Logging

Always include the Error object when logging errors:

```typescript
try {
  await riskyOperation()
} catch (error) {
  // ✅ Good - Error object + context
  logger.error('Operation failed', error as Error, {
    userId,
    operation: 'riskyOperation',
  })
}
```

This ensures:

- Full stack traces in logs
- Automatic Sentry capture
- Proper error formatting

### Child Loggers

For module-specific logging with persistent context:

```typescript
import { createChildLogger } from '@app/logger'

const authLogger = createChildLogger({ module: 'auth' })

// All logs include { module: 'auth' }
authLogger.info('User authenticated', { userId })
authLogger.error('Login failed', error, { email })
```

## What to Log

### ✅ Always Log

- Server startup/shutdown events
- User authentication events (login, logout, failed attempts)
- Critical business operations (payments, orders, etc.)
- External API calls (request/response status)
- Background job processing (start, complete, fail)
- Database connection issues
- Configuration changes

### ❌ Never Log

- Passwords, tokens, or secrets (auto-redacted anyway)
- Full request/response bodies (security + cost)
- Personally identifiable information (PII) without necessity
- High-frequency events without sampling
- Successful health check requests

## Sentry Integration

### Initialize at Startup

```typescript
import { initializeSentry } from '@app/logger'

// At the very start of your server
initializeSentry('api') // For API server
initializeSentry('workers') // For workers
initializeSentry('dashboard') // For dashboard
```

### Automatic Error Capture

When you call `logger.error` with an Error object, it's automatically sent to Sentry:

```typescript
// This sends to Sentry automatically
logger.error('Payment failed', new Error('Card declined'), { orderId })
```

### Manual Sentry Helpers

```typescript
import { captureException, addBreadcrumb, setUser, clearUser } from '@app/logger'

// Capture exception with extra context
captureException(error, { userId, operation: 'checkout' })

// Add breadcrumbs for debugging
addBreadcrumb('User clicked checkout', { cartId })

// Set user context (cleared on logout)
setUser({ id: userId, email: userEmail })
clearUser()
```

## Version Tracking

Sentry releases are tagged with the app version for easier debugging.

### How It Works

1. During build, `scripts/build-with-version.sh` creates `.version.json`
2. Logger reads this file and tags Sentry releases
3. Errors in Sentry show which version they occurred in

### Using Version Info

```typescript
import { getVersion, getVersionInfo } from '@app/logger'

const version = getVersion() // "v0.1.0" or "abc123" (commit)

const info = getVersionInfo()
// { version: "v0.1.0", commit: "abc123", buildTime: "2024-01-15T10:30:00Z" }
```

## Log Levels

| Level   | When to Use                                   |
| ------- | --------------------------------------------- |
| `debug` | Detailed trace info (queries, internal state) |
| `info`  | Normal operations (startup, user actions)     |
| `warn`  | Warning conditions (rate limits, retries)     |
| `error` | Error conditions (failures, exceptions)       |

### Environment-Based Levels

- **Development:** `debug` level (see everything)
- **Production:** `info` level (normal operations + warnings + errors)

Override with `LOG_LEVEL` environment variable.

## HTTP Request Logging

The `httpLogger` middleware automatically logs all HTTP requests:

```typescript
import express from 'express'
import { httpLogger } from '@app/logger'

const app = express()
app.use(httpLogger)
```

Output example:

```
GET /api/users 200 (12ms)
POST /api/orders 201 (45ms)
GET /api/products 500 (error: Database connection failed)
```

## Anti-Patterns

### ❌ Don't use console.log

```typescript
// ❌ Bad
console.log('User action', userId)
console.error('Error:', error)

// ✅ Good
logger.info('User action', { userId })
logger.error('Error occurred', error)
```

### ❌ Don't log sensitive data

```typescript
// ❌ Bad - logs password
logger.info('Login attempt', { email, password })

// ✅ Good - password is auto-redacted anyway, but don't include it
logger.info('Login attempt', { email })
```

### ❌ Don't log without context

```typescript
// ❌ Bad - no context
logger.info('User updated')

// ✅ Good - includes relevant context
logger.info('User updated', { userId, fields: ['name', 'email'] })
```

### ❌ Don't swallow errors

```typescript
// ❌ Bad - error not logged
try {
  await operation()
} catch {
  // Silent failure
}

// ✅ Good - error logged with context
try {
  await operation()
} catch (error) {
  logger.error('Operation failed', error as Error, { context })
  throw error // or handle appropriately
}
```

## Environment Variables

| Variable     | Default        | Description                    |
| ------------ | -------------- | ------------------------------ |
| `LOG_LEVEL`  | `debug`/`info` | Log level (debug in dev)       |
| `SENTRY_DSN` | -              | Sentry DSN for error tracking  |
| `NODE_ENV`   | -              | Environment (development/prod) |

## Checklist

Before committing:

- [ ] No `console.log` statements in server code
- [ ] All errors logged with Error object + context
- [ ] Sensitive data not explicitly logged
- [ ] Log messages are descriptive and useful
- [ ] Context objects contain relevant debugging info
