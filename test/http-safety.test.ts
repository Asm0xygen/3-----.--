import express from 'express';
import request from 'supertest';
import { errorHandler } from '../backend/src/middleware/error-handler';
import { createJsonBodyParser } from '../backend/src/middleware/json-body';
import { createReadinessHandler } from '../backend/src/middleware/readiness';

function createJsonApp(limit: number) {
  const app = express();

  app.use(createJsonBodyParser(limit));
  app.post('/payload', (_req, res) => {
    res.sendStatus(204);
  });
  app.use(errorHandler);

  return app;
}

function createReadinessApp(checkDatabase: () => Promise<void>) {
  const app = express();

  app.get('/ready', createReadinessHandler(checkDatabase));
  app.use(errorHandler);

  return app;
}

test('отклоняет JSON, превышающий настроенный лимит', async () => {
  const response = await request(createJsonApp(128))
    .post('/payload')
    .set('Content-Type', 'application/json')
    .send(JSON.stringify({ value: 'x'.repeat(256) }))
    .expect(413);

  expect(response.body).toEqual({
    error: {
      code: 'PAYLOAD_TOO_LARGE',
      message: 'Размер тела запроса превышает допустимый лимит.',
    },
  });
});

test('возвращает готовность только после успешной проверки БД', async () => {
  let checked = false;
  const app = createReadinessApp(async () => {
    checked = true;
  });

  const response = await request(app).get('/ready').expect(200);

  expect(checked).toBe(true);
  expect(response.body).toEqual({ status: 'ready' });
});

test('не раскрывает детали недоступной БД через readiness endpoint', async () => {
  const app = createReadinessApp(async () => {
    throw new Error('postgres password: secret-value');
  });

  const response = await request(app).get('/ready').expect(503);

  expect(response.body).toEqual({
    error: {
      code: 'SERVICE_UNAVAILABLE',
      message: 'Сервис временно недоступен.',
    },
  });
  expect(JSON.stringify(response.body)).not.toContain('secret-value');
});
