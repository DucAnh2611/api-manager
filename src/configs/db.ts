import { env } from '../libs';

export const DATABASE_CONFIG = {
  host: env.DATABASE_HOST || 'localhost',
  port: Number(env.DATABASE_PORT || '5432'),
  username: env.DATABASE_USERNAME || 'postgres',
  password: env.DATABASE_PASSWORD || '',
  database: env.DATABASE_NAME || '',
};
