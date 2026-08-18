import * as Sentry from '@sentry/node'

import { getVersion } from './version'

/**
 * Initialize Sentry SDK for server-side error tracking
 *
 * @param serviceName - Name of service (api, admin, workers) for tagging
 *
 * Call this ASAP in your server startup, before any routes or handlers.
 *
 * Required environment variable: SENTRY_DSN
 *
 * @example
 * ```typescript
 * import { initializeSentry } from '@app/logger'
 *
 * // Initialize at the very start of your server
 * initializeSentry('api')
 * ```
 */
export function initializeSentry(serviceName: string): void {
  // Only initialize if SENTRY_DSN is configured
  if (!process.env.SENTRY_DSN) {
    console.warn(`[${serviceName}] Sentry DSN not configured - error tracking disabled`)
    return
  }

  try {
    // Read version from .version.json file (created during build)
    const release = getVersion()

    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: determineEnvironment(),
      release: release,

      // Performance monitoring - 10% sample rate
      tracesSampleRate: 0.1,

      // Add service tag to all events
      beforeSend: event => {
        event.tags = {
          ...event.tags,
          service: serviceName,
        }
        return event
      },
    })

    console.log(
      `[${serviceName}] Sentry initialized (env: ${determineEnvironment()}, release: ${release})`
    )
  } catch (error) {
    console.error(`[${serviceName}] Failed to initialize Sentry:`, error)
  }
}

/**
 * Determine Sentry environment from environment variables
 *
 * Environments:
 * - development: Local development (NODE_ENV=development)
 * - preview: Render preview deploys (IS_PULL_REQUEST=true)
 * - production: Production (default)
 */
function determineEnvironment(): string {
  // Local development
  if (process.env.NODE_ENV === 'development') {
    return 'development'
  }

  // Render preview deploys (staging)
  if (process.env.IS_PULL_REQUEST === 'true') {
    return 'preview'
  }

  // Production
  return 'production'
}

/**
 * Capture an exception in Sentry
 *
 * Use this for manual error capture when you want to add extra context.
 *
 * @example
 * ```typescript
 * try {
 *   await riskyOperation()
 * } catch (error) {
 *   captureException(error, { userId: '123', operation: 'risky' })
 * }
 * ```
 */
export function captureException(error: Error, extra?: Record<string, unknown>): void {
  if (!process.env.SENTRY_DSN) return

  Sentry.captureException(error, extra ? { extra } : undefined)
}

/**
 * Add breadcrumb for debugging
 *
 * @example
 * ```typescript
 * addBreadcrumb('User clicked checkout', { cartId: '123' })
 * ```
 */
export function addBreadcrumb(message: string, data?: Record<string, unknown>): void {
  if (!process.env.SENTRY_DSN) return

  Sentry.addBreadcrumb({
    message,
    ...(data && { data }),
    level: 'info',
  })
}

/**
 * Set user context for Sentry
 *
 * @example
 * ```typescript
 * setUser({ id: '123', email: 'user@example.com' })
 * ```
 */
export function setUser(user: { id: string; email?: string; username?: string }): void {
  if (!process.env.SENTRY_DSN) return

  Sentry.setUser(user)
}

/**
 * Clear user context (on logout)
 */
export function clearUser(): void {
  if (!process.env.SENTRY_DSN) return

  Sentry.setUser(null)
}
