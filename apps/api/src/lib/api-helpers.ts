import { Request, Response } from 'express'

export enum ErrorCode {
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
}

const errorStatusMap: Record<ErrorCode, number> = {
  [ErrorCode.BAD_REQUEST]: 400,
  [ErrorCode.UNAUTHORIZED]: 401,
  [ErrorCode.FORBIDDEN]: 403,
  [ErrorCode.NOT_FOUND]: 404,
  [ErrorCode.CONFLICT]: 409,
  [ErrorCode.VALIDATION_ERROR]: 422,
  [ErrorCode.INTERNAL_ERROR]: 500,
}

function getRequestId(req: Request): string | undefined {
  return (req as Request & { requestId?: string }).requestId
}

export function apiResponse<T>(res: Response, req: Request, data: T, status = 200) {
  return res.status(status).json({
    data,
    success: true,
    meta: {
      timestamp: new Date().toISOString(),
      requestId: getRequestId(req),
    },
  })
}

export function apiError(
  res: Response,
  req: Request,
  code: ErrorCode,
  message: string,
  details?: Record<string, unknown>
) {
  return res.status(errorStatusMap[code]).json({
    error: message,
    code,
    success: false,
    ...(details && { details }),
    meta: {
      timestamp: new Date().toISOString(),
      requestId: getRequestId(req),
    },
  })
}
