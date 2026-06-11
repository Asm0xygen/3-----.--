import { Router } from 'express';
import { db } from '../db';

const router = Router();

// Middleware для проверки аутентификации (упрощённый)
const requireAuth = async (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // В реальной реализации здесь проверка JWT и получение userId
  // req.userId = decoded.userId;
  next();
};

// Получение информации о своих персональных данных (ст. 14 152-ФЗ)
router.get('/my-data', requireAuth, async (req: any, res) => {
  try {
    const userId = req.userId; // Из JWT после аутентификации

    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        consent: true,
        consentDate: true,
        lastLogin: true,
        ipAddress: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Аудит: запрос данных
    await db.auditLog.create({
      data: {
        userId,
        action: 'data_access',
        entity: 'user',
        entityId: userId,
        ipAddress: req.ip || 'unknown',
        userAgent: req.headers['user-agent'] || 'unknown',
      },
    });

    res.json({
      personalData: user,
      dataProcessing: {
        purposes: [
          'Регистрация и аутентификация в Сервисе',
          'Предоставление доступа к функционалу',
          'Техническая поддержка',
        ],
        legalBasis: 'Согласие субъекта ПД (ст. 6 152-ФЗ)',
        retentionPeriod: 'До удаления аккаунта или отзыва согласия',
        processor: 'Оператор: [Наименование организации]',
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve data' });
  }
});

// Экспорт всех данных в структурированном виде (право на портируемость)
router.get('/export', requireAuth, async (req: any, res) => {
  try {
    const userId = req.userId;

    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        consent: true,
        consentDate: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Можно добавить экспорт связанных данных (инвентаризации, отчёты)
    // const inventories = await db.inventory.findMany({ where: { userId } });

    // Аудит: экспорт данных
    await db.auditLog.create({
      data: {
        userId,
        action: 'data_export',
        entity: 'user',
        entityId: userId,
        ipAddress: req.ip || 'unknown',
        userAgent: req.headers['user-agent'] || 'unknown',
      },
    });

    res.json({
      user,
      exportDate: new Date().toISOString(),
      format: 'JSON',
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to export data' });
  }
});

// Запрос на изменение/уточнение данных (ст. 14 152-ФЗ)
router.post('/data-request', requireAuth, async (req: any, res) => {
  try {
    const userId = req.userId;
    const { requestType, reason } = req.body;

    // requestType: access, correction, deletion, consent_withdrawal
    if (!['access', 'correction', 'deletion', 'consent_withdrawal'].includes(requestType)) {
      return res.status(400).json({ error: 'Invalid request type' });
    }

    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const dataRequest = await db.dataRequest.create({
      data: {
        userId,
        email: user.email,
        requestType,
        reason: reason || null,
        status: 'pending',
      },
    });

    // Аудит: запрос субъекта ПД
    await db.auditLog.create({
      data: {
        userId,
        action: 'data_request',
        entity: 'data_request',
        entityId: dataRequest.id,
        ipAddress: req.ip || 'unknown',
        userAgent: req.headers['user-agent'] || 'unknown',
        details: JSON.stringify({ requestType, reason }),
      },
    });

    res.json({
      message: 'Запрос принят. Ответ будет направлен в течение 10 рабочих дней.',
      requestId: dataRequest.id,
      status: dataRequest.status,
      createdAt: dataRequest.createdAt,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create data request' });
  }
});

// Отзыв согласия на обработку ПД (ст. 9 152-ФЗ)
router.post('/revoke-consent', requireAuth, async (req: any, res) => {
  try {
    const userId = req.userId;
    const { reason } = req.body;

    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Создание запроса на удаление
    const dataRequest = await db.dataRequest.create({
      data: {
        userId,
        email: user.email,
        requestType: 'consent_withdrawal',
        reason: reason || 'Отзыв согласия на обработку ПД',
        status: 'pending',
      },
    });

    // Обновление consent
    await db.user.update({
      where: { id: userId },
      data: { consent: false },
    });

    // Аудит: отзыв согласия
    await db.auditLog.create({
      data: {
        userId,
        action: 'consent_withdrawal',
        entity: 'user',
        entityId: userId,
        ipAddress: req.ip || 'unknown',
        userAgent: req.headers['user-agent'] || 'unknown',
        details: JSON.stringify({ reason }),
      },
    });

    res.json({
      message: 'Согласие отозвано. Ваши данные будут удалены в течение 30 дней.',
      requestId: dataRequest.id,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to revoke consent' });
  }
});

// Удаление аккаунта (право на удаление)
router.delete('/delete-account', requireAuth, async (req: any, res) => {
  try {
    const userId = req.userId;
    const { password } = req.body;

    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Проверка пароля для подтверждения
    const bcrypt = require('bcrypt');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Аудит: удаление аккаунта
    await db.auditLog.create({
      data: {
        userId,
        action: 'account_deletion',
        entity: 'user',
        entityId: userId,
        ipAddress: req.ip || 'unknown',
        userAgent: req.headers['user-agent'] || 'unknown',
      },
    });

    // Удаление пользователя и всех связанных данных
    // В production следует использовать мягкое удаление (soft delete)
    await db.user.delete({ where: { id: userId } });

    res.json({
      message: 'Аккаунт успешно удалён. Все ваши персональные данные уничтожены.',
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete account' });
  }
});

// История запросов субъекта ПД
router.get('/data-requests', requireAuth, async (req: any, res) => {
  try {
    const userId = req.userId;

    const requests = await db.dataRequest.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ requests });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve requests' });
  }
});

export default router;
