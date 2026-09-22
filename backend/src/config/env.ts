export type Environment = Record<string, string | undefined>;

export type AppEnvironment = {
  cookie: {
    sameSite: 'strict';
    secure: boolean;
  };
  corsOrigins: string[];
  datanewton: {
    apiKey?: string;
    apiUrl: string;
  };
  databaseUrl?: string;
  jwtSecret: string;
  nodeEnv: 'development' | 'production' | 'test';
  port: number;
  upload: {
    maxFileSizeBytes: number;
    maxRows: number;
  };
  useMock: boolean;
};

const DEFAULT_PORT = 3001;
const DEFAULT_DATANEWTON_API_URL = 'http://10.0.61.230';
const MAX_IMPORT_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const MAX_IMPORT_ROWS = 50_000;
const NODE_ENVIRONMENTS = new Set(['development', 'production', 'test']);

function requiredValue(environment: Environment, name: string): string {
  const value = environment[name]?.trim();

  if (!value) {
    throw new Error(`${name} is required`);
  }

  return value;
}

function parseNodeEnv(value: string | undefined): AppEnvironment['nodeEnv'] {
  const nodeEnv = value?.trim() || 'development';

  if (!NODE_ENVIRONMENTS.has(nodeEnv)) {
    throw new Error('NODE_ENV must be development, production, or test');
  }

  return nodeEnv as AppEnvironment['nodeEnv'];
}

function parsePort(value: string | undefined): number {
  if (!value) {
    return DEFAULT_PORT;
  }

  const port = Number(value);
  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new Error('PORT must be an integer between 1 and 65535');
  }

  return port;
}

function parseCorsOrigins(value: string | undefined, required: boolean): string[] {
  const entries = value
    ?.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (!entries?.length) {
    if (required) {
      throw new Error('CORS_ORIGINS is required in production');
    }

    return ['http://localhost:5173'];
  }

  return entries.map((origin) => {
    if (origin === '*') {
      throw new Error('CORS_ORIGINS cannot contain *');
    }

    let url: URL;
    try {
      url = new URL(origin);
    } catch {
      throw new Error(`CORS_ORIGINS contains an invalid origin: ${origin}`);
    }

    if (!['http:', 'https:'].includes(url.protocol) || url.origin !== origin) {
      throw new Error(`CORS_ORIGINS contains an invalid origin: ${origin}`);
    }

    return origin;
  });
}

function validateDatabaseUrl(value: string): string {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error('DATABASE_URL must be a valid PostgreSQL URL');
  }

  if (!['postgres:', 'postgresql:'].includes(url.protocol)) {
    throw new Error('DATABASE_URL must be a PostgreSQL URL');
  }

  return value;
}

export function parseEnvironment(environment: Environment = process.env): AppEnvironment {
  const nodeEnv = parseNodeEnv(environment.NODE_ENV);
  const jwtSecret = requiredValue(environment, 'JWT_SECRET');
  const useMock = environment.USE_MOCK === 'true';

  if (nodeEnv === 'production' && useMock) {
    throw new Error('USE_MOCK cannot be enabled in production');
  }

  const databaseUrl = environment.DATABASE_URL?.trim();
  if (!databaseUrl && !useMock) {
    throw new Error(
      nodeEnv === 'production'
        ? 'DATABASE_URL is required in production'
        : 'DATABASE_URL is required unless USE_MOCK=true',
    );
  }

  return {
    cookie: {
      sameSite: 'strict',
      secure: nodeEnv === 'production',
    },
    corsOrigins: parseCorsOrigins(environment.CORS_ORIGINS, nodeEnv === 'production'),
    datanewton: {
      apiKey: environment.DATANEWTON_API_KEY?.trim() || undefined,
      apiUrl: environment.DATANEWTON_API_URL?.trim() || DEFAULT_DATANEWTON_API_URL,
    },
    databaseUrl: databaseUrl ? validateDatabaseUrl(databaseUrl) : undefined,
    jwtSecret,
    nodeEnv,
    port: parsePort(environment.PORT),
    upload: {
      maxFileSizeBytes: MAX_IMPORT_FILE_SIZE_BYTES,
      maxRows: MAX_IMPORT_ROWS,
    },
    useMock,
  };
}
