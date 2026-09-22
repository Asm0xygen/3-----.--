import dotenv from 'dotenv';
import { resolve } from 'node:path';
import { parseEnvironment } from './env';

dotenv.config({ path: resolve(__dirname, '../../.env') });

export const env = parseEnvironment();
