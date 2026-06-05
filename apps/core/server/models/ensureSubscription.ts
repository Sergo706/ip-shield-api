import { dbPool } from "~~/lib/db/connection";
import type { PinoLogger } from "~~/shared/types/PinoLogger";
import { eq, sql } from "drizzle-orm";
import { planPrices, plans, subscriptions } from "~~/lib/db/schema/plan";

const getFreePlan = defineCachedFunction(async () => {
  const [plan] = await dbPool
    .select({ id: plans.id, priceId: planPrices.id })
    .from(plans)
    .innerJoin(planPrices, eq(plans.id, planPrices.planId))
    .where(eq(plans.code, 'free'));
  return plan ?? null;
}, {
  maxAge: 60 * 60 * 24,
  name: 'getFreePlan',
  getKey: () => 'default',
});

const hasSubscription = defineCachedFunction(async (userId: number) => {
  const [existing] = await dbPool
    .select({ id: subscriptions.id })
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId));
  return !!existing;
}, {
  maxAge: 60 * 60 * 24,
  name: 'hasSubscription',
  getKey: (userId: number) => String(userId),
});

export async function ensureSubscription(userId: number, log: PinoLogger) {
  if (await hasSubscription(userId)) return;

  const freePlan = await getFreePlan();
  if (!freePlan) {
    log.error('Free plan not found in DB');
    throw new Error('Free plan not configured');
  }

  await dbPool.insert(subscriptions).values({
    userId,
    planId: freePlan.id,
    planPriceId: freePlan.priceId,
    status: 'active',
    provider: 'none',
    currentPeriodStart: new Date(),
    currentPeriodEnd: null,
    cancelAtPeriodEnd: false,
  }).onDuplicateKeyUpdate({ set: { id: sql`id` } });

  await useStorage('cache').removeItem(`nitro:functions:hasSubscription:${userId.toString()}.json`);
}

