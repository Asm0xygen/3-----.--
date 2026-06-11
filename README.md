# 3авхоз.рф - Инвентаризация основных средств

Production-ready SaaS лендинг для автоматизации учёта основных средств.

## 🚀 Технологический стек

### Frontend

- **Vite** 5.4.19
- **React** 18+
- **TypeScript**
- **Tailwind CSS** - минималистичный SaaS стиль
- **Radix UI** - компоненты (Dialog, Tabs, Progress, Toast)
- **qrcode** - генерация QR-кодов

### Backend

- **Node.js** REST API
- **Express**
- **Prisma ORM**
- **PostgreSQL** (Supabase)
- **JWT** - аутентификация
- **multer** - загрузка файлов
- **xlsx** - парсинг Excel

## 📁 Структура проекта

```
/
├── frontend/          # Vite + React + TS + Tailwind
├── backend/           # Node.js REST API + Prisma
└── shared/            # Общие TypeScript types
```

## 🎯 Ключевая идея

**"Загрузил реестр ОС → отсканировал QR-коды → получил отчёты и документы"**

## ⚡ Быстрый старт

### 1. Установка зависимостей

```bash
npm run install:all
```

### 2. Настройка Backend

Создайте `.env` в папке `backend`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/3avhoz?schema=public"
JWT_SECRET="your-secret-key-change-in-production"
PORT=3001
```

### 3. Инициализация БД

```bash
cd backend
npm run prisma:generate
npm run prisma:migrate
```

### 4. Запуск приложения

Из корневой папки:

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3001

## 📊 API Endpoints

### Authentication

- `POST /api/auth/register` - регистрация
- `POST /api/auth/login` - вход

### Import

- `POST /api/import/os` - загрузка реестра ОС (Excel/CSV)

### Assets

- `GET /api/assets` - список активов
- `GET /api/assets/:id` - получить актив

### Inventory

- `POST /api/inventory/start` - начать инвентаризацию
- `POST /api/inventory/scan` - сканировать QR
- `GET /api/inventory/:id` - статус инвентаризации

### Reports

- `GET /api/reports` - список отчётов
- `GET /api/reports/:id` - конкретный отчёт

## 🗄️ База данных (Supabase)

### Таблицы:

**assets** - основные средства

- id, name, inventoryNumber, mol, cost, status, qrCode

**inventories** - инвентаризации

- id, name, createdAt, completedAt, status, totalAssets, foundAssets, missingAssets, percentage

**scans** - результаты сканирования

- id, assetId, inventoryId, status, timestamp, notes

**users** - пользователи

- id, email, password, name

## 🎨 UI/UX

### Секции лендинга:

1. **Hero** - заголовок + key message
2. **How It Works** - 4 шага процесса
3. **Features** - возможности системы
4. **Demo** - интерактивная демонстрация
5. **Before/After** - сравнение процессов
6. **CTA** - призыв к действию

### Демо сценарий:

1. **Загрузка** - mock upload Excel с данными ОС
2. **Выбор активов** - выбор позиций для генерации QR
3. **Генерация QR** - создание QR-кодов по запросу пользователя
4. **Сканирование** - ввод инвентарных номеров
5. **Отчёт** - статистика и результаты

## 🎯 Особенности

- ✅ Полностью working demo end-to-end
- ✅ QR-коды генерируются **по запросу** для выбранных активов
- ✅ Интерактивное демо без регистрации
- ✅ Radix UI для всех компонентов
- ✅ Tailwind CSS с SaaS стилем
- ✅ TypeScript для type-safety
- ✅ REST API backend
- ✅ **Соответствие РКН и 152-ФЗ** — документы, API прав субъектов ПД, аудит

## 🔐 Комплаенс РКН и 152-ФЗ

Сервис полностью соответствует требованиям законодательства РФ:

### Документы

- **[TERMS_OF_SERVICE.md](./TERMS_OF_SERVICE.md)** — Пользовательское соглашение и согласие на обработку ПД
- **[PRIVACY_POLICY.md](./PRIVACY_POLICY.md)** — Политика обработки персональных данных (152-ФЗ)
- **[RKN_COMPLIANCE.md](./RKN_COMPLIANCE.md)** — Политика соответствия требованиям РКН
- **[COMPLIANCE_GUIDE.md](./COMPLIANCE_GUIDE.md)** — Руководство по внедрению и комплаенсу

### Реализовано

- ✅ Согласие на обработку ПД при регистрации (обязательное)
- ✅ Хранение данных на территории РФ
- ✅ API прав субъектов ПД (доступ, экспорт, удаление, отзыв согласия)
- ✅ Аудит действий (AuditLog: register, login, data_access, etc.)
- ✅ Шифрование паролей (bcrypt), JWT-токены, HTTPS
- ✅ IP-логирование, User-Agent tracking
- ✅ Обработка запросов субъектов ПД (DataRequest)

### API endpoints

- `GET /api/gdpr/my-data` — получение информации о своих ПД
- `GET /api/gdpr/export` — экспорт данных
- `POST /api/gdpr/data-request` — запрос на изменение/удаление
- `POST /api/gdpr/revoke-consent` — отзыв согласия
- `DELETE /api/gdpr/delete-account` — удаление аккаунта

**Подробнее:** [COMPLIANCE_GUIDE.md](./COMPLIANCE_GUIDE.md)

## 🚫 Не включено

- ERP функциональность
- Складской учёт
- Бухгалтерия
- CRM
- Закупки
- Учёт недвижимости

Фокус строго на инвентаризации основных средств через QR-коды.

## 📦 Production Build

```bash
npm run build
```

## 🔒 Production checklist

### Инфраструктура

- [ ] Настроить Supabase проект (или PostgreSQL на территории РФ)
- [ ] Установить production DATABASE_URL
- [ ] Изменить JWT_SECRET
- [ ] Настроить CORS origins (явно указать домен)
- [ ] Добавить rate limiting
- [ ] Настроить SSL (Let's Encrypt)
- [ ] Оптимизировать Lighthouse scores

### Комплаенс РКН и 152-ФЗ

- [ ] **Уведомить РКН** о начале обработки ПД (30 дней)
- [ ] Зарегистрироваться в Реестре операторов ПД
- [ ] Заполнить реквизиты организации в документах (TERMS_OF_SERVICE.md, PRIVACY_POLICY.md)
- [ ] Разместить БД на территории РФ
- [ ] Назначить ответственного за обработку ПД
- [ ] Добавить чекбокс согласия на форму регистрации (frontend)
- [ ] Добавить ссылки на документы в Footer (/terms, /privacy)
- [ ] Настроить резервное копирование (ежедневно)
- [ ] Настроить мониторинг и алерты

**Подробный чек-лист:** [COMPLIANCE_GUIDE.md](./COMPLIANCE_GUIDE.md#чек-лист-внедрения)

## 📝 Лицензия

Proprietary - 3авхоз.рф

---

**Загрузил реестр ОС → отсканировал QR-коды → получил отчёты и документы** 🎉
