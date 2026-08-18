# Folder Structure

## Overview

This is a Turborepo monorepo with the following structure:

```
starter-kit/
├── apps/                    # Application packages
│   ├── web/                 # Next.js frontend
│   │   ├── src/
│   │   │   ├── app/         # App router pages
│   │   │   ├── components/  # React components
│   │   │   │   └── ui/      # shadcn/ui components
│   │   │   ├── hooks/       # Custom React hooks
│   │   │   └── lib/         # Utilities
│   │   └── public/          # Static assets
│   ├── api/                 # Express API
│   │   └── src/
│   │       ├── routes/      # API route handlers
│   │       ├── middleware/  # Express middleware
│   │       ├── lib/         # API utilities
│   │       └── server.ts    # Entry point
│   └── workers/             # Background workers
│       └── src/
│           ├── workers/     # BullMQ worker definitions
│           ├── servers/     # Bull Board dashboard
│           └── index.ts     # Entry point
│
├── packages/                # Shared packages
│   ├── database/            # Prisma 7 schema & client
│   │   ├── prisma.config.ts # Prisma 7 config
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   └── src/
│   │       ├── client.ts    # Prisma client with pg adapter
│   │       └── index.ts     # Barrel export
│   ├── logger/              # Logging + Sentry + version
│   │   └── src/
│   │       ├── index.ts     # Logger & HTTP middleware
│   │       ├── sentry-init.ts # Sentry configuration
│   │       └── version.ts   # Version tracking
│   ├── queue/               # BullMQ background jobs
│   │   └── src/
│   │       ├── connection.ts # Redis connection config
│   │       ├── types.ts      # Job types & schemas
│   │       ├── queues.ts     # Queue instances
│   │       └── index.ts      # Barrel export
│   └── mcp/                 # Model Context Protocol
│       └── src/
│           ├── server.ts     # MCP server setup
│           ├── lib/          # Context & schemas
│           ├── tools/        # MCP tool definitions
│           └── index.ts      # Barrel export
│
├── tools/                   # Development tools
│   └── cli/                 # CLI for seeding & tasks
│       ├── src/
│       │   ├── commands/    # oclif commands
│       │   │   └── seed/    # Seed commands
│       │   └── generators/  # Data generators
│       └── bin/             # CLI entry point
│
├── instructions/            # Development documentation
│   ├── architecture/        # System design docs
│   └── development/         # Workflow docs
│
├── .cursor/                 # Cursor AI configuration
│   └── commands/            # Workflow commands
│
├── scripts/                 # Dev scripts
│
├── .claude.md               # AI instructions
├── package.json             # Root workspace
├── turbo.json               # Turborepo config
└── README.md                # Project documentation
```

## Package Naming

All workspace packages use the `@app/` prefix:

- `@app/web` - Next.js frontend
- `@app/api` - Express API
- `@app/workers` - Background job workers
- `@app/database` - Prisma database client
- `@app/logger` - Logging + Sentry + version tracking
- `@app/queue` - BullMQ job queues
- `@app/mcp` - Model Context Protocol for AI tools
- `@app/cli` - Development CLI

## Key Directories

### `apps/web/`

Next.js 16 application with:

- App Router (`src/app/`)
- shadcn/ui components (`src/components/ui/`)
- Tailwind CSS v4

### `apps/api/`

Express.js API with:

- Health endpoint (`/api/health`)
- Zod validation middleware
- Structured logging

### `packages/database/`

Prisma 7 ORM setup with:

- PostgreSQL datasource (via `prisma.config.ts`)
- Single client export with `datasourceUrl`
- Development-friendly logging

### `apps/workers/`

BullMQ worker application with:

- Background job processing (`src/workers/`)
- Bull Board dashboard (`src/servers/dashboard.ts`)
- Sentry initialization for error tracking
- Graceful shutdown handling

### `packages/logger/`

Pino 10 logger with Sentry integration:

- Pretty printing in development
- JSON output in production
- Automatic sensitive data redaction
- Sentry error tracking (`initializeSentry()`)
- Version tracking for releases (`getVersion()`)
- HTTP request logging middleware

### `packages/queue/`

BullMQ background job processing:

- Redis connection configuration
- Example queue with job types
- Helper functions for adding jobs
- See `packages/queue/README.md` for full docs

### `packages/mcp/`

Model Context Protocol server for AI agents:

- MCP server setup (`createMcpServer()`)
- Context management for auth
- Example tools (list-users)
- See `packages/mcp/README.md` for full docs

### `tools/cli/`

oclif-based CLI for development:

- `bun run seed` - Generate synthetic data
- `bun run seed:reset` - Clear seeded data
- Faker.js for realistic data
- See `tools/cli/README.md` for adding commands

## Adding New Packages

1. Create directory in `apps/` or `packages/`
2. Add `package.json` with `@app/` prefix
3. Add `tsconfig.json` extending root config
4. Turborepo will automatically detect it

## Conventions

### File Naming

- Components: `PascalCase.tsx`
- Utilities: `kebab-case.ts`
- Routes: `kebab-case.ts`
- Documentation: `kebab-case.md`

### Import Aliases

- Web app: `@/` → `src/`
- API: `@/` → `src/`
- Cross-package: Use package names (`@app/database`)
