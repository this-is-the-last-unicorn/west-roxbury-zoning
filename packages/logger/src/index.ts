/**
 * @app/logger
 *
 * Structured logging with Pino + Sentry error tracking + version management.
 *
 * ## Quick Start
 *
 * ```typescript
 * import { logger, initializeSentry } from '@app/logger'
 *
 * // Initialize Sentry at server startup (optional)
 * initializeSentry('api')
 *
 * // Use logger throughout your app
 * logger.info('Server started', { port: 3001 })
 * logger.error('Payment failed', new Error('Card declined'), { orderId: '123' })
 * ```
 *
 * @module @app/logger
 */

import pino from 'pino'
import pinoHttp from 'pino-http'
import * as Sentry from '@sentry/node'

const isDev = process.env.NODE_ENV === 'development'
// Detect Next.js environment (worker threads don't work in Next.js)
const isNextJs = typeof process !== 'undefined' && process.env.NEXT_RUNTIME !== undefined

// Sensitive fields to redact from logs
const REDACT_PATHS = [
  'password',
  'token',
  'apiKey',
  'api_key',
  'secret',
  'secretKey',
  'authorization',
  'session',
  'cookie',
  'ssn',
  'creditCard',
  'cvv',
  'apiSecret',
  'privateKey',
  'accessToken',
  'refreshToken',
  // Nested paths
  'req.headers.authorization',
  'req.headers.cookie',
  'res.headers["set-cookie"]',
]

// Base Pino configuration
const pinoConfig: pino.LoggerOptions = {
  level: process.env.LOG_LEVEL || (isDev ? 'debug' : 'info'),
  formatters: {
    level: (label: string) => ({ level: label }),
  },
  redact: {
    paths: REDACT_PATHS,
    remove: true,
  },
  timestamp: pino.stdTimeFunctions.isoTime,
}

// Create transport based on environment
const createTransport = (): pino.TransportSingleOptions | undefined => {
  if (isDev) {
    return {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        singleLine: false,
      },
    }
  }
  return undefined
}

// Create base logger instance
let baseLogger: pino.Logger
if (isDev && !isNextJs) {
  // Use transport with worker threads (faster) for non-Next.js environments
  const transport = createTransport()
  baseLogger = transport ? pino(pinoConfig, pino.transport(transport)) : pino(pinoConfig)
} else {
  // Use sync destination for Next.js and production (no worker threads)
  baseLogger = pino(pinoConfig, pino.destination({ sync: true }))
}

/**
 * Main logger instance for application-wide logging
 *
 * Errors are automatically sent to Sentry (if configured).
 *
 * @example
 * ```typescript
 * import { logger } from '@app/logger'
 *
 * logger.info('User logged in', { userId: '123' })
 * logger.error('Payment failed', new Error('Card declined'), { orderId: '456' })
 * ```
 */
export const logger = {
  info: (msg: string, data?: Record<string, unknown>) => {
    if (data) {
      baseLogger.info(data, msg)
    } else {
      baseLogger.info(msg)
    }
  },

  error: (msg: string, error?: Error | Record<string, unknown>, data?: Record<string, unknown>) => {
    // Handle different call signatures
    if (error instanceof Error) {
      baseLogger.error({ err: error, ...data }, msg)

      // Send to Sentry if configured
      if (process.env.SENTRY_DSN) {
        Sentry.captureException(error, {
          extra: { message: msg, ...data },
        })
      }
    } else if (error) {
      baseLogger.error(error, msg)
    } else {
      baseLogger.error(msg)
    }
  },

  warn: (msg: string, data?: Record<string, unknown>) => {
    if (data) {
      baseLogger.warn(data, msg)
    } else {
      baseLogger.warn(msg)
    }
  },

  debug: (msg: string, data?: Record<string, unknown>) => {
    if (data) {
      baseLogger.debug(data, msg)
    } else {
      baseLogger.debug(msg)
    }
  },
}

/**
 * Create a child logger with persistent context
 *
 * @example
 * ```typescript
 * const authLogger = createChildLogger({ module: 'auth' })
 * authLogger.info('User authenticated', { userId: '123' })
 * // Output: { level: 'info', module: 'auth', userId: '123', msg: 'User authenticated' }
 * ```
 */
export const createChildLogger = (context: Record<string, unknown>) => {
  const child = baseLogger.child(context)
  return {
    info: (msg: string, data?: Record<string, unknown>) => {
      if (data) {
        child.info(data, msg)
      } else {
        child.info(msg)
      }
    },
    error: (
      msg: string,
      error?: Error | Record<string, unknown>,
      data?: Record<string, unknown>
    ) => {
      if (error instanceof Error) {
        child.error({ err: error, ...data }, msg)
        if (process.env.SENTRY_DSN) {
          Sentry.captureException(error, { extra: { message: msg, ...context, ...data } })
        }
      } else if (error) {
        child.error(error, msg)
      } else {
        child.error(msg)
      }
    },
    warn: (msg: string, data?: Record<string, unknown>) => {
      if (data) {
        child.warn(data, msg)
      } else {
        child.warn(msg)
      }
    },
    debug: (msg: string, data?: Record<string, unknown>) => {
      if (data) {
        child.debug(data, msg)
      } else {
        child.debug(msg)
      }
    },
  }
}

/**
 * HTTP request logger middleware for Express
 *
 * Automatically logs all HTTP requests with:
 * - Request ID (for tracing)
 * - Method, URL, status code
 * - Response time
 * - User context (if available)
 *
 * @example
 * ```typescript
 * import express from 'express'
 * import { httpLogger } from '@app/logger'
 *
 * const app = express()
 * app.use(httpLogger)
 * ```
 */
export const httpLogger = pinoHttp({
  // Generate unique request ID for tracing
  genReqId: req => {
    const existingId = req.id ?? req.headers['x-request-id']
    if (existingId) return existingId as string
    return crypto.randomUUID()
  },
  // Customize log level based on response
  customLogLevel: (_req, res, err) => {
    if (res.statusCode >= 500 || err) return 'error'
    if (res.statusCode >= 400) return 'warn'
    return 'info'
  },
  // Custom success message
  customSuccessMessage: (req, res) => {
    return `${req.method} ${req.url} ${res.statusCode}`
  },
  // Custom error message
  customErrorMessage: (req, res, err) => {
    return `${req.method} ${req.url} ${res.statusCode} - ${err.message}`
  },
  // Add custom properties to each log
  customProps: req => ({
    userId: (req as { userId?: string }).userId,
    tenantId: (req as { tenantId?: string }).tenantId,
  }),
  // Never log request/response bodies (security + cost)
  serializers: {
    req: req => ({
      id: req.id,
      method: req.method,
      url: req.url,
      remoteAddress: req.remoteAddress,
      remotePort: req.remotePort,
    }),
    res: res => ({
      statusCode: res.statusCode,
    }),
  },
})

export type Logger = typeof logger
export type ChildLogger = ReturnType<typeof createChildLogger>

// ============================================================================
// Sentry & Version Exports
// ============================================================================
export {
  initializeSentry,
  captureException,
  addBreadcrumb,
  setUser,
  clearUser,
} from './sentry-init'
export { getVersion, getVersionInfo, type VersionInfo } from './version'
