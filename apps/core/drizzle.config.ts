import { defineConfig } from 'drizzle-kit';
import { z } from 'zod';

const env = z
  .object({
    DB_HOST: z.string().min(1),
    DB_PORT: z.string().min(1),
    MYSQL_USER: z.string().min(1),
    MYSQL_PASSWORD: z.string().min(1),
    MYSQL_DATABASE: z.string().min(1),
  }) 
  .parse(process.env);

export default defineConfig({
  out: './lib/db/migration',
  schema: './lib/db/index.ts',
  dialect: 'mysql',
  tablesFilter: ["plans", "plan_prices", "subscriptions", "early_access", "usage_rollup_monthly"],
  dbCredentials: {
    host: env.DB_HOST,
    port: Number(env.DB_PORT),
    user: env.MYSQL_USER,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DATABASE,
  },
  casing: 'snake_case',
});