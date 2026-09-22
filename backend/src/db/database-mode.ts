import type { AppEnvironment } from '../config/env';

export function resolveDatabaseMode(
  environment: Pick<AppEnvironment, 'nodeEnv' | 'useMock'>,
): 'mock' | 'postgres' {
  if (environment.nodeEnv === 'production' && environment.useMock) {
    throw new Error('USE_MOCK cannot be enabled in production');
  }

  return environment.useMock ? 'mock' : 'postgres';
}
