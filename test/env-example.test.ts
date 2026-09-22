import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const examplePath = resolve(import.meta.dirname, '../backend/.env.example');

async function readExample(): Promise<Record<string, string>> {
  const content = await readFile(examplePath, 'utf8');

  return Object.fromEntries(
    content
      .split(/\r?\n/)
      .filter((line) => line && !line.startsWith('#'))
      .map((line) => {
        const separator = line.indexOf('=');
        return [line.slice(0, separator), line.slice(separator + 1).replace(/^"|"$/g, '')];
      }),
  );
}

test('env example перечисляет режим, БД, CORS и лимиты без рабочих секретов', async () => {
  const example = await readExample();

  expect(example).toMatchObject({
    CORS_ORIGINS: 'http://localhost:5173',
    DATABASE_URL: 'postgresql://app:replace-with-password@localhost:5432/3avhoz?schema=public',
    JWT_SECRET: 'replace-with-a-unique-secret-at-least-32-characters-long',
    NODE_ENV: 'development',
    PORT: '3001',
    USE_MOCK: 'false',
  });
  expect(example.JWT_SECRET).not.toContain('your-secret');
});
