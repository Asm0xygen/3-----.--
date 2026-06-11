# Code/Security review проекта «3авхоз.рф»

Дата проверки: 2026-06-11  
Контекст: проект находится в стадии разработки; регистрация и авторизация пользователей пока не считаются готовой продуктовой функциональностью.

## 1. Область проверки

Проверены:

- `Docs/ANALYSIS_REPORT.md`
- `Docs/PROJECT_REVIEW.md`
- backend: `backend/src/index.ts`, `backend/src/routes/*`, `backend/src/db/*`, `backend/prisma/schema.prisma`, `backend/package.json`
- frontend: `frontend/src/App.tsx`, `frontend/src/main.tsx`, `frontend/src/components/Demo.tsx`, `frontend/src/components/Header.tsx`, `frontend/src/components/ui/Button.tsx`, theme-related files, `frontend/package.json`
- shared: `shared/src/index.ts`

Не проверялось динамически:

- запуск API-запросов;
- SAST/DAST;
- `npm audit`;
- интеграционные тесты, потому что в проекте нет тестового набора.

## 2. Ключевой вывод

`Docs/PROJECT_REVIEW.md` в целом правильно выделяет главные риски, но завышает часть severity для текущей стадии разработки и содержит несколько неточностей:

- XSS в `frontend/src/components/Demo.tsx` не подтверждён: React экранирует строковый вывод, `dangerouslySetInnerHTML` не используется.
- `Docs/ANALYSIS_REPORT.md` утверждает, что кодовая база готова к production после рекомендаций. Это слишком сильный вывод: backend пока не имеет полноценного auth middleware, tenant/user isolation, rate limiting, security headers, тестов и строгой валидации входных данных.
- С учётом того, что регистрация/авторизация пока не реализованы как готовая функция, проблемы auth/GDPR-маршрутов лучше считать production blockers, а не немедленными критическими дефектами текущего демо.

## 3. Findings

### CRITICAL — Нет реальной авторизации и разграничения доступа в backend

Файлы:

- `backend/src/routes/gdpr.ts:6-15`
- `backend/src/routes/assets.ts:6-25`
- `backend/src/routes/inventory.ts:6-124`
- `backend/src/routes/reports.ts:6-72`
- `backend/src/routes/import.ts:10-117`

Наблюдение:

- `requireAuth` в GDPR только проверяет наличие заголовка `Authorization: Bearer ...`, но не проверяет JWT и не устанавливает `req.userId`.
- Основные бизнес-маршруты импортируют, читают и изменяют данные без аутентификации.
- В Prisma-моделях `Asset`, `Inventory`, `Scan` нет связи с пользователем или организацией, поэтому даже после добавления JWT невозможно корректно разделить данные клиентов.

Риск:

- В production любой клиент сможет читать или изменять чужие данные.
- GDPR endpoints сейчас не могут корректно вернуть «мои данные», потому что `userId` не устанавливается.

Рекомендация:

1. До production добавить общий auth middleware с проверкой подписи JWT, срока действия и обязательной установкой `req.user` / `req.userId`.
2. Добавить модель организации/tenant или владельца данных и связать с ней `Asset`, `Inventory`, `Scan`, `Report/DataRequest`.
3. На каждом маршруте фильтровать данные по владельцу/организации.
4. До внедрения auth явно пометить эти API как mock/dev-only и не публиковать backend наружу.

### HIGH — Отсутствует централизованная валидация входных данных

Файлы:

- `backend/src/routes/auth.ts:8-63`, `67-115`
- `backend/src/routes/import.ts:10-67`, `74-117`
- `backend/src/routes/inventory.ts:6-93`
- `backend/src/routes/gdpr.ts:115-160`, `165-252`

Наблюдение:

- `email`, `password`, `name`, `assetIds`, `inventoryId`, `inventoryNumber`, `status`, `notes`, `requestType`, `reason` принимаются напрямую из `req.body`.
- Для Excel/CSV импорта проверяется только наличие `inventoryNumber` и `name`; типы, длины строк, допустимые статусы, стоимость, лимиты строк не валидируются.
- `status` в scan можно передать произвольной строкой.

Риск:

- Некорректные данные попадут в БД.
- Возможны DoS через большие поля/массивы/файлы.
- Бизнес-логика отчётов и инвентаризации будет ломаться на неожиданных статусах и числах.

Рекомендация:

1. Ввести схемы валидации `zod`/`valibot`/`joi` для каждого endpoint.
2. Ограничить длины строк, размер массивов, допустимые enum-значения.
3. Для импорта задать обязательные колонки, лимит строк и нормализацию дат/стоимости.

### HIGH — Upload endpoint не ограничивает размер и тип файла

Файл: `backend/src/routes/import.ts:8-19`

Наблюдение:

```ts
const upload = multer({ storage: multer.memoryStorage() });
```

Риск:

- Файл загружается в память без лимита размера.
- Можно отправить большой файл и исчерпать память процесса.
- Нет фильтрации MIME/расширения и нет обработки повреждённых/сложных XLSX.

Рекомендация:

```ts
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => {
    const allowed = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'text/csv',
    ];
    cb(null, allowed.includes(file.mimetype));
  },
});
```

Плюс обработать `MulterError` централизованно.

### HIGH — Нет rate limiting и brute-force защиты

Файлы:

- `backend/src/index.ts:24-40`
- `backend/src/routes/auth.ts:8-115`
- `backend/src/routes/import.ts:74-117`

Наблюдение:

- `express-rate-limit` отсутствует в зависимостях.
- Нет лимитов для `/api/auth/login`, `/api/auth/register`, `/api/import/generate-qr`, `/api/import/os`.
- Нет блокировки или замедления повторных неудачных попыток входа.

Риск:

- Brute-force паролей после включения auth.
- DoS на QR generation/import endpoints.

Рекомендация:

- Добавить глобальный лимит для API.
- Добавить отдельный строгий лимит для auth endpoints.
- Для login хранить счётчик неудачных попыток и временную блокировку.

### HIGH — JWT_SECRET не валидируется при старте

Файл: `backend/src/routes/auth.ts:52`, `104`

Наблюдение:

```ts
const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });
```

Риск:

- При отсутствии `JWT_SECRET` приложение упадёт во время запроса, а не при старте.
- При слабом секрете подпись JWT легко подобрать.

Рекомендация:

- Валидировать env при запуске приложения.
- Для production требовать секрет достаточной длины.
- Вынести конфигурацию в отдельный модуль `config`.

### HIGH — Нет security headers

Файл: `backend/src/index.ts:24-25`

Наблюдение:

- `helmet` отсутствует.
- Не настроены `Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy`, `Frame-Options`.

Риск:

- Ослабленная защита от clickjacking, MIME sniffing и части XSS-сценариев.

Рекомендация:

- Добавить `helmet` на backend.
- Для frontend на Vite dev headers можно оставить мягкую конфигурацию, но production headers должны задаваться на уровне reverse proxy/backend/хостинга.

### MEDIUM — CORS с `credentials: true` и wildcard в development

Файл: `backend/src/index.ts:16-22`

Наблюдение:

```ts
origin: process.env.NODE_ENV === 'production' ? 'https://3авхоз.рф' : '*',
credentials: true,
```

Риск:

- Для dev это допустимо, но опасно перенести в staging/production.
- С `credentials: true` wildcard-origin является плохой конфигурационной привычкой.

Рекомендация:

- Использовать allowlist из env: `CORS_ORIGINS`.
- Fail-fast в production, если список origin не задан.

### MEDIUM — Неверная модель жизненного цикла Prisma/Express для тестов и serverless

Файл: `backend/src/index.ts:46-50`

Наблюдение:

- `app.listen` вызывается прямо в модуле, который также экспортирует `app`.

Риск:

- Сложнее писать интеграционные тесты.
- Сложнее переиспользовать Express app в serverless/preview окружениях.

Рекомендация:

- Разделить `app.ts` и `server.ts`: один создаёт app, второй запускает listen.

### MEDIUM — Производительность отчётов и инвентаризации: N+1 и загрузка всех записей

Файлы:

- `backend/src/routes/reports.ts:8-35`, `51-59`
- `backend/src/routes/inventory.ts:35-36`, `72-88`, `108-119`

Наблюдение:

- Reports загружает все inventories, затем для каждой inventory загружает scans, затем отдельно все assets.
- Inventory scan ищет asset через `findMany()` и `.find()` вместо запроса по `inventoryNumber`.

Риск:

- При росте данных endpoints быстро станут медленными.
- Без пагинации возможен DoS большим объёмом данных.

Рекомендация:

- Добавить индексы и запросы по конкретным полям.
- Использовать Prisma `include`/relations.
- Добавить пагинацию и лимиты.

### MEDIUM — Нет уникальности scan на уровне БД

Файл: `backend/prisma/schema.prisma:56-67`

Наблюдение:

- Код проверяет дубль scan через `findFirst`, но в схеме нет `@@unique([assetId, inventoryId])`.

Риск:

- При конкурентных запросах можно создать два scan для одного asset/inventory.

Рекомендация:

- Добавить `@@unique([assetId, inventoryId])` в модель `Scan`.
- Обработать ошибку уникальности Prisma.

### MEDIUM — Демо-пользователь в mock DB может вводить в заблуждение

Файл: `backend/src/db/mock.ts:92-105`

Наблюдение:

- В mock DB есть пользователь `demo@3avhoz.rf` с невалидным bcrypt-хешем-заглушкой.

Риск:

- Это не production-секрет, но выглядит как готовая учётная запись.
- Login для этого пользователя не будет работать, потому что `$2b$10$demo.hashed.password` не является корректным bcrypt hash.

Рекомендация:

- Либо удалить seed user до реализации auth.
- Либо явно назвать его fixture и не показывать как реальные demo credentials.

### MEDIUM — Ошибка в `Docs/ANALYSIS_REPORT.md`: endpoint report уже есть

Файл: `Docs/ANALYSIS_REPORT.md:22`

Наблюдение:

- В отчёте сказано, что `GET /api/reports/:id` не реализован.
- В коде он есть: `backend/src/routes/reports.ts:41-72`.

Уточнение:

- Endpoint возвращает JSON, а не PDF/Excel.
- Кнопка `Скачать отчёт` во frontend не подключена к API.

Рекомендация:

- Исправить формулировку: «endpoint JSON-отчёта реализован, но UI-кнопка не подключена; экспорт PDF/Excel не реализован».

### LOW — Frontend Demo: XSS не подтверждён, но формат scanInput стоит валидировать

Файл: `frontend/src/components/Demo.tsx:204-218`

Наблюдение:

- `scanInput` используется для сравнения с `asset.inventoryNumber`; прямого HTML-вставления нет.
- React экранирует строковый вывод.

Риск:

- Security-риск XSS низкий.
- UX/качество данных страдают: пробелы, регистр, неверный формат не обрабатываются явно.

Рекомендация:

- Нормализовать ввод: `trim().toUpperCase()`.
- Проверить формат `/^ОС-\d{4}$/` для демо-сценария.
- Показать понятную ошибку вместо silent miss.

### LOW — Дублируется theme hook

Файлы:

- `frontend/src/contexts/ThemeContext.tsx`
- `frontend/src/hooks/useTheme.tsx`

Наблюдение:

- Есть старый standalone hook `frontend/src/hooks/useTheme.tsx`, но Header использует context hook.

Риск:

- При будущем использовании старого hook появятся две независимые темы и неконсистентное поведение.

Рекомендация:

- Удалить standalone hook или переэкспортировать context hook из одного места.

### LOW — UI-кнопки не всегда имеют явный `type`

Файл: `frontend/src/components/ui/Button.tsx:24-29`

Наблюдение:

- Компонент `Button` не задаёт `type="button"` по умолчанию.

Риск:

- При размещении внутри формы кнопка станет submit по умолчанию.

Рекомендация:

- В `Button` задать `type={props.type ?? 'button'}`.

### LOW — Shared типы частично расходятся с backend mock типами

Файлы:

- `shared/src/index.ts`
- `backend/src/db/mock.ts`

Наблюдение:

- В shared типы статусов строгие.
- В backend mock `status`, `requestType`, `action` описаны как `string`.

Риск:

- Ошибки статусов ловятся не везде.

Рекомендация:

- Переиспользовать shared types или определить общие enum/literal unions для backend.

## 4. Приоритетный план исправлений

### До публичного backend/staging

1. Пометить текущие API как dev/mock-only или закрыть backend от внешнего доступа.
2. Добавить env validation и fail-fast для `JWT_SECRET`, `DATABASE_URL`, `CORS_ORIGINS`.
3. Добавить `helmet`, базовый API rate limit и строгий limit для auth/import/QR.
4. Ограничить upload size/type и лимит строк импорта.

### До реализации реальных пользователей

1. Спроектировать `Organization/Tenant` и ownership для assets/inventories/scans/reports.
2. Реализовать JWT middleware и role/permission checks.
3. Переписать GDPR endpoints поверх настоящего `req.userId`.
4. Добавить audit logging для чувствительных операций.

### До production

1. Добавить схемы валидации запросов.
2. Добавить пагинацию и ограничения выборок.
3. Добавить уникальность scan на уровне БД.
4. Добавить unit/integration тесты для auth, import, inventory, gdpr, reports.
5. Подключить frontend к реальному API или явно оставить demo-only режим.

## 5. Рекомендуемые правки к существующим отчётам

### `Docs/ANALYSIS_REPORT.md`

Исправить:

- строку 22: `GET /api/reports/:id` реализован, но не подключён к UI и не отдаёт PDF/Excel;
- строку 42: заменить «кодовая база готова к продакшн-деплою» на «кодовая база готова к дальнейшей разработке; production требует закрытия security blockers».

### `Docs/PROJECT_REVIEW.md`

Исправить:

- `Demo.tsx` XSS: понизить severity и уточнить, что XSS не подтверждён при текущем React-rendering;
- Header/security headers: перенести рекомендацию на backend/reverse proxy, а не на компонент Header;
- Auth/GDPR critical findings: оставить как blockers для production, но отметить, что auth пока не является завершённой фичей.

## 6. Итог

Текущий проект подходит для локального демо и разработки интерфейса. Для production или публичного API он пока не готов: главные блокеры — отсутствие реальной авторизации, отсутствие разграничения данных по пользователю/организации, отсутствие централизованной валидации, rate limiting, security headers и ограничений на импорт файлов.