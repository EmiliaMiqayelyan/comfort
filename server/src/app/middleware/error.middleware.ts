import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../../shared/errors/AppError';

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({ error: err.errors.map(e => `${e.path.join('.')}: ${e.message}`).join('; ') });
    return;
  }

  const message = err instanceof Error ? err.message : 'Internal server error';
  console.error('[ERROR]', err);
  res.status(500).json({ error: message });
}
