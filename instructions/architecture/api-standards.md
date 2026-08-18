# API Standards

## Response Format

All API responses follow a consistent structure:

### Success Response

```json
{
  "data": { ... },
  "success": true,
  "meta": {
    "timestamp": "2024-01-15T10:30:00.000Z",
    "requestId": "req_abc123..."
  }
}
```

### Error Response

```json
{
  "error": "Human-readable error message",
  "code": "NOT_FOUND",
  "success": false,
  "details": { ... },
  "meta": {
    "timestamp": "2024-01-15T10:30:00.000Z",
    "requestId": "req_abc123..."
  }
}
```

### Using API Response Helpers

Always use the structured helpers from `src/lib/api-helpers.ts`:

```typescript
import { apiResponse, apiError, ErrorCode } from '../lib/api-helpers'

// Success
apiResponse(res, req, user, 201)

// Error
apiError(res, req, ErrorCode.NOT_FOUND, 'User not found')
apiError(res, req, ErrorCode.VALIDATION_ERROR, 'Invalid input', { fields: errors })
```

Available error codes: `BAD_REQUEST`, `UNAUTHORIZED`, `FORBIDDEN`, `NOT_FOUND`, `CONFLICT`, `VALIDATION_ERROR`, `INTERNAL_ERROR`.

## HTTP Status Codes

| Code | Usage                              |
| ---- | ---------------------------------- |
| 200  | Successful GET, PUT, PATCH         |
| 201  | Successful POST (resource created) |
| 204  | Successful DELETE (no content)     |
| 400  | Validation error                   |
| 401  | Authentication required            |
| 403  | Permission denied                  |
| 404  | Resource not found                 |
| 500  | Internal server error              |

## Validation with Zod

All request data MUST be validated using Zod schemas:

```typescript
import { Request, Response } from 'express'
import { z } from 'zod'

// Define schema
const CreateUserSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  age: z.number().int().positive().optional(),
})

// Type inference
type CreateUserInput = z.infer<typeof CreateUserSchema>

// Route handler
export async function createUser(req: Request, res: Response) {
  try {
    // Validate input
    const data = CreateUserSchema.parse(req.body)

    // Create user (data is now typed as CreateUserInput)
    const user = await prisma.user.create({ data })

    res.status(201).json({
      data: user,
      success: true,
      meta: { timestamp: new Date().toISOString() },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.errors,
        success: false,
        meta: { timestamp: new Date().toISOString() },
      })
    }

    // Log unexpected errors
    logger.error('Failed to create user', { error: (error as Error).message })

    res.status(500).json({
      error: 'Internal server error',
      success: false,
      meta: { timestamp: new Date().toISOString() },
    })
  }
}
```

## Using Validation Middleware

For cleaner route handlers, use the validation middleware:

```typescript
import { Router } from 'express'
import { validateBody } from '@/lib/validate'
import { z } from 'zod'

const router = Router()

const CreateUserSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
})

// Middleware validates before handler runs
router.post('/users', validateBody(CreateUserSchema), async (req, res) => {
  // req.body is already validated and typed
  const user = await prisma.user.create({ data: req.body })
  res.status(201).json({ data: user, success: true })
})
```

## Route Organization

Routes are organized by domain in `apps/api/src/routes/`:

```
routes/
├── health.ts      # Health check endpoint
├── users.ts       # User CRUD operations
├── auth.ts        # Authentication routes
└── index.ts       # Route aggregation (optional)
```

Each route file exports a Router:

```typescript
import { Router } from 'express'

export const usersRouter = Router()

usersRouter.get('/', listUsers)
usersRouter.get('/:id', getUser)
usersRouter.post('/', createUser)
usersRouter.put('/:id', updateUser)
usersRouter.delete('/:id', deleteUser)
```

## Error Handling

### Global Error Handler

The server includes a global error handler for uncaught errors:

```typescript
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  logger.error('Unhandled error', {
    error: err.message,
    method: req.method,
    url: req.url,
  })

  res.status(500).json({
    error: 'Internal server error',
    success: false,
    meta: { timestamp: new Date().toISOString() },
  })
})
```

### Route-Level Error Handling

Handle expected errors at the route level:

```typescript
export async function getUser(req: Request, res: Response) {
  const user = await prisma.user.findUnique({
    where: { id: req.params.id },
  })

  if (!user) {
    return res.status(404).json({
      error: 'User not found',
      success: false,
      meta: { timestamp: new Date().toISOString() },
    })
  }

  res.json({
    data: user,
    success: true,
    meta: { timestamp: new Date().toISOString() },
  })
}
```

## Logging

Use the structured logger for all server-side logging:

```typescript
import { logger } from '@app/logger'

// ✅ Good
logger.info('User created', { userId: user.id, email: user.email })
logger.error('Database error', { error: err.message, query: 'findUser' })

// ❌ Bad - Don't use console.log in server code
console.log('User created')
```

## Middleware

### Request ID

Every request gets a unique `x-request-id` header. Incoming requests can supply their own;
otherwise one is generated as `req_<uuid>`. The ID propagates to response headers and
structured log entries.

```typescript
import { requestIdMiddleware } from './middleware/request-id'
app.use(requestIdMiddleware)
```

### Authentication

Use `requireAuth` for protected routes and `optionalAuth` for routes that work with or without a session:

```typescript
import { requireAuth, optionalAuth, AuthenticatedRequest } from './middleware/auth'

// Protected route
router.get('/profile', requireAuth, async (req, res) => {
  const { userId, user } = (req as AuthenticatedRequest).auth
  apiResponse(res, req, user)
})

// Optional auth
router.get('/public', optionalAuth, async (req, res) => {
  const auth = (req as AuthenticatedRequest).auth // may be undefined
  // ...
})
```

## Security

### Input Validation

- Always validate with Zod before processing
- Never trust client input
- Use parameterized queries (Prisma handles this)

### Headers

Helmet.js is configured for security headers:

```typescript
import helmet from 'helmet'
app.use(helmet())
```

### CORS

CORS is configured for the frontend origin:

```typescript
import cors from 'cors'
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })
)
```
