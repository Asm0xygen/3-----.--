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

## Сборка

```bash
npm run build
```

## Документация

- [Индекс документации](./Docs/README.md)
- [Техническое задание этапа 1](./Docs/TECHNICAL_SPECIFICATION_STAGE_1.md)
- [План реализации](./plans/IMPLEMENTATION_PLAN.md)
