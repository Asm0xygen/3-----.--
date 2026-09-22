import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/load-env';
import { ensureDatabaseConnection } from './db/database-connection';
import { connectDatabase } from './db';
import authRoutes from './routes/auth';
import importRoutes from './routes/import';
import assetsRoutes from './routes/assets';
import inventoryRoutes from './routes/inventory';
import reportsRoutes from './routes/reports';
import gdprRoutes from './routes/gdpr';
import organizationRoutes from './routes/organizations';
import { createAccessLogger } from './middleware/access-log';
import { errorHandler } from './middleware/error-handler';
import { createJsonBodyParser } from './middleware/json-body';
import { createReadinessHandler } from './middleware/readiness';
import { requestId } from './middleware/request-id';

const app = express();
const PORT = env.port;

const corsOptions = {
  origin: env.corsOrigins,
  credentials: true,
};

app.set('trust proxy', false);
app.use(requestId);
app.use(helmet());
app.use(cors(corsOptions));
app.use(createJsonBodyParser(env.upload.maxFileSizeBytes));
app.use(createAccessLogger((event) => console.log(JSON.stringify(event))));

app.use('/api/auth', authRoutes);
app.use('/api/import', importRoutes);
app.use('/api/assets', assetsRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/gdpr', gdprRoutes);
app.use('/api/organizations', organizationRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});
app.get('/ready', createReadinessHandler(connectDatabase));

app.use(errorHandler);

export async function startServer(): Promise<void> {
  await ensureDatabaseConnection(env, connectDatabase);

  await new Promise<void>((resolve, reject) => {
    const server = app.listen(PORT, () => {
      console.log(`🚀 Backend running on http://localhost:${PORT}`);
      resolve();
    });
    server.once('error', reject);
  });
}

if (require.main === module) {
  void startServer().catch(() => {
    console.error('Backend startup failed: Database connection is unavailable');
    process.exitCode = 1;
  });
}

export default app;
