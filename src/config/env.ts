import dotenv from 'dotenv';
dotenv.config();

function requireEnv(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if(name === 'DB_PASS' && value === '') {
    return '';
  }
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '3000', 10),

  DB_HOST: requireEnv('DB_HOST', '127.0.0.1'),
  DB_PORT: parseInt(process.env.DB_PORT || '3306', 10),
  DB_USER: requireEnv('DB_USER', 'root'),
  DB_PASS: requireEnv('DB_PASS', ''),
  DB_NAME: requireEnv('DB_NAME', 'bookstore'),
};
