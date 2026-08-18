# @app/logger

Structured logging with Pino + Sentry error tracking + version management.

## Features

- ✅ **Structured logging** with Pino 10
- ✅ **Pretty printing** in development, JSON in production
- ✅ **Sentry integration** for error tracking with version-tagged releases
- ✅ **HTTP request logging** middleware for Express
- ✅ **Sensitive data redaction** (passwords, tokens, etc.)
- ✅ **Child loggers** for module-specific context
- ✅ **Version tracking** for debugging and Sentry releases

## Quick Start

```typescript
import { logger, initializeSentry } from '@app/logger'

// Initialize Sentry at server startup (optional)
initializeSentry('api')

// Use throughout your app
logger.info('Server started', { port: 3001 })
logger.warn('Rate limit approaching', { userId: '123', remaining: 5 })
logger.error('Payment failed', new Error('Card declined'), { orderId: '456' })
logger.debug('Query executed', { sql: 'SELECT...', ms: 12 })
```

## Logging API

### Basic Logging

```typescript
// Simple message
logger.info('User logged in')

// With context data
logger.info('User logged in', { userId: '123', method: 'oauth' })

// Log levels: debug, info, warn, error
logger.debug('Detailed trace info', { data })
logger.info('Normal operation', { metric })
logger.warn('Warning condition', { threshold, current })
logger.error('Error occurred', error, { context })
```

### Error Logging

The `error` method has special handling for Error objects:

```typescript
try {
  await riskyOperation()
} catch (error) {
  // Error + context - automatically sent to Sentry
  logger.error('Operation failed', error as Error, { userId, operation: 'risky' })
}

// Context only (no Error object)
logger.error('Validation failed', { field: 'email', reason: 'invalid' })
```

### Child Loggers

Create loggers with persistent context:

```typescript
import { createChildLogger } from '@app/logger'

const authLogger = createChildLogger({ module: 'auth' })

// All logs include { module: 'auth' }
authLogger.info('User authenticated', { userId: '123' })
// Output: { level: 'info', module: 'auth', userId: '123', msg: 'User authenticated' }
```

### HTTP Request Logging

Automatic request/response logging for Express:

```typescript
import express from 'express'
import { httpLogger } from '@app/logger'

const app = express()
app.use(httpLogger)
// Logs: GET /api/users 200 (12ms)
```

## Sentry Integration

### Initialize Sentry

Call at server startup before any routes:

```typescript
import { initializeSentry } from '@app/logger'

// Initialize with service name (for tagging)
initializeSentry('api') // For API server
initializeSentry('workers') // For background workers
```

### Sentry Helpers

```typescript
import { captureException, addBreadcrumb, setUser, clearUser } from '@app/logger'

// Manual exception capture with extra context
captureException(error, { userId: '123', operation: 'checkout' })

// Add breadcrumbs for debugging
addBreadcrumb('User clicked checkout', { cartId: '123' })

// Set user context (for user-specific error tracking)
setUser({ id: '123', email: 'user@example.com' })

// Clear on logout
clearUser()
```

### Version Tracking

Sentry releases are tagged with the app version from `.version.json`:

```typescript
import { getVersion, getVersionInfo } from '@app/logger'

const version = getVersion() // "v0.1.0"
const info = getVersionInfo() // { version, commit, buildTime }
```

The version file is created during build by `scripts/build-with-version.sh`.

## Environment Variables

| Variable     | Default        | Description                    |
| ------------ | -------------- | ------------------------------ |
| `LOG_LEVEL`  | `debug`/`info` | Log level (debug in dev)       |
| `SENTRY_DSN` | -              | Sentry DSN for error tracking  |
| `NODE_ENV`   | -              | Environment (development/prod) |

## Log Output

### Development (Pretty)

```
10:30:45 INFO  User logged in
               userId: "123"
               method: "oauth"
```

### Production (JSON)

```json
{
  "level": "info",
  "time": "2024-01-15T10:30:45.123Z",
  "userId": "123",
  "method": "oauth",
  "msg": "User logged in"
}
```

## Redacted Fields

These fields are automatically redacted from logs:

- `password`, `token`, `apiKey`, `secret`
- `authorization`, `cookie`, `session`
- `ssn`, `creditCard`, `cvv`
- `accessToken`, `refreshToken`, `privateKey`

## IMPORTANT: No console.log

**Never use `console.log` in server-side code.** Always use the logger:

```typescript
// ❌ Bad
console.log('User action', userId)

// ✅ Good
logger.info('User action', { userId })
```

This ensures:

- Structured, searchable logs
- Automatic Sentry error tracking
- Sensitive data redaction
- Consistent log formatting
