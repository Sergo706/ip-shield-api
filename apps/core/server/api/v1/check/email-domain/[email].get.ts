import { defineQuotaProtectedPublicApi } from "#server/utils/defineQuotaProtectedPublicApi";
import { Results } from "@riavzon/utils";
import { validateEmail } from "~~/shared/types/ApiLookUpsValidation";
import type { PublicApiResponse, EmailCheck } from "~~/shared/types/ApiShapes";
import { ipLimiter } from "~~/server/utils/userIdLimiter";
import { getLogger } from "@riavzon/auth-h3client";
import { emailCheckApi } from "~~/server/models/emailCheckApi";

  const quotaHandler = defineQuotaProtectedPublicApi(async (event): Promise<PublicApiResponse<EmailCheck> | Results> => {
         const log = getLogger().child({ service: 'app', branch: 'public-api-handler', type: 'email-check-api' });
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const email = event.context.params!.email;
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
            const res = await emailCheckApi(email!, userId, log);
            return res;
          } catch (err) {
            log.error({err}, 'Server error getting email-check data');
            setResponseStatus(event, 500);
            return {
              ok: false,
              date: new Date().toISOString(),
              reason: 'Server Error'         
            };
          }
  }, 'demo');

export default defineEventHandler(async (event): Promise<PublicApiResponse<EmailCheck> | Results> => {
  const log = getLogger().child({service: 'app', branch: 'public-api-handler', type: 'email-check-api'});

  const email = event.context.params?.email;
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

  if (!email) {
     setResponseStatus(event, 400);
     return {
          ok: false,
          date: new Date().toISOString(),
          reason: 'Bad request',
     };
  }

  const validateData = validateEmail(event, {input: email}, log);
  if (typeof validateData === 'object') return validateData as Results;


  return quotaHandler(event);
});