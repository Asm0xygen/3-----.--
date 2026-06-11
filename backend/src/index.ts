import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import importRoutes from './routes/import';
import assetsRoutes from './routes/assets';
import inventoryRoutes from './routes/inventory';
import reportsRoutes from './routes/reports';
import gdprRoutes from './routes/gdpr';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Настройка CORS для production (РКН требует явного указания домена)
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://3авхоз.рф' 
    : '*',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Логирование запросов для аудита (в production использовать winston/morgan)
app.use((req, res, next) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - IP: ${req.ip}`);
  }
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/import', importRoutes);
app.use('/api/assets', assetsRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/gdpr', gdprRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});

export default app;
