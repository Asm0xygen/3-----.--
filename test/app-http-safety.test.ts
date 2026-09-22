import type { Express } from 'express';
import request from 'supertest';

let app: Express;

beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  process.env.USE_MOCK = 'true';
  process.env.JWT_SECRET = 'test-secret';
  app = (await import('../backend/src/index')).default;
});

test('основное приложение принимает JSON меньше настроенного лимита', async () => {
  const response = await request(app)
    .post('/not-a-route')
    .set('Content-Type', 'application/json')
    .send(JSON.stringify({ value: 'x'.repeat(128 * 1024) }));

  expect(response.status).toBe(404);
});

test('основное приложение публикует readiness после проверки БД', async () => {
  const response = await request(app).get('/ready').expect(200);

  expect(response.body).toEqual({ status: 'ready' });
});

test('основное приложение разрешает CORS только для точного origin из allowlist', async () => {
  const allowed = await request(app).get('/health').set('Origin', 'http://localhost:5173').expect(200);
  const denied = await request(app).get('/health').set('Origin', 'https://untrusted.example').expect(200);

  expect(allowed.headers['access-control-allow-origin']).toBe('http://localhost:5173');
  expect(allowed.headers['access-control-allow-credentials']).toBe('true');
  expect(denied.headers['access-control-allow-origin']).toBeUndefined();
});

test('основное приложение возвращает базовые security headers', async () => {
  const response = await request(app).get('/health').expect(200);

  expect(response.headers['content-security-policy']).toContain("default-src 'self'");
  expect(response.headers['x-content-type-options']).toBe('nosniff');
  expect(response.headers['x-frame-options']).toBe('SAMEORIGIN');
});

test('основное приложение не доверяет X-Forwarded-For без согласованной proxy-инфраструктуры', () => {
  expect(app.get('trust proxy')).toBe(false);
});
