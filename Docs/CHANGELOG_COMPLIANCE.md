# Changelog: Комплаенс РКН и 152-ФЗ

## [1.1.0] - 2026-06-07

### Добавлено

#### 📜 Документация

- **TERMS_OF_SERVICE.md** — Пользовательское соглашение и согласие на обработку ПД
- **PRIVACY_POLICY.md** — Политика обработки персональных данных (152-ФЗ)
- **RKN_COMPLIANCE.md** — Политика соответствия требованиям РКН

#### 🔐 База данных

- **User.consent** (Boolean) — согласие на обработку ПД (обязательное)
- **User.consentDate** (DateTime) — дата получения согласия
- **User.lastLogin** (DateTime) — последний вход для аудита
- **User.ipAddress** (String) — IP-адрес для логирования
- **User.updatedAt** (DateTime) — дата последнего обновления

- **AuditLog** — таблица для аудита действий:
  - userId, action, entity, entityId
  - ipAddress, userAgent, details (JSON)
  - timestamp
  - Индексы: userId, action, timestamp

- **DataRequest** — таблица для запросов субъектов ПД:
  - userId, email, requestType, status
  - reason, response, createdAt, completedAt
  - Индексы: userId, status

#### 🔌 API endpoints (/api/gdpr)

- **GET /my-data** — получение информации о своих ПД (ст. 14 152-ФЗ)
- **GET /export** — экспорт данных в структурированном виде
- **POST /data-request** — запрос на изменение/уточнение/удаление данных
- **POST /revoke-consent** — отзыв согласия на обработку ПД (ст. 9 152-ФЗ)
- **DELETE /delete-account** — удаление аккаунта и всех ПД
- **GET /data-requests** — история запросов субъекта ПД

#### 🛡️ Безопасность и аудит

- **Логирование IP-адресов** при регистрации и входе
- **Обновление lastLogin** при каждом входе
- **Аудит действий** (register, login, data_access, data_export, consent_withdrawal)
- **Проверка согласия** — регистрация невозможна без согласия на обработку ПД
- **CORS настройка** — явное указание домена в production

#### 🗄️ Mock DB

- Поддержка всех новых моделей: AuditLog, DataRequest
- Методы: createAuditLog, findAuditLogs, createDataRequest, findDataRequests
- Обновлён демо-пользователь с полями комплаенса

### Изменено

#### ♻️ Backend

- **auth.ts** — добавлена проверка consent, логирование IP, аудит
- **index.ts** — подключен роут /api/gdpr, настроен CORS, добавлено логирование запросов
- **schema.prisma** — расширена модель User, добавлены AuditLog и DataRequest
- **mock.ts** — обновлены интерфейсы и методы для новых полей
- **db/index.ts** — добавлены адаптеры для auditLog и dataRequest

### Требования к внедрению

#### 🚀 Production checklist

1. **Уведомление РКН:**
   - Подать уведомление о начале обработки ПД (форма по Приказу РКН № 94)
   - Включить сведения в Реестр операторов ПД
   - Срок: 30 дней после начала обработки

2. **Локальные акты:**
   - Утвердить Политику обработки ПД (PRIVACY_POLICY.md)
   - Назначить ответственного за обработку ПД
   - Разработать Положение об обработке и защите ПД
   - Инструкция для работников

3. **Серверы:**
   - Разместить БД на территории РФ (ч. 5 ст. 18 152-ФЗ)
   - Указать фактический дата-центр в документации

4. **HTTPS:**
   - Обязательно использовать HTTPS в production
   - Получить SSL-сертификат (Let's Encrypt)

5. **Реквизиты:**
   - Заполнить реквизиты организации в:
     - TERMS_OF_SERVICE.md
     - PRIVACY_POLICY.md
     - RKN_COMPLIANCE.md

6. **Согласие:**
   - Добавить чекбокс на форму регистрации (frontend)
   - Текст: «Я согласен с [Пользовательским соглашением] (#) и [Политикой обработки ПД] (#)»

7. **Резервное копирование:**
   - Настроить автоматические бэкапы БД
   - Хранить копии на территории РФ

8. **Мониторинг:**
   - Настроить логирование (winston/morgan)
   - Анализ логов безопасности
   - Мониторинг инцидентов

### Ответственность

#### ⚖️ При нарушении

- **Административная (ст. 13.11 КоАП РФ):**
  - Физ. лица: 10 000 – 40 000 руб.
  - Юр. лица: 75 000 – 500 000 руб.

- **Уголовная (ст. 137, 272, 273 УК РФ):**
  - Штраф до 500 000 руб.
  - Лишение свободы до 5 лет

### Миграция

```bash
# Production (с БД)
cd backend
npx prisma migrate dev --name add_compliance_fields

# Mock mode
# Обновления применяются автоматически
```

### Тестирование

```bash
# Регистрация без согласия (должна вернуть 400)
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123","name":"Test"}'

# Регистрация с согласием (должна вернуть 200)
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123","name":"Test","consent":true}'
```

### Ссылки

- [152-ФЗ «О персональных данных»](http://www.consultant.ru/document/cons_doc_LAW_61801/)
- [149-ФЗ «Об информации»](http://www.consultant.ru/document/cons_doc_LAW_61798/)
- [Роскомнадзор](https://rkn.gov.ru)
- [Реестр операторов ПД](https://rkn.gov.ru/personal-data/register/)

---

**Важно:** Документы TERMS_OF_SERVICE.md, PRIVACY_POLICY.md и RKN_COMPLIANCE.md должны быть доступны пользователям на сайте (добавить ссылки в Footer).
