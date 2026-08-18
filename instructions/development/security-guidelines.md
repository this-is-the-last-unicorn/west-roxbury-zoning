# Security Guidelines

## Overview

Security best practices for this project. Following these guidelines helps prevent common vulnerabilities.

## Environment Variables

**See also:** [Environment Variable Standards](./env-variable-standards.md) for naming conventions, public vs private rules, and Doppler config strategy.

### Never Hardcode Secrets

```typescript
// ❌ NEVER do this
const apiKey = 'sk-1234567890abcdef'
const dbUrl = 'postgresql://user:password@host/db'

// ✅ Always use environment variables
const apiKey = process.env.API_KEY
const dbUrl = process.env.DATABASE_URL

// ✅ Validate required secrets at startup
if (!process.env.API_KEY) {
  throw new Error('API_KEY environment variable is required')
}
```

### Use Doppler for Secrets Management

```bash
# Setup Doppler
doppler setup --project my-project --config dev

# Run with Doppler (secrets injected)
doppler run -- bun run dev

# Or use npm scripts that include doppler
bun run dev  # Uses doppler run internally
```

### Local Development Without Doppler

```bash
# Prefix commands with environment variables
DATABASE_URL="postgresql://..." bun run dev:local
```

## Input Validation

### Always Validate External Data

All data from external sources MUST be validated with Zod:

```typescript
import { z } from 'zod'

// Define schema
const CreateUserSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  age: z.number().int().positive().optional(),
})

// Validate input
const data = CreateUserSchema.parse(req.body) // Throws on invalid

// Or safe parse
const result = CreateUserSchema.safeParse(req.body)
if (!result.success) {
  return res.status(400).json({ error: 'Validation failed', details: result.error })
}
```

### Validate at System Boundaries

- ✅ API request bodies
- ✅ API query parameters
- ✅ API path parameters
- ✅ External API responses
- ✅ Environment variables
- ✅ File uploads
- ❌ Internal function calls (trust TypeScript)

## Database Security

### Use Prisma (Parameterized Queries)

Prisma automatically prevents SQL injection:

```typescript
// ✅ Safe - Prisma parameterizes automatically
const user = await prisma.user.findUnique({
  where: { email: userInput },
})

// ✅ Safe - Even with raw queries
const users = await prisma.$queryRaw`
  SELECT * FROM users WHERE email = ${userInput}
`

// ❌ NEVER concatenate user input in raw SQL
const users = await prisma.$queryRawUnsafe(
  `SELECT * FROM users WHERE email = '${userInput}'` // SQL INJECTION!
)
```

### Limit Query Results

```typescript
// ✅ Always paginate large result sets
const users = await prisma.user.findMany({
  take: 50, // Limit results
  skip: offset, // Pagination
})

// ❌ Don't fetch unlimited results
const allUsers = await prisma.user.findMany() // Could be millions
```

## Authentication (Better Auth)

Better Auth is DB-backed and runs locally (no external service dependency).

### Protect API Routes

```typescript
import { requireAuth, AuthenticatedRequest } from '../middleware/auth'

// Protect entire router
router.use(requireAuth)

// Or protect specific routes
router.get('/profile', requireAuth, getProfile)
router.post('/settings', requireAuth, updateSettings)
```

### Access User in Routes

```typescript
import { requireAuth, AuthenticatedRequest } from '../middleware/auth'

router.get('/profile', requireAuth, async (req, res) => {
  const { userId, user } = (req as AuthenticatedRequest).auth

  res.json({ data: user })
})
```

### Frontend Auth

```tsx
'use client'
import { useSession, signOut } from '@/lib/auth-client'

export default function Page() {
  const { data: session } = useSession()

  if (!session) return <p>Please sign in</p>

  return <p>Welcome, {session.user.name}</p>
}
```

## HTTP Security

### Security Headers (Helmet)

The API uses Helmet for security headers:

```typescript
import helmet from 'helmet'

app.use(helmet())
// Sets: X-Content-Type-Options, X-Frame-Options, etc.
```

### CORS Configuration

```typescript
import cors from 'cors'

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  })
)
```

## Logging Security

### Never Log Sensitive Data

The logger automatically redacts sensitive fields, but be careful:

```typescript
// ✅ Good - logs only safe fields
logger.info('User login', { userId: user.id, email: user.email })

// ❌ Bad - might log sensitive data
logger.info('User data', { user }) // Could include password hash

// ✅ Explicit field selection
logger.info('User data', {
  id: user.id,
  email: user.email,
  createdAt: user.createdAt,
})
```

### Redacted Fields

These are automatically removed from logs:

- `password`, `token`, `apiKey`, `secret`
- `authorization`, `cookie`, `session`
- `creditCard`, `cvv`, `ssn`
- `accessToken`, `refreshToken`, `privateKey`

## Error Handling

### Don't Expose Internal Errors

```typescript
// ❌ Bad - exposes internal details
res.status(500).json({
  error: error.message,
  stack: error.stack,
})

// ✅ Good - generic message, log internally
logger.error('Database error', error, { userId })
res.status(500).json({
  error: 'Internal server error',
  success: false,
})
```

### Differentiate Error Types

```typescript
try {
  const user = await getUser(userId)
} catch (error) {
  if (error instanceof NotFoundError) {
    return res.status(404).json({ error: 'User not found' })
  }
  if (error instanceof ValidationError) {
    return res.status(400).json({ error: error.message })
  }
  // Unknown error - log and return generic message
  logger.error('Unexpected error', error)
  return res.status(500).json({ error: 'Internal server error' })
}
```

## File Uploads

### Validate File Types

```typescript
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

function validateFile(file: File) {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Invalid file type')
  }
  if (file.size > MAX_SIZE) {
    throw new Error('File too large')
  }
}
```

### Store Securely

- Use cloud storage (S3, Cloudflare R2) not local filesystem
- Generate unique filenames (UUIDs)
- Set appropriate access permissions
- Scan for malware if accepting documents

## Dependency Security

### Keep Dependencies Updated

```bash
# Check for vulnerabilities
bun audit

# Update dependencies
bun update
```

### Use Lockfile

Always commit `bun.lockb` to ensure consistent installs.

## Pre-Commit Checklist

Before committing, verify:

- [ ] No hardcoded secrets
- [ ] All inputs validated with Zod
- [ ] No sensitive data in logs
- [ ] Auth required on protected routes
- [ ] Error messages don't expose internals
- [ ] File uploads validated

## Quick Security Check

```bash
# Check for hardcoded secrets
grep -rn -E "(sk-|pk-|xoxb-|ghp_)" apps/ packages/ \
  --exclude-dir=node_modules --exclude-dir=dist

# Check for console.log in server code
grep -rn "console\." apps/api/src --exclude-dir=node_modules
```
