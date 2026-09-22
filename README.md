# Завхоз.рф

Репозиторий прототипа сервиса для работы с реестром основных средств и инвентаризации.

## Статус

Проект не готов к публичному использованию, обработке реальных данных организаций или production-развёртыванию. В backend есть прототипные маршруты и in-memory demo-режим, а активный frontend содержит информационные страницы и не подключён к API.

## Структура

```text
frontend/  Vite, React, TypeScript, Tailwind
backend/   Express, Prisma, PostgreSQL-прототип
shared/    общие TypeScript-типы
Docs/      актуальные требования и статус
plans/     порядок реализации
```

## Требования

- Node.js `24.14.0` (версия зафиксирована в `.nvmrc`);
- npm 11 или новее;
- PostgreSQL 16 или новее для работы с реальной БД.

## Локальный запуск прототипа

```bash
npm install
npm run dev
```

Для подключения PostgreSQL скопируйте `backend/.env.example` в `backend/.env`, задайте `DATABASE_URL` и `JWT_SECRET`, затем выполните:

```bash
npm run prisma:generate --workspace=backend
npm run prisma:migrate --workspace=backend
```

Без `DATABASE_URL` текущий backend использует данные в памяти. Этот режим предназначен только для локальной разработки и демонстрации.

### Локальная PostgreSQL

Создайте локальную БД и пользователя любым принятым в команде способом. Для Docker:

```bash
docker run --name 3avhoz-postgres -e POSTGRES_USER=app -e POSTGRES_PASSWORD=local-password -e POSTGRES_DB=3avhoz -p 5432:5432 -d postgres:16
```

Затем укажите соответствующий `DATABASE_URL` в `backend/.env` и примените команды Prisma из предыдущего раздела.

## Проверки

```bash
npm run typecheck
npm run lint
npm run test:unit
npm run test:integration
npm run build
git diff --check
```

`npm run test` запускает оба набора. При отсутствии файлов соответствующий набор завершается успешно; новые unit-тесты следует размещать в `test/` или называть `*.unit.test.ts`, интеграционные — `*.integration.test.ts`.

Для форматирования используйте `npm run format`; проверка без записи — `npm run format:check`.

## Документация

- [Индекс документации](./Docs/README.md)
- [Техническое задание этапа 1](./Docs/TECHNICAL_SPECIFICATION_STAGE_1.md)
- [Проектирование регистрации, авторизации и административного доступа](./Docs/AUTHENTICATION_AUTHORIZATION_DESIGN.md)
- [План реализации](./plans/IMPLEMENTATION_PLAN.md)
