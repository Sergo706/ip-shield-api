import { defineConfig } from 'drizzle-kit';
import { z } from 'zod';

const env = z
  .object({
    DB_HOST: z.string().min(1),
    DB_PORT: z.string().min(1),
    DB_USER: z.string().min(1),
    DB_PASSWORD: z.string().min(1),
    DB_NAME: z.string().min(1),
  }) 
  .parse(process.env);

export default defineConfig({
  out: './lib/db/migration',
  schema: './lib/db/index.ts',
  dialect: 'mysql',
  tablesFilter: ["plans", "plan_prices", "subscriptions"],
  dbCredentials: {
    host: env.DB_HOST,
    port: Number(env.DB_PORT),
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
  },
  casing: 'snake_case',
});