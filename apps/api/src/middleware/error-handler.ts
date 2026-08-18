import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import { logger } from '@app/logger'

/**
 * Global error handler middleware
 * Handles Zod validation errors and unexpected errors
 */
export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
  // Handle Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation failed',
      details: err.issues,
      success: false,
      meta: {
        timestamp: new Date().toISOString(),
      },
    })
  }

  // Log unexpected errors
  logger.error('Unexpected error', {
    error: err.message,
    stack: err.stack,
    method: req.method,
    url: req.url,
  })

  // Return generic error response
  return res.status(500).json({
    error: 'Internal server error',
    success: false,
    meta: {
      timestamp: new Date().toISOString(),
    },
  })
}
