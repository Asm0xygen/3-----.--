import express, { type Request } from 'express';
import request from 'supertest';
import { ApiError } from '../backend/src/errors/api-error';
import { errorHandler } from '../backend/src/middleware/error-handler';
import { requestId } from '../backend/src/middleware/request-id';

type RequestWithId = Request & { requestId?: string };

function createApp() {
  const app = express();

  app.use(requestId);
  app.get('/request-id', (req, res) => {
    res.json({ requestId: (req as RequestWithId).requestId });
  });
  app.get('/validation-error', () => {
    throw new ApiError({
      status: 422,
      code: 'VALIDATION_ERROR',
      message: 'Проверьте поля запроса.',
      fields: [{ path: 'inventoryNumber', message: 'Обязательное поле.' }],
    });
  });
  app.get('/unknown-error', () => {
    throw new Error('database password: secret-value');
  });
  app.use(errorHandler);

  return app;
}

test('присваивает непустой request ID запросу и ответу', async () => {
  const response = await request(createApp()).get('/request-id').expect(200);

  expect(response.headers['x-request-id']).toEqual(expect.any(String));
  expect(response.headers['x-request-id']).not.toBe('');
  expect(response.body).toEqual({ requestId: response.headers['x-request-id'] });
});

test('сериализует ApiError в единый контракт ошибки', async () => {
  const response = await request(createApp()).get('/validation-error').expect(422);

  expect(response.body).toEqual({
    error: {
      code: 'VALIDATION_ERROR',
      message: 'Проверьте поля запроса.',
      fields: [{ path: 'inventoryNumber', message: 'Обязательное поле.' }],
    },
  });
});

test('не раскрывает внутренние данные в неизвестной ошибке', async () => {
  const response = await request(createApp()).get('/unknown-error').expect(500);

  expect(response.body).toEqual({
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Внутренняя ошибка сервера.',
    },
  });
  expect(JSON.stringify(response.body)).not.toContain('secret-value');
});
