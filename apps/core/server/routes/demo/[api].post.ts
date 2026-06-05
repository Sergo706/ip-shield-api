import { networkApiData } from "~~/server/models/networkApi";
import { geoDataApi } from "~~/server/models/geoDataApi";
import { userAgentDataApi } from "~~/server/models/useragentApi";
import { emailCheckApi } from "~~/server/models/emailCheckApi";
import { singleLookUp } from "~~/server/models/singleIpLookup";
import { summaryApi } from "~~/server/models/summaryApi";
import { validateIp, validateEmail, validateUserAgent } from "~~/shared/types/ApiLookUpsValidation";

export default defineAuthenticatedEventPostHandlers(async (event) => {
  const action = event.context.params?.api;
  const user = event.context.authorizedData;
  const log = getLogger().child({service: 'app', branch: 'handler', type: 'playground-api'});

  if (!action || !user) {
    setResponseStatus(event, 400);
    log.info({action, userId: user?.userId}, 'Invalid action or no user');
    return {
      ok: false,
      date: new Date().toISOString(),
      reason: 'Bad request'
    };
  }

  const userId = Number(user.userId);
  await limitBytes(1000000)(event);

  const bodyObj = event.context.body as { input: string };
  if (action === 'network') {
      try {
        const ip = validateIp(event, bodyObj, log);
        if (typeof ip === 'object') return ip;
        const network = await networkApiData(ip, userId, log);
        return network;
      } catch (err) {
        log.error({err}, 'Server error getting demo network data');
        setResponseStatus(event, 500);
        return {
           ok: false,
           date: new Date().toISOString(),
           reason: 'Server Error'         
        };
      }
  } else if (action === 'geo') {
    try {
      const ip = validateIp(event, bodyObj, log);
      if (typeof ip === 'object') return ip;
      const geo = await geoDataApi(ip, userId, log);
      return geo;
    } catch (err) {
        log.error({err}, 'Server error getting demo geo data');
        setResponseStatus(event, 500);
        return {
           ok: false,
           date: new Date().toISOString(),
           reason: 'Server Error'         
        };
    }
  } else if (action === 'useragent') {
      const validatedUserAgent = validateUserAgent(event, bodyObj, log);
      if (typeof validatedUserAgent === 'object') return validatedUserAgent;
      
      try {
        const res = await userAgentDataApi(validatedUserAgent, userId, log);
        return res;
      } catch (err) {
        log.error({err}, 'Server error getting demo useragent data');
        setResponseStatus(event, 500);
        return {
           ok: false,
           date: new Date().toISOString(),
           reason: 'Server Error'         
        };
      }
  } else if (action === 'email') {
      const validatedEmail = validateEmail(event, bodyObj, log);
      if (typeof validatedEmail === 'object') return validatedEmail;
        
      try {
        const res = await emailCheckApi(validatedEmail, userId, log);
        return res;
      } catch (err) {
        const isInvalid = err instanceof Error && err.message.includes('Invalid email');
        if (!isInvalid) {
          log.error({err}, 'Server error getting demo email data');
          setResponseStatus(event, 500);
          return {
            ok: false,
            date: new Date().toISOString(),
            reason: 'Server Error'         
          };
        }
      }
  } else if (action === 'lookup') {
      const ip = validateIp(event, bodyObj, log);
      if (typeof ip === 'object') return ip;
      
      try {
        const res = await singleLookUp(ip, userId, log);
        return res;
      } catch (err) {
        log.error({err}, 'Server error getting demo lookup data');
        setResponseStatus(event, 500);
        return {
           ok: false,
           date: new Date().toISOString(),
           reason: 'Server Error'         
        };
    }
  } else if (action === 'summary') {
      const ip = validateIp(event, bodyObj, log);
      if (typeof ip === 'object') return ip;
      try {
        const res = await summaryApi(ip, userId, log);
        return res;
      } catch (err) {
        log.error({err}, 'Server error getting demo summary data');
        setResponseStatus(event, 500);
        return {
           ok: false,
           date: new Date().toISOString(),
           reason: 'Server Error'         
        };
    }
  } 
});