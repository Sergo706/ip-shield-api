import { Results } from "@riavzon/utils";
import z from "zod";
import { validateZodSchema } from "@riavzon/utils";
import { register } from "#server/models/registerToWaitList";


const planId = z.number('Please select a valid plan').min(1).max(100);

export default defineAuthenticatedEventPostHandlers(async (event): Promise<Results<string>> => {
   const log = getLogger().child({service: 'app', branch: 'handler', type: 'register-waitlist'});

   const user = event.context.authorizedData;
   if (!user?.userId) {
        setResponseStatus(event, 401);
        return {
            ok: false,
            date: new Date().toISOString(),
            reason: 'Unauthorized'
        };
    }

    await limitBytes(1000000)(event);
    const body = event.context.body as number;
    const validation = validateZodSchema(planId, body, log);
    if ('valid' in validation) {
        setResponseStatus(event, 400);
        return {
            ok: false,
            date: new Date().toISOString(),
            reason: JSON.stringify(validation.errors)
        };
    }

    const validatedPlanId = validation.data;

    try {
        const res = await register(Number(user.userId), validatedPlanId, log);
        return res;
    } catch (err) {
        setResponseStatus(event, 500);
        const msg =  err instanceof Error ? err.message : 'Server Error';
        log.error({err}, 'Error registering user to wait list');
        return {
            ok: false,
            date: new Date().toISOString(),
            reason: msg
        };
    }
});