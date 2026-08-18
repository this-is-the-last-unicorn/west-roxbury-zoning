import { z, ZodSchema } from 'zod'
import { Request, Response, NextFunction } from 'express'

/**
 * Middleware factory to validate request body against a Zod schema
 *
 * Usage:
 * ```typescript
 * const CreateUserSchema = z.object({
 *   name: z.string().min(1).max(100),
 *   email: z.string().email(),
 * })
 *
 * router.post('/users', validateBody(CreateUserSchema), createUser)
 * ```
 */
export function validateBody<T extends ZodSchema>(schema: T) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          error: 'Validation failed',
          details: error.issues,
          success: false,
          meta: {
            timestamp: new Date().toISOString(),
          },
        })
        return
      }
      next(error)
    }
  }
}

/**
 * Middleware factory to validate request params against a Zod schema
 */
export function validateParams<T extends ZodSchema>(schema: T) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.params = schema.parse(req.params) as typeof req.params
      next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          error: 'Invalid parameters',
          details: error.issues,
          success: false,
          meta: {
            timestamp: new Date().toISOString(),
          },
        })
        return
      }
      next(error)
    }
  }
}

/**
 * Middleware factory to validate request query against a Zod schema
 */
export function validateQuery<T extends ZodSchema>(schema: T) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.query = schema.parse(req.query) as typeof req.query
      next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          error: 'Invalid query parameters',
          details: error.issues,
          success: false,
          meta: {
            timestamp: new Date().toISOString(),
          },
        })
        return
      }
      next(error)
    }
  }
}
