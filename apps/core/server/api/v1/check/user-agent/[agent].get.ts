import { defineQuotaProtectedPublicApi } from "#server/utils/defineQuotaProtectedPublicApi";
import { Results } from "@riavzon/utils";
import { validateUserAgent } from "~~/shared/types/ApiLookUpsValidation";
import type { PublicApiResponse, BadUserAgent } from "~~/shared/types/ApiShapes";
import { ipLimiter } from "~~/server/utils/userIdLimiter";
import { getLogger } from "@riavzon/auth-h3client";
import { userAgentDataApi } from "~~/server/models/useragentApi";

  const quotaHandler = defineQuotaProtectedPublicApi(async (event): Promise<PublicApiResponse<BadUserAgent> | Results> => {
         const log = getLogger().child({ service: 'app', branch: 'public-api-handler', type: 'bad-user-agent-api' });
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const useragent = event.context.params!.agent;
          const userId = event.context.apiVerification?.userId;
          if (!userId) {
              setResponseStatus(event, 401);
              return {
                    ok: false,
                    date: new Date().toISOString(),
                    reason: 'Unauthorized',
              };
          }
          try {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const res = await userAgentDataApi(useragent!, userId, log);
            return res;
          } catch (err) {
            log.error({err}, 'Server error getting bad-user-agent data');
            setResponseStatus(event, 500);
            return {
              ok: false,
              date: new Date().toISOString(),
              reason: 'Server Error'         
            };
          }
  }, 'demo');

export default defineEventHandler(async (event): Promise<PublicApiResponse<BadUserAgent> | Results> => {
  const log = getLogger().child({service: 'app', branch: 'public-api-handler', type: 'bad-user-agent-api'});

  const useragent = event.context.params?.agent;
  const clientIpAddress = getRequestIP(event, {xForwardedFor: true});
  const { allowed: allowedToProceed, retryAfterMs } = ipLimiter(clientIpAddress ?? "unknown_ip");

  if (!allowedToProceed) {
        setResponseStatus(event, 429);
        setResponseHeader(event, 'Retry-After', Math.ceil(retryAfterMs / 1000));
        return {
          ok: false,
          date: new Date().toISOString(),
          reason: 'Too many requests. try again later',
        };
  }

  if (!useragent) {
     setResponseStatus(event, 400);
     return {
          ok: false,
          date: new Date().toISOString(),
          reason: 'Bad request',
     };
  }

  const validateData = validateUserAgent(event, {input: useragent}, log);
  if (typeof validateData === 'object') return validateData as Results;


  return quotaHandler(event);
});