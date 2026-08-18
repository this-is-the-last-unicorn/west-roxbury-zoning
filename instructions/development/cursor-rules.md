# Cursor Development Rules

## Core Principles

1. **Boring Technologies Only**
   - Use well-documented, mainstream tools
   - Avoid complex abstractions or clever solutions
   - Prioritize AI-friendly, predictable patterns

2. **Tech Stack**
   - **Runtime**: Bun + Node.js + Express
   - **Database**: PostgreSQL + Prisma
   - **Frontend**: React + Next.js + shadcn/ui + Tailwind CSS
   - **Auth**: Better Auth (DB-backed, local-first)
   - **Validation**: Zod
   - **TypeScript** everywhere

3. **Code Style**
   - Keep components small and focused
   - Use TypeScript strictly (no `any`)
   - **Code formatting is automatic** - Prettier handles all formatting
   - Fix all TypeScript/ESLint errors before committing
   - Run `bun run typecheck` and `bun run lint` before pushing
   - **Pre-commit hooks automatically format code** - no manual formatting needed

## Simple Patterns

### Logging

```typescript
import { logger } from '@app/logger'

// ✅ Good - Simple message
logger.info('User logged in')

// ✅ Good - With context
logger.info('Payment processed', { userId: '123', amount: 99.99 })

// ✅ Good - Error logging with context
try {
  await riskyOperation()
} catch (error) {
  logger.error('Operation failed', { userId, error: (error as Error).message })
}
```

### React Components

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface Props {
  prop1: string
  prop2: number
}

export default function ComponentName({ prop1, prop2 }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{prop1}</CardTitle>
      </CardHeader>
      <CardContent>{prop2}</CardContent>
    </Card>
  )
}
```

### API Routes

```typescript
import { Request, Response } from 'express'
import { prisma } from '@app/database'
import { z } from 'zod'

const CreateSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
})

export async function createUser(req: Request, res: Response) {
  try {
    const data = CreateSchema.parse(req.body)

    const user = await prisma.user.create({
      data,
    })

    res.status(201).json({ data: user, success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.errors,
        success: false,
      })
    }

    res.status(500).json({
      error: 'Internal server error',
      success: false,
    })
  }
}
```

## Common Imports

```typescript
// UI Components (shadcn/ui)
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

// Validation
import { z } from 'zod'

// Database
import { prisma } from '@app/database'

// Logging
import { logger } from '@app/logger'

// Auth
import { auth } from '@app/database'
import { useSession } from '@/lib/auth-client' // client-side
```

## Key Rules

1. **Linear Tickets Required** (when set up)
   - Every PR should reference a ticket
   - Branch naming: `feature/-description`

2. **Git Workflow**
   - **Default**: Always create PRs, never merge directly to main
   - Use preview environments to test PRs before merging
   - Clean up feature branches after merging

3. **Synthetic Data Only**
   - Never use real customer data in development
   - Use Prisma seed files for test data

4. **Simple State Management**
   - Use React's built-in hooks
   - Keep state as local as possible
   - No complex state libraries unless absolutely necessary

5. **Database Security**
   - Always use Prisma parameterized queries
   - Validate all inputs with Zod

## Environment Setup

```bash
# Required environment variables (managed via Doppler)
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=your-32-char-random-secret
BETTER_AUTH_URL=http://localhost:3000
```

## Development Commands

```bash
# Setup
bun install
bun run db:generate
bun run db:migrate

# Development
bun run dev        # Start both frontend and API
bun run dev:web    # Frontend only
bun run dev:api    # API only

# Without Doppler (local development)
bun run dev:local

# Quality checks
bun run typecheck    # TypeScript validation
bun run lint         # ESLint validation
bun run format:check # Code formatting validation
bun run test         # Run tests

# Formatting (automatic via pre-commit hooks)
bun run format       # Format entire codebase manually
```

## Remember

- Check `/instructions/` folder before making changes
- Choose vanilla, boring solutions over clever ones
- Keep PRs small and focused
- Test thoroughly before submitting
