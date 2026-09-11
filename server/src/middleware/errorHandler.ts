import { Request, Response, NextFunction } from 'express';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T | null;
  meta: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
    timestamp: string;
  } | null;
  error: {
    code: string;
    message: string;
    details?: unknown;
  } | null;
}

export function sendSuccess<T>(
  res: Response,
  data: T,
  meta?: { page?: number; limit?: number; total?: number; totalPages?: number },
  status = 200
): Response {
  const response: ApiResponse<T> = {
    success: true,
    data,
    meta: {
      ...meta,
      timestamp: new Date().toISOString(),
    },
    error: null,
  };
  return res.status(status).json(response);
}

export function sendError(
  res: Response,
  code: string,
  message: string,
  status = 400,
  details?: unknown
): Response {
  const response: ApiResponse<null> = {
    success: false,
    data: null,
    meta: {
      timestamp: new Date().toISOString(),
    },
    error: {
      code,
      message,
      details,
    },
  };
  return res.status(status).json(response);
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): Response {
  console.error('[API Error]:', err);
  return sendError(res, 'INTERNAL_SERVER_ERROR', err.message || 'An unexpected error occurred', 500);
}
