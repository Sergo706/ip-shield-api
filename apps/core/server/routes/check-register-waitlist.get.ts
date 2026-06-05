import { Results } from "@riavzon/utils";
import { getWaitListData } from "../models/checkWaitlistRegistery";
import type { SelectEarlyAccess } from '#shared/types/EarlyAccessRow';

export default defineAuthenticatedEventHandler(async (event): Promise<Results<SelectEarlyAccess>> => {
    const user = event.context.authorizedData;
    const log = getLogger().child({service: 'app', branch: 'handler', type: 'check-register-waitlist'});
    if (!user) {
        setResponseStatus(event, 401);
        return {
            ok: false,
            date: new Date().toISOString(),
            reason: 'Unauthorized'
        };
    }

    try {
        const res = await getWaitListData(Number(user.userId), log);
        return res;
    } catch (err) {
        setResponseStatus(event, 500);
        const msg =  err instanceof Error ? err.message : 'Server Error';
        log.error({err}, 'Error getting data');
        return {
            ok: false,
            date: new Date().toISOString(),
            reason: msg
        };
    }

});