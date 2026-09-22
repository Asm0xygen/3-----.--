import { randomUUID } from 'node:crypto';
import type { Request, RequestHandler } from 'express';

export type RequestWithId = Request & { requestId: string };

export const requestId: RequestHandler = (req, res, next) => {
  const id = randomUUID();

  (req as RequestWithId).requestId = id;
  res.setHeader('X-Request-Id', id);
  next();
};
