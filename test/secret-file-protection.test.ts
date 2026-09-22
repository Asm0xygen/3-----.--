import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

async function isIgnored(path: string): Promise<boolean> {
  try {
    await execFileAsync('git', ['check-ignore', '--quiet', path]);
    return true;
  } catch {
    return false;
  }
}

test('Git игнорирует локальные env-файлы и приватные ключи', async () => {
  for (const path of [
    '.env',
    '.env.local',
    'backend/.env',
    'backend/.env.local',
    'deployment/server.key',
    'deployment/server.pem',
  ]) {
    await expect(isIgnored(path), `${path} не должен попасть в Git`).resolves.toBe(true);
  }
});

test('Git не игнорирует безопасные env-шаблоны', async () => {
  await expect(isIgnored('backend/.env.example')).resolves.toBe(false);
});
