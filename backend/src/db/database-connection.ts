import type { AppEnvironment } from '../config/env';

export async function ensureDatabaseConnection(
  environment: Pick<AppEnvironment, 'nodeEnv' | 'useMock'>,
  connect: () => Promise<void>,
): Promise<void> {
  if (environment.useMock) {
    return;
  }

  try {
    await connect();
  } catch {
    throw new Error('Database connection is unavailable');
  }
}
