import type { UsageStats } from '#shared/types/UsageStats';
import { Results } from "@riavzon/utils";
import { eq, and } from 'drizzle-orm';
import { plans, usageRollupMonthly, subscriptions } from '~~/lib/db';
import { dbPool } from '~~/lib/db/connection';
import type {PinoLogger} from '#shared/types/PinoLogger';

export async function getUserUsage(userId: number, log: PinoLogger): Promise<Results<UsageStats>> {
    try {
        const currentPeriod = new Date().toISOString().substring(0, 7); 

        const [userData] = await dbPool.select({
            requestsUsed: usageRollupMonthly.requestsUsed,
            planQuota: plans.monthlyQuota,
            planCode: plans.code
        })
        .from(subscriptions)
        .innerJoin(plans, eq(subscriptions.planId, plans.id))
        .leftJoin(usageRollupMonthly, and(
            eq(usageRollupMonthly.userId, userId),
            eq(usageRollupMonthly.periodString, currentPeriod)
        ))
        .where(eq(subscriptions.userId, userId));

        if (!userData) {
            log.warn('Error getting data');
            return {
                ok: false,
                date: new Date().toISOString(),
                reason: 'User has no active subscription'
            };
        }

        const reqThisMonth = userData.requestsUsed ?? 0;
        
        const data: UsageStats = {
                reqThisMonth,
                totalQuota: userData.planQuota,
                remainingThisMonth: Math.max(0, userData.planQuota - reqThisMonth),
                plan: userData.planCode as 'free' | 'pro' | 'custom'
        };

        return {
            ok: true,
            date: new Date().toISOString(),
            data
        };
    } catch (err) {
        log.error({err}, 'Error getting data');
        const msg =  err instanceof Error ? err.message : 'Error getting user usage';
        return {
            ok: false,
            date: new Date().toISOString(),
            reason: msg
        };
    }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _getCachedUserData = defineCachedFunction(async (userId: number, log: PinoLogger, forceRefresh?: boolean): Promise<Results<UsageStats>> => {
    const data = await getUserUsage(userId, log);
    if (!data.ok) {
        throw new Error(data.reason);
    }
    return data;
}, 
{
    maxAge: 60 * 60,
    name: 'userUsageData',
    getKey: (userId) => String(userId),
    shouldInvalidateCache: (userId, log, forceRefresh) => forceRefresh === true
});

export const getCachedUserData = async (userId: number, log: PinoLogger, forceRefresh?: boolean): Promise<Results<UsageStats>> => {
    try {
        return await _getCachedUserData(userId, log, forceRefresh);
    } catch (err) {
        const msg = err instanceof Error ? err.message : 'Error getting user usage';
        return {
            ok: false,
            date: new Date().toISOString(),
            reason: msg
        };
    }
};