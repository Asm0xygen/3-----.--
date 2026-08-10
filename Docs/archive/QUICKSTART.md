# Запуск проекта 3авхоз.рф

## ✅ Проект готов к работе

### Что сделано

1. **Структура проекта создана:**
   - `/frontend` - Vite + React 18 + TypeScript + Tailwind CSS + Radix UI
   - `/backend` - Node.js REST API + Express + Prisma
   - `/shared` - общие TypeScript types

2. **Mock Mode добавлен:**
   - Backend работает без PostgreSQL/Supabase
   - In-memory хранилище для демонстрации
   - Автоматическое переключение между mock и database режимами

3. **Зависимости установлены:**
   - Все пакеты установлены (419 packages)
   - Prisma Client сгенерирован

4. **Проект запущен:**
   - Frontend: http://localhost:5174 ✅
   - Backend: http://localhost:3001 ✅ (🔶 MOCK MODE)

---

## 🚀 Как использовать

### Первый запуск (уже выполнен)

```bash
npm install
cd backend && npx prisma generate && cd ..
npm run dev
```

### Последующие запуски

```bash
npm run dev
```

### Режимы работы

**🔶 MOCK MODE (текущий):**

- Не требует PostgreSQL
- Данные в памяти (очищаются при перезапуске)
- Идеально для разработки и демонстрации

**🔷 DATABASE MODE:**
Для переключения на реальную БД

1. Отредактируйте `backend/.env`
2. Укажите реальный `DATABASE_URL`
3. Запустите `cd backend && npx prisma migrate dev`
4. Перезапустите сервер

---

## 📱 Доступные URL

- **Frontend:** http://localhost:5174
- **Backend API:** http://localhost:3001
- **Health Check:** http://localhost:3001/health

---

## 🎯 Ключевая функциональность

Лендинг включает:

- ✅ Hero секция с CTA
- ✅ Key message: "Загрузил реестр ОС → отсканировал QR-коды → получил отчёты и документы"
- ✅ How It Works (4 шага)
- ✅ Features (6 карточек)
- ✅ Before/After сравнение
- ✅ Интерактивная демонстрация с Radix UI (Dialog, Tabs, Progress)
- ✅ QR-генерация
- ✅ Mock инвентаризация

Backend API:

- ✅ POST /api/auth/register
- ✅ POST /api/auth/login
- ✅ POST /api/import/os (загрузка Excel реестра ОС)
- ✅ POST /api/import/generate-qr (генерация QR для выбранных активов)
- ✅ GET /api/assets
- ✅ POST /api/inventory/start
- ✅ POST /api/inventory/scan
- ✅ GET /api/reports

---

## 📖 Документация

- `README.md` - полная документация
- `IMPLEMENTATION.md` - детали реализации
- `backend/.env.example` - пример конфигурации

---

## ⚠️ Текущий статус

**Проект работает в DEMO режиме (mock mode).**

Все компоненты лендинга функциональны. Backend API работает с in-memory хранилищем.

Для production использования:

1. Подключите Supabase PostgreSQL
2. Настройте `backend/.env` с реальным DATABASE_URL
3. Примените миграции: `npx prisma migrate deploy`
