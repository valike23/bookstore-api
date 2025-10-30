import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { AppError } from '../common/errors/AppError';

export function validate(req: Request, _res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError(400, 'Validation error', errors.array().map(e => ({
      field: (e as any).param, message: e.msg
    })));
  }
  next();
}
