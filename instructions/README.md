# Instructions

Documentation for the starter-kit codebase, organized by category.

> **New to this repo?** Start with `.cursor/commands/setup-project.md` to configure the project,
> then come here for architecture and development patterns.

## Directory Structure

```
instructions/
├── architecture/                   # Core system design
│   ├── api-documentation.md        # OpenAPI/Swagger setup
│   ├── api-standards.md            # API response formats & validation
│   ├── background-workers.md       # BullMQ job processing
│   ├── folder-structure.md         # Codebase organization
│   ├── logging.md                  # Logging standards & Sentry
│   ├── recharts-charts.md          # Data visualization
│   ├── sse-real-time.md            # Server-Sent Events
│   └── tanstack-tables.md          # Data tables
│
└── development/                    # Dev workflow & operations
    ├── braintrust-observability.md # AI tracing & evals
    ├── cursor-rules.md             # AI assistant guidelines
    ├── deployment.md               # Render deployment guide
    ├── env-variable-standards.md   # Environment variable naming
    ├── github-actions.md           # CI/CD workflows (test, review, deploy)
    ├── security-scanning.md        # Aikido code scanning & safe-chain
    └── security-guidelines.md      # Security best practices
```

## Quick Links

### Getting Started

- [Folder Structure](./architecture/folder-structure.md) - Codebase organization
- [Cursor Rules](./development/cursor-rules.md) - AI assistant guidelines
- [Security Guidelines](./development/security-guidelines.md) - Security best practices
- [Env Variable Standards](./development/env-variable-standards.md) - Environment variable naming

### Architecture

- [API Standards](./architecture/api-standards.md) - API design patterns & Zod validation
- [API Documentation](./architecture/api-documentation.md) - OpenAPI/Swagger setup
- [Background Workers](./architecture/background-workers.md) - BullMQ job processing
- [Logging](./architecture/logging.md) - Structured logging & Sentry error tracking
- [SSE Real-time](./architecture/sse-real-time.md) - Server-Sent Events patterns

### UI Patterns

- [Recharts Charts](./architecture/recharts-charts.md) - Data visualization
- [TanStack Tables](./architecture/tanstack-tables.md) - Data tables with sorting/filtering

### Security & Operations

- [Security Scanning](./development/security-scanning.md) - Aikido code scanning & safe-chain
- [GitHub Actions](./development/github-actions.md) - CI/CD workflows (test, review, deploy)
- [Deployment](./development/deployment.md) - Render deployment & infrastructure
- [Braintrust Observability](./development/braintrust-observability.md) - AI tracing & evaluations

### Package Documentation

Each package also has its own README:

- [`packages/logger/README.md`](../packages/logger/README.md) - Logger usage & API
- [`packages/queue/README.md`](../packages/queue/README.md) - Queue setup & job types
- [`packages/mcp/README.md`](../packages/mcp/README.md) - MCP server for AI tools
- [`tools/cli/README.md`](../tools/cli/README.md) - CLI commands & seeding
- [`apps/workers/README.md`](../apps/workers/README.md) - Worker app setup

## Adding New Documentation

When adding new documentation:

1. **Choose the right category:**
   - `architecture/` - System design, patterns, structure
   - `development/` - Workflows, tools, processes

2. **Use kebab-case naming:**
   - Format: `topic-name.md`
   - Example: `api-standards.md`

3. **Include in README:**
   - Add a link in the appropriate section above
