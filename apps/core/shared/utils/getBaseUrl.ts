import authEnv from '../../lib/envParser';
import z from 'zod';

const envs = z.object({
    DOMAIN: z.string(),
    NODE_ENV: z.string()
});

type envs = z.infer<typeof envs>
const env = authEnv<envs>(envs);

export function getBaseURL(): string {
  const domain = env.NODE_ENV === 'development' ? 'localhost' : env.DOMAIN;
  
  let baseURL;
  if (domain === 'localhost') {
        baseURL = `http://${domain}:3001`;
  } else {
        baseURL = `http://${domain}`;
  }
  return baseURL;
}