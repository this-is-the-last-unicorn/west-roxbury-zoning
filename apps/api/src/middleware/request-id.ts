import { randomUUID } from 'crypto'
import { NextFunction, Request, Response } from 'express'

const REQUEST_ID_HEADER = 'x-request-id'

function getIncomingRequestId(headerValue: string | string[] | undefined): string | undefined {
  if (typeof headerValue === 'string') {
    const trimmed = headerValue.trim()
    return trimmed.length > 0 ? trimmed : undefined
  }
  if (Array.isArray(headerValue)) {
    for (const value of headerValue) {
      const trimmed = value.trim()
      if (trimmed.length > 0) return trimmed
    }
  }
  return undefined
}

export function requestIdMiddleware(req: Request, res: Response, next: NextFunction): void {
  const requestId =
    getIncomingRequestId(req.headers[REQUEST_ID_HEADER]) || `req_${randomUUID().replace(/-/g, '')}`

  req.headers[REQUEST_ID_HEADER] = requestId
  ;(req as Request & { requestId: string }).requestId = requestId
  res.setHeader(REQUEST_ID_HEADER, requestId)

  next()
}
