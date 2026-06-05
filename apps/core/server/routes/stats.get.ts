import { Results } from "@riavzon/utils";
import type { UsageStats } from '#shared/types/UsageStats';
import { getUserUsage } from "../models/getUserUsage";

export default defineAuthenticatedEventHandler(async (event): Promise<Results<UsageStats>> => {
    const log = getLogger().child({service: 'app', branch: 'handler', type: 'get-stats'});
    const user = event.context.authorizedData;
    if (!user?.userId) {
        setResponseStatus(event, 401);
        return {
            ok: false,
            date: new Date().toISOString(),
            reason: 'Unauthorized'
        };
    }

    try {
        const data = await getUserUsage(Number(user.userId), log);
        return data;
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