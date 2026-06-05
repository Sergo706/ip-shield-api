import { defineQuotaProtectedPublicApi } from "#server/utils/defineQuotaProtectedPublicApi";
import { Results } from "@riavzon/utils";
import { validateIp } from "~~/shared/types/ApiLookUpsValidation";
import type { PublicApiResponse, GeoData } from "~~/shared/types/ApiShapes";
import { ipLimiter } from "~~/server/utils/userIdLimiter";
import { getLogger } from "@riavzon/auth-h3client";
import { geoDataApi } from "~~/server/models/geoDataApi";

  const quotaHandler = defineQuotaProtectedPublicApi(async (event): Promise<PublicApiResponse<GeoData> | Results> => {
         const log = getLogger().child({ service: 'app', branch: 'public-api-handler', type: 'geo-api' });
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const ip = event.context.params!.ip;
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
            const res = await geoDataApi(ip!, userId, log);
            return res;
          } catch (err) {
            log.error({err}, 'Server error getting geo data');
            setResponseStatus(event, 500);
            return {
              ok: false,
              date: new Date().toISOString(),
              reason: 'Server Error'         
            };
          }
  }, 'demo');

export default defineEventHandler(async (event): Promise<PublicApiResponse<GeoData> | Results> => {
  const log = getLogger().child({service: 'app', branch: 'public-api-handler', type: 'geo-api'});

  const ip = event.context.params?.ip;
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

  if (!ip) {
     setResponseStatus(event, 400);
     return {
          ok: false,
          date: new Date().toISOString(),
          reason: 'Bad request',
     };
  }

  const validateData = validateIp(event, {input: ip}, log);
  if (typeof validateData === 'object') return validateData as Results;


  return quotaHandler(event);
});