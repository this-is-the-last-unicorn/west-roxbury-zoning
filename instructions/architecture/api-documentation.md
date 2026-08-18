# API Documentation (OpenAPI/Swagger)

## Overview

**All APIs should be documented with OpenAPI.** This ensures:

- AI agents (MCP) can discover and use endpoints
- Frontend developers have clear contracts
- API consumers have self-service docs

## Setup

### Install Dependencies

```bash
bun add swagger-jsdoc swagger-ui-express
bun add -D @types/swagger-jsdoc @types/swagger-ui-express
```

### Configure OpenAPI

```typescript
// apps/api/src/config/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc'

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My Project API',
      version: '1.0.0',
      description: 'API documentation for My Project',
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:3001',
        description: 'API Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.ts', './src/schemas/*.ts'],
}

export const swaggerSpec = swaggerJsdoc(options)
```

### Mount Swagger UI

```typescript
// apps/api/src/server.ts
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger'

// Swagger UI
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Raw OpenAPI spec (for MCP and other tools)
app.get('/api/openapi.json', (req, res) => {
  res.json(swaggerSpec)
})
```

## Documenting Endpoints

### Basic Route Documentation

```typescript
// apps/api/src/routes/users.ts
import { Router } from 'express'

const router = Router()

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: List all users
 *     description: Returns a paginated list of users
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Items per page
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 meta:
 *                   $ref: '#/components/schemas/PaginationMeta'
 */
router.get('/', async (req, res) => {
  // Implementation
})

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', async (req, res) => {
  // Implementation
})

/**
 * @openapi
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 */
router.post('/', async (req, res) => {
  // Implementation
})

export const usersRouter = router
```

## Defining Schemas

### Schema Definitions

```typescript
// apps/api/src/schemas/user.ts

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         email:
 *           type: string
 *           format: email
 *           example: "user@example.com"
 *         name:
 *           type: string
 *           example: "John Doe"
 *         role:
 *           type: string
 *           enum: [admin, user, viewer]
 *           example: "user"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       required:
 *         - id
 *         - email
 *         - name
 *         - role
 *
 *     CreateUserInput:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         name:
 *           type: string
 *           minLength: 1
 *           maxLength: 100
 *         role:
 *           type: string
 *           enum: [admin, user, viewer]
 *           default: user
 *       required:
 *         - email
 *         - name
 *
 *     UpdateUserInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         role:
 *           type: string
 *           enum: [admin, user, viewer]
 */
```

### Common Schemas

```typescript
// apps/api/src/schemas/common.ts

/**
 * @openapi
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Resource not found"
 *         success:
 *           type: boolean
 *           example: false
 *         meta:
 *           $ref: '#/components/schemas/Meta'
 *
 *     ValidationError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Validation failed"
 *         success:
 *           type: boolean
 *           example: false
 *         details:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               path:
 *                 type: array
 *                 items:
 *                   type: string
 *               message:
 *                 type: string
 *
 *     Meta:
 *       type: object
 *       properties:
 *         timestamp:
 *           type: string
 *           format: date-time
 *
 *     PaginationMeta:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *           example: 1
 *         limit:
 *           type: integer
 *           example: 20
 *         total:
 *           type: integer
 *           example: 100
 *         totalPages:
 *           type: integer
 *           example: 5
 */
```

## Zod to OpenAPI

### Using zod-to-openapi

```bash
bun add @asteasolutions/zod-to-openapi
```

```typescript
// apps/api/src/schemas/user.ts
import { z } from 'zod'
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'

extendZodWithOpenApi(z)

export const UserSchema = z
  .object({
    id: z.string().uuid().openapi({ example: '123e4567-e89b-12d3-a456-426614174000' }),
    email: z.string().email().openapi({ example: 'user@example.com' }),
    name: z.string().min(1).max(100).openapi({ example: 'John Doe' }),
    role: z.enum(['admin', 'user', 'viewer']).openapi({ example: 'user' }),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .openapi('User')

export const CreateUserSchema = z
  .object({
    email: z.string().email(),
    name: z.string().min(1).max(100),
    role: z.enum(['admin', 'user', 'viewer']).default('user'),
  })
  .openapi('CreateUserInput')

export type User = z.infer<typeof UserSchema>
export type CreateUserInput = z.infer<typeof CreateUserSchema>
```

### Generate OpenAPI from Zod

```typescript
// apps/api/src/config/swagger.ts
import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi'
import { UserSchema, CreateUserSchema } from '../schemas/user'

const registry = new OpenAPIRegistry()

// Register schemas
registry.register('User', UserSchema)
registry.register('CreateUserInput', CreateUserSchema)

// Register paths
registry.registerPath({
  method: 'get',
  path: '/api/users',
  description: 'List all users',
  tags: ['Users'],
  responses: {
    200: {
      description: 'List of users',
      content: {
        'application/json': {
          schema: z.object({
            data: z.array(UserSchema),
          }),
        },
      },
    },
  },
})

// Generate spec
const generator = new OpenApiGeneratorV3(registry.definitions)
export const swaggerSpec = generator.generateDocument({
  openapi: '3.0.0',
  info: {
    title: 'My Project API',
    version: '1.0.0',
  },
})
```

## Authentication Documentation

```typescript
/**
 * @openapi
 * components:
 *   securitySchemes:
 *     sessionCookie:
 *       type: apiKey
 *       in: cookie
 *       name: better-auth.session_token
 *       description: Better Auth session cookie
 */

/**
 * @openapi
 * /api/protected:
 *   get:
 *     summary: Protected endpoint
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 */
```

## Tags for Organization

```typescript
/**
 * @openapi
 * tags:
 *   - name: Users
 *     description: User management endpoints
 *   - name: Auth
 *     description: Authentication endpoints
 *   - name: Projects
 *     description: Project management
 *   - name: Health
 *     description: Health check endpoints
 */
```

## MCP Integration

The OpenAPI spec enables MCP tools to discover and call your API:

```typescript
// packages/mcp/src/tools/api-discovery.ts
import { z } from 'zod'

export const ApiDiscoveryInputSchema = z.object({
  endpoint: z.string().optional(),
})

export async function discoverApi(input: z.infer<typeof ApiDiscoveryInputSchema>) {
  const apiUrl = process.env.API_URL || 'http://localhost:3001'
  const spec = await fetch(`${apiUrl}/api/openapi.json`).then(r => r.json())

  if (input.endpoint) {
    // Return specific endpoint info
    return spec.paths[input.endpoint] || { error: 'Endpoint not found' }
  }

  // Return all available endpoints
  return {
    endpoints: Object.keys(spec.paths),
    schemas: Object.keys(spec.components?.schemas || {}),
  }
}
```

Register in MCP tools:

```typescript
// packages/mcp/src/tools/index.ts
{
  name: 'discover-api',
  description: 'Discover available API endpoints from OpenAPI spec',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        description: 'Specific endpoint path to get details for',
      },
    },
  },
}
```

## Best Practices

### 1. Document All Endpoints

Every public endpoint should have OpenAPI documentation.

### 2. Include Examples

```yaml
schema:
  type: string
  example: 'user@example.com'
```

### 3. Document Error Responses

```yaml
responses:
  400:
    description: Validation error
  401:
    description: Unauthorized
  404:
    description: Not found
  500:
    description: Internal server error
```

### 4. Use Tags Consistently

Group related endpoints under meaningful tags.

### 5. Keep Schemas DRY

Use `$ref` to reference shared schemas:

```yaml
schema:
  $ref: '#/components/schemas/User'
```

### 6. Version Your API

```yaml
info:
  version: '1.0.0'
servers:
  - url: /api/v1
```

## Accessing Documentation

| URL                 | Description      |
| ------------------- | ---------------- |
| `/api/docs`         | Swagger UI       |
| `/api/openapi.json` | Raw OpenAPI spec |

## Generating Client SDKs

With OpenAPI spec, you can generate typed clients:

```bash
# TypeScript client
npx openapi-typescript http://localhost:3001/api/openapi.json -o ./src/api-types.ts

# Or use openapi-generator
npx @openapitools/openapi-generator-cli generate \
  -i http://localhost:3001/api/openapi.json \
  -g typescript-fetch \
  -o ./src/api-client
```
