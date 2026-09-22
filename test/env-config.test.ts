type Environment = Record<string, string | undefined>;

async function parseEnvironment(overrides: Environment) {
  const { parseEnvironment } = await import('../backend/src/config/env');
  return parseEnvironment(overrides);
}

const validMockEnvironment: Environment = {
  JWT_SECRET: 'test-secret-with-at-least-thirty-two-characters',
  NODE_ENV: 'test',
  USE_MOCK: 'true',
};

test('разрешает mock БД только при явном USE_MOCK=true вне production', async () => {
  await expect(parseEnvironment(validMockEnvironment)).resolves.toMatchObject({
    nodeEnv: 'test',
    useMock: true,
  });
});

test('отклоняет неявный mock-режим без DATABASE_URL', async () => {
  await expect(
    parseEnvironment({
      JWT_SECRET: validMockEnvironment.JWT_SECRET,
      NODE_ENV: 'development',
    }),
  ).rejects.toThrow('DATABASE_URL is required unless USE_MOCK=true');
});

test('отклоняет production без JWT_SECRET, DATABASE_URL и CORS allowlist', async () => {
  await expect(parseEnvironment({ NODE_ENV: 'production' })).rejects.toThrow(
    'JWT_SECRET is required',
  );
  await expect(
    parseEnvironment({
      JWT_SECRET: validMockEnvironment.JWT_SECRET,
      NODE_ENV: 'production',
    }),
  ).rejects.toThrow('DATABASE_URL is required in production');
  await expect(
    parseEnvironment({
      DATABASE_URL: 'postgresql://app:password@localhost:5432/3avhoz',
      JWT_SECRET: validMockEnvironment.JWT_SECRET,
      NODE_ENV: 'production',
    }),
  ).rejects.toThrow('CORS_ORIGINS is required in production');
});

test('отклоняет USE_MOCK=true в production', async () => {
  await expect(
    parseEnvironment({
      CORS_ORIGINS: 'https://app.example.test',
      DATABASE_URL: 'postgresql://app:password@localhost:5432/3avhoz',
      JWT_SECRET: validMockEnvironment.JWT_SECRET,
      NODE_ENV: 'production',
      USE_MOCK: 'true',
    }),
  ).rejects.toThrow('USE_MOCK cannot be enabled in production');
});

test('нормализует production-конфигурацию с безопасными cookie и лимитами загрузки', async () => {
  await expect(
    parseEnvironment({
      CORS_ORIGINS: 'https://app.example.test, https://admin.example.test',
      DATABASE_URL: 'postgresql://app:password@localhost:5432/3avhoz',
      JWT_SECRET: validMockEnvironment.JWT_SECRET,
      NODE_ENV: 'production',
      PORT: '3100',
    }),
  ).resolves.toEqual({
    cookie: {
      sameSite: 'strict',
      secure: true,
    },
    corsOrigins: ['https://app.example.test', 'https://admin.example.test'],
    datanewton: {
      apiKey: undefined,
      apiUrl: 'http://10.0.61.230',
    },
    databaseUrl: 'postgresql://app:password@localhost:5432/3avhoz',
    jwtSecret: validMockEnvironment.JWT_SECRET,
    nodeEnv: 'production',
    port: 3100,
    upload: {
      maxFileSizeBytes: 10 * 1024 * 1024,
      maxRows: 50_000,
    },
    useMock: false,
  });
});
