import type { AppEnvironment } from '../backend/src/config/env';

async function resolveDatabaseMode(environment: Pick<AppEnvironment, 'nodeEnv' | 'useMock'>) {
  const { resolveDatabaseMode } = await import('../backend/src/db/database-mode');
  return resolveDatabaseMode(environment);
}

test('использует mock БД только при явном флаге', async () => {
  await expect(resolveDatabaseMode({ nodeEnv: 'development', useMock: true })).resolves.toBe('mock');
  await expect(resolveDatabaseMode({ nodeEnv: 'test', useMock: false })).resolves.toBe('postgres');
});

test('отклоняет mock БД в production', async () => {
  await expect(resolveDatabaseMode({ nodeEnv: 'production', useMock: true })).rejects.toThrow(
    'USE_MOCK cannot be enabled in production',
  );
});
