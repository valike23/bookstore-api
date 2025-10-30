import { Request } from 'express';

export function getCustomerId(req: Request): number {
  const raw = (req.headers['x-customer-id'] ?? req.header('X-Customer-Id')) as string | undefined;
  const id = raw ? parseInt(raw, 10) : NaN;
  if (!id || Number.isNaN(id)) {
    throw new Error('Missing or invalid X-Customer-Id header');
  }
  return id;
}
