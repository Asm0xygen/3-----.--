import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../db';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password, name, consent } = req.body;
    
    // Проверка согласия на обработку ПД (обязательное по 152-ФЗ)
    if (!consent) {
      return res.status(400).json({ 
        error: 'Для регистрации необходимо согласие на обработку персональных данных' 
      });
    }

    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const ipAddress = req.ip || req.socket.remoteAddress || 'unknown';
    
    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        consent: true,
        consentDate: new Date(),
        ipAddress,
        lastLogin: new Date(),
      },
    });

    // Аудит: регистрация
    await db.auditLog.create({
      data: {
        userId: user.id,
        action: 'register',
        entity: 'user',
        entityId: user.id,
        ipAddress,
        userAgent: req.headers['user-agent'] || 'unknown',
        details: JSON.stringify({ email, name }),
      },
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const ipAddress = req.ip || req.socket.remoteAddress || 'unknown';

    // Обновление lastLogin и IP
    await db.user.update({
      where: { id: user.id },
      data: {
        lastLogin: new Date(),
        ipAddress,
      },
    });

    // Аудит: вход
    await db.auditLog.create({
      data: {
        userId: user.id,
        action: 'login',
        entity: 'user',
        entityId: user.id,
        ipAddress,
        userAgent: req.headers['user-agent'] || 'unknown',
      },
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

export default router;
