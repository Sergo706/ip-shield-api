import type { Results } from "@riavzon/utils";
import type { PublicPlans } from '#shared/types/PublicPlans';
import { plans, planPrices } from "~~/lib/db";
import { dbPool }from '~~/lib/db/connection';
import { eq, getTableColumns } from "drizzle-orm";
import { PinoLogger } from "~~/shared/types/PinoLogger";

export async function getPlans(log: PinoLogger): Promise<Results<PublicPlans>> {
    try {
        const data = await dbPool.select({
            ...getTableColumns(plans),
            price: planPrices.amountCents
        }).from(plans).innerJoin(planPrices, eq(plans.id, planPrices.planId));

        if (data.length === 0) {
            return {
                ok: false,
                date: new Date().toISOString(),
                reason: 'No plans yet'
            };
        }

        return {
            ok: true,
            date: new Date().toISOString(),
            data: {plans: data},
        };
    } catch (err) {
        log.error({err}, 'Error in get plans');
        const msg =  err instanceof Error ? err.message : 'Error getting data';
        return {
            ok: false,
            date: new Date().toISOString(),
            reason: msg
        };
    }
}