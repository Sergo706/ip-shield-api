import { env } from 'node:process';
import { z, type ZodSchema } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export default function parseEnv<T>(schema: ZodSchema): T {
  try {
    return schema.parse(env) as T;
  } catch (error) {
    if (error instanceof z.ZodError) {
      let msg = 'Invalid environment variables:\n';
      error.issues.forEach((issue) => {
        msg += `${issue.path.join('.')}: ${issue.message}\n`;
      });
      const err = new Error(msg);
      console.error(msg);
      throw err;
    }
    console.error('Unexpected error:', error);
    throw error;
  }
}