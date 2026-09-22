import type { AppEnvironment } from '../backend/src/config/env';

async function ensureDatabaseConnection(
  environment: Pick<AppEnvironment, 'nodeEnv' | 'useMock'>,
  connect: () => Promise<void>,
) {
  const { ensureDatabaseConnection: ensureConnection } = await import(
    '../backend/src/db/database-connection'
  );
  return ensureConnection(environment, connect);
}

test('не подключается к БД в явном mock-режиме', async () => {
  let called = false;

  await expect(
    ensureDatabaseConnection({ nodeEnv: 'development', useMock: true }, async () => {
      called = true;
    }),
  ).resolves.toBeUndefined();

  expect(called).toBe(false);
});

test('проверяет PostgreSQL перед запуском', async () => {
  let called = false;

  await ensureDatabaseConnection({ nodeEnv: 'production', useMock: false }, async () => {
    called = true;
  });

  expect(called).toBe(true);
});

test('останавливает запуск при недоступной PostgreSQL', async () => {
  await expect(
    ensureDatabaseConnection({ nodeEnv: 'production', useMock: false }, async () => {
      throw new Error('connection refused');
    }),
  ).rejects.toThrow('Database connection is unavailable');
});
