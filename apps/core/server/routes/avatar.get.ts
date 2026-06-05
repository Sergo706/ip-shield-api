import { Results } from "@riavzon/utils";
import { UserProfile } from "~~/shared/types/UserProfile";
import { getUserProfile } from "../models/getUserProfile";

export default defineAuthenticatedEventHandler(async (event): Promise<Results<UserProfile>> => {
    const user = event.context.authorizedData;
    const log = getLogger().child({service: 'app', branch: 'handler', type: 'get-avatar'});

    if (!user?.userId) {
        setResponseStatus(event, 401);
        return {
            ok: false,
            date: new Date().toISOString(),
            reason: 'Unauthorized'
        };
    }

    try {
        const data = await getUserProfile(Number(user.userId), log);
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