import { defineEventHandler, type EventHandler, type EventHandlerRequest } from 'h3';
import { consumeQuota } from '../models/consumeQuata';
import { userIdLimiter } from './userIdLimiter';
import { getCachedUserData } from '../models/getUserUsage';

type Privilege = 'custom' | 'demo' | 'restricted' | 'protected' | 'full';

export const defineQuotaProtectedPublicApi = <T extends EventHandlerRequest, D>(
  handler: EventHandler<T, D>,
  tokenPrivilege: Privilege,
  requiredPlanCode?: 'free' | 'pro' | 'custom',
): EventHandler<T, Promise<D>> => {

  return defineAuthenticatePublicApi(
    defineEventHandler(async (event) => {
      const log = getLogger().child({ service: 'app', branch: 'utils', type: 'quota-gate' });
      const token = event.context.apiVerification;
      if (!token?.userId) {
        setResponseStatus(event, 401);
        return {
          ok: false,
          date: new Date().toISOString(),
          reason: 'Unauthorized',
        };
      }
      const planResult = await getCachedUserData(token.userId, log);
      if (!planResult.ok) {
         setResponseStatus(event, 400);
         return { ok: false, date: new Date().toISOString(), reason: planResult.reason };
      }

      const { allowed: allowedToUseQuota, retryAfterMs } = userIdLimiter(token.userId.toString(), planResult.data.requestsPerMinute);
      
      if (!allowedToUseQuota) {
        setResponseStatus(event, 429);
        setResponseHeader(event, 'Retry-After', Math.ceil(retryAfterMs / 1000));
        return {
          ok: false,
          date: new Date().toISOString(),
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          reason: `Too many requests. ${planResult.data.requestsPerMinute} reqs/minute allowed`,
        };
      }

      const userPlan = planResult.data.plan;
      if (requiredPlanCode && userPlan !== requiredPlanCode && userPlan !== 'custom') {
        setResponseStatus(event, 403);
        return { ok: false, date: new Date().toISOString(), reason: `Requires ${requiredPlanCode} plan.` };
      }
      
      const allowed = await consumeQuota(
        token.userId,
        log,
      );

      if (!allowed) {
        setResponseStatus(event, 429);
        return {
          ok: false,
          date: new Date().toISOString(),
          reason: 'Monthly quota exceeded',
        };
      }

      event.context.userPlan = planResult.data;
      return handler(event);
    }) as EventHandler<T, D>,
    tokenPrivilege,
  );
};