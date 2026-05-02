import { drizzle } from "drizzle-orm/mysql2";
import parseDbEnv from '../envParser';
import mysql2 from 'mysql2/promise';
import mysql from 'mysql2';
import * as schema from './index';
import z from "zod";

const dbEnvSchema = z.object({
  DB_HOST: z.string(),
  DB_PORT: z.string().default('3306'),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
});

export type DbEnv = z.infer<typeof dbEnvSchema>;
const env = parseDbEnv<DbEnv>(dbEnvSchema);

export const poolConnection = mysql2.createPool({
    host: env.DB_HOST,
    port: Number(env.DB_PORT),
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 5, 
    queueLimit: 0, 
    connectTimeout: 1000 * 30,
});



export const dbPool = drizzle({ client: poolConnection, schema, mode: 'default' });

  const connection = mysql.createConnection({
    host: env.DB_HOST,
    port: Number(env.DB_PORT),
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 5, 
    queueLimit: 0, 
    connectTimeout: 1000 * 30,
  });

 export const db = drizzle({ client: connection, schema, mode: 'default' });