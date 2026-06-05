import { Results } from "@riavzon/utils";
import { PublicPlans } from "~~/shared/types/PublicPlans";
import { getPlans } from "../models/getPublicPlans";



export default defineEventHandler(async (event): Promise<Results<PublicPlans>> => {
    const log = getLogger().child({service: 'app', branch: 'handler', type: 'get-public-plans'});

    try {
        const data = await getPlans(log);
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