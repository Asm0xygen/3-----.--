import express from 'express';
import request from 'supertest';
import { createAccessLogger, type AccessLogEvent } from '../backend/src/middleware/access-log';
import { requestId } from '../backend/src/middleware/request-id';

test('access-лог содержит только минимальный контекст без IP, заголовков и тела', async () => {
  const events: AccessLogEvent[] = [];
  const app = express();

  app.use(requestId);
  app.use(createAccessLogger((event) => events.push(event)));
  app.use(express.json());
  app.post('/import', (_req, res) => {
    res.sendStatus(204);
  });

  await request(app)
    .post('/import')
    .set('Authorization', 'Bearer secret-token')
    .set('Cookie', 'refreshToken=secret-cookie')
    .set('X-Forwarded-For', '203.0.113.1')
    .send({ password: 'secret-password', importedAsset: 'secret-import-data' })
    .expect(204);

  expect(events).toHaveLength(1);
  expect(events[0]).toEqual({
    method: 'POST',
    path: '/import',
    requestId: expect.any(String),
    status: 204,
  });
  expect(JSON.stringify(events[0])).not.toContain('secret-token');
  expect(JSON.stringify(events[0])).not.toContain('secret-cookie');
  expect(JSON.stringify(events[0])).not.toContain('secret-password');
  expect(JSON.stringify(events[0])).not.toContain('secret-import-data');
  expect(JSON.stringify(events[0])).not.toContain('203.0.113.1');
});
