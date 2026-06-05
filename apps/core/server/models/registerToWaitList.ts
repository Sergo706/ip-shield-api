import { Results } from "@riavzon/utils";
import { earlyAccessBenefits, plans } from "~~/lib/db";
import { dbPool } from "~~/lib/db/connection";
import { sql, eq } from "drizzle-orm";
import { PinoLogger } from "~~/shared/types/PinoLogger";

export async function register(userId: number, planId: number, log: PinoLogger): Promise<Results<string>> {
    try {

        await dbPool.insert(earlyAccessBenefits).select(
        dbPool.select({
            id: sql<number | null>`NULL`.as('id'),
            userId: sql<number>`${userId}`.as('userId'),
            planId: plans.id,
            requestsPerMinute: plans.requestsPerMinute,
            monthlyQuota: plans.monthlyQuota
        })
        .from(plans)
        .where(eq(plans.id, planId))
        );

        return {
            ok: true,
            date: new Date().toISOString(),
            data: "Your successfully registered as an early adopter!"
        };
    } catch (err) {
        const errStr = typeof err === 'string' ? err : JSON.stringify(err, Object.getOwnPropertyNames(err));
        
        const isDuplicate = errStr.includes('Duplicate entry') || errStr.includes('ER_DUP_ENTRY');

        if (isDuplicate) {
            return {
                ok: true, 
                date: new Date().toISOString(),
                data: "You are already registered for early access!"
            };
        }

        log.error({err}, 'Error in register wait list');
        return {
            ok: false,
            date: new Date().toISOString(),
            reason: err instanceof Error ? err.message : 'Error registering for waitlist'
        };
    }
}