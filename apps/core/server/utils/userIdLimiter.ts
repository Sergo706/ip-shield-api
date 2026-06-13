import { slidingWindowCounterRateLimiter } from "@riavzon/utils";

const limiter = slidingWindowCounterRateLimiter({ 
   maxEntries: 10_000,
   sweepIntervalMs: 60_000,
   enableBans: true,
 });

const ipCache = slidingWindowCounterRateLimiter({ 
   maxEntries: 50_000, 
   sweepIntervalMs: 30_000,
   enableBans: true,
});

export function userIdLimiter(userId: string, limit: number) {
  const limiterRes = limiter(userId, limit, 1000 * 60);
  return limiterRes;
}

export function ipLimiter(ip: string) {
  const limiterRes = ipCache(ip, 100, 1000);
  return limiterRes;
}