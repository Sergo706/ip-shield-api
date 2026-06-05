import { dbPool } from "~~/lib/db/connection";
import { plans, subscriptions, usageRollupMonthly } from "~~/lib/db/schema/plan";
import { sql, eq } from "drizzle-orm";
import type { PinoLogger } from "~~/shared/types/PinoLogger";


export async function consumeQuota(
  userId: number,
  log: PinoLogger
): Promise<boolean> {

  const period = new Date().toISOString().substring(0, 7); 
  
  try {
    const [results] = await dbPool
      .insert(usageRollupMonthly)
      .select(
        dbPool.select({
          id: sql<number | null>`NULL`.as('id'),
          userId: subscriptions.userId,
          planId: subscriptions.planId,
          periodString: sql<string>`${period}`.as('periodString'),
          requestsUsed: sql<number>`1`.as('requestsUsed'),
        })
        .from(subscriptions)
        .where(eq(subscriptions.userId, userId))
      )
      .onDuplicateKeyUpdate({
        set: {
          requestsUsed: sql`IF(
            ${usageRollupMonthly.requestsUsed} < (SELECT ${plans.monthlyQuota} FROM ${plans} WHERE ${plans.id} = ${usageRollupMonthly.planId}),
            ${usageRollupMonthly.requestsUsed} + 1,
            ${usageRollupMonthly.requestsUsed}
          )`,
        },
      });

      return results.insertId > 0 || results.affectedRows === 2;
  } catch (err) {
    log.error({ err, userId, period }, "Failed to consume quota");
    return false;
  }
}
