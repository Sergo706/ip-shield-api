import { Results } from "@riavzon/utils";
import { eq } from "drizzle-orm";
import { earlyAccessBenefits } from "~~/lib/db";
import { dbPool } from "~~/lib/db/connection";
import { PinoLogger } from "~~/shared/types/PinoLogger";
import type { SelectEarlyAccess } from '#shared/types/EarlyAccessRow';

export async function getWaitListData(userId: number, log: PinoLogger): Promise<Results<SelectEarlyAccess>> {
    try {
        const [data] = await dbPool.select().from(earlyAccessBenefits).where(eq(earlyAccessBenefits.userId, userId));
        
        if (!data) {
            return {
                ok: false,
                date: new Date().toISOString(),
                reason: 'Not registered'
            };
        }

        return {
            ok: true,
            date: new Date().toISOString(),
            data
        };
        
    } catch (err) {
        log.error({err}, 'Error getting data');
        return {
            ok: false,
            date: new Date().toISOString(),
            reason: 'Error getting data'
        };
    }
}