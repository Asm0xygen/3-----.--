import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

type PackageManifest = {
  devDependencies?: Record<string, string>;
  scripts?: Record<string, string>;
};

const root = resolve(import.meta.dirname, '..');

async function readPackageManifest(path: string): Promise<PackageManifest> {
  const content = await readFile(resolve(root, path), 'utf8');
  return JSON.parse(content) as PackageManifest;
}

test('все workspace-пакеты объявляют команды проверки', async () => {
  for (const path of [
    'package.json',
    'backend/package.json',
    'frontend/package.json',
    'shared/package.json',
  ]) {
    const manifest = await readPackageManifest(path);

    for (const command of ['lint', 'typecheck', 'test', 'test:unit', 'test:integration']) {
      expect(manifest.scripts?.[command], `${path}: отсутствует скрипт ${command}`).toEqual(
        expect.any(String),
      );
    }
  }
});

test('корневой пакет объявляет выбранные инструменты', async () => {
  const manifest = await readPackageManifest('package.json');

  for (const dependency of [
    '@eslint/js',
    'eslint',
    'eslint-config-prettier',
    'prettier',
    'typescript-eslint',
    'vitest',
  ]) {
    expect(manifest.devDependencies?.[dependency], `package.json: отсутствует ${dependency}`).toEqual(
      expect.any(String),
    );
  }
});

test('backend build генерирует Prisma Client до компиляции', async () => {
  const manifest = await readPackageManifest('backend/package.json');

  expect(manifest.scripts?.build).toContain('prisma generate');
});

test('инструменты, версия Node.js и CI-конфигурация зафиксированы', async () => {
  for (const path of [
    '.nvmrc',
    '.prettierrc.json',
    'eslint.config.mjs',
    'vitest.unit.config.ts',
    'vitest.integration.config.ts',
    '.github/workflows/ci.yml',
  ]) {
    await expect(access(resolve(root, path)), `${path}: файл отсутствует`).resolves.toBeUndefined();
  }
});
