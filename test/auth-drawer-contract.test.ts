import { readFile } from 'node:fs/promises';

const headerPath = new URL('../frontend/src/components/Header.tsx', import.meta.url);
const authPath = new URL('../frontend/src/pages/Auth.tsx', import.meta.url);
const organizationApiPath = new URL('../frontend/src/api/organization.ts', import.meta.url);

test('кнопка обсуждения пилота открывает маршрут авторизации с панелью входа и регистрации', async () => {
  const [header, auth] = await Promise.all([readFile(headerPath, 'utf8'), readFile(authPath, 'utf8')]);

  expect(header).toContain('to="/auth"');
  expect(header).toContain('Вход | Регистрация');
  expect(auth).toContain('auth-drawer');
  expect(auth).toContain('>Войти</button>');
  expect(auth).toContain('>Регистрация</button>');
});

test('регистрация требует проверки ИНН и подтверждения найденной организации', async () => {
  const [auth, organizationApi] = await Promise.all([
    readFile(authPath, 'utf8'),
    readFile(organizationApiPath, 'utf8'),
  ]);

  expect(auth).toContain('lookupOrganization(registrationForm.inn)');
  expect(organizationApi).toContain("fetcher('/api/organizations/lookup'");
  expect(auth).toContain('Проверить ИНН');
  expect(auth).toContain('Подтверждаю организацию');
  expect(auth).toContain('disabled={!isOrganizationConfirmed}');
});
