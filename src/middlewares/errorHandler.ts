import { Request, Response, NextFunction } from 'express';
import { AppError } from '../common/errors/AppError';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.name || 'AppError',
      message: err.message,
      details: err.details ?? null,
    });
  }

  console.error('[UNHANDLED_ERROR]', err);

  return res.status(500).json({
    error: 'InternalServerError',
    message: 'Something went wrong.',
  });
}
