import type { RequestHandler } from 'express';

export function createReadinessHandler(checkDatabase: () => Promise<void>): RequestHandler {
  return async (_req, res) => {
    try {
      await checkDatabase();
      res.json({ status: 'ready' });
    } catch {
      res.status(503).json({
        error: {
          code: 'SERVICE_UNAVAILABLE',
          message: 'Сервис временно недоступен.',
        },
      });
    }
  };
}
