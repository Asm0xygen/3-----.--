import type { RequestHandler } from 'express';
import type { RequestWithId } from './request-id';

export type AccessLogEvent = {
  method: string;
  path: string;
  requestId: string;
  status: number;
};

export function createAccessLogger(write: (event: AccessLogEvent) => void): RequestHandler {
  return (req, res, next) => {
    res.on('finish', () => {
      write({
        method: req.method,
        path: req.path,
        requestId: (req as RequestWithId).requestId,
        status: res.statusCode,
      });
    });
    next();
  };
}
