import { Results } from "@riavzon/utils";
import { earlyAccessBenefits, plans } from "~~/lib/db";
import { dbPool } from "~~/lib/db/connection";
import { eq } from "drizzle-orm";
import { PinoLogger } from "~~/shared/types/PinoLogger";

export async function register(userId: number, planId: number, log: PinoLogger): Promise<Results<string>> {
    try {

        const [existing] = await dbPool.select().from(earlyAccessBenefits).where(eq(earlyAccessBenefits.userId, userId));

        if (existing) {
            if (existing.planId === planId) {
                await dbPool.delete(earlyAccessBenefits).where(eq(earlyAccessBenefits.userId, userId));
                return {
                    ok: true,
                    date: new Date().toISOString(),
                    data: "Successfully unsubscribed from early access."
                };
            } else {
                const [newPlan] = await dbPool.select().from(plans).where(eq(plans.id, planId));
                if (!newPlan) {
                    return { 
                        ok: false,
                        date: new Date().toISOString(),
                        reason: "Plan not found" 
                    };
                }
                await dbPool.update(earlyAccessBenefits)
                    .set({
                        planId: newPlan.id,
                        requestsPerMinute: newPlan.requestsPerMinute,
                        monthlyQuota: newPlan.monthlyQuota
                    })
                    .where(eq(earlyAccessBenefits.userId, userId));

                return {
                    ok: true,
                    date: new Date().toISOString(),
                    data: "Successfully changed your early access plan!"
                };
            }
        } else {
            const [newPlan] = await dbPool.select().from(plans).where(eq(plans.id, planId));
            if (!newPlan) {
                return { ok: false, date: new Date().toISOString(), reason: "Plan not found" };
            }
            await dbPool.insert(earlyAccessBenefits).values({
                userId,
                planId: newPlan.id,
                requestsPerMinute: newPlan.requestsPerMinute,
                monthlyQuota: newPlan.monthlyQuota
            });
            return {
                ok: true,
                date: new Date().toISOString(),
                data: "Successfully registered as an early adopter!"
            };
        }

    } catch (err) {
        log.error({err}, 'Error in register wait list');
        return {
            ok: false,
            date: new Date().toISOString(),
            reason: err instanceof Error ? err.message : 'Error registering for waitlist'
        };
    }
}