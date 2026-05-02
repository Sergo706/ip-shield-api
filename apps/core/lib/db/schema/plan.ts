import { relations } from "drizzle-orm";
import { varchar, int, mysqlTable, mysqlEnum, boolean, timestamp } from "drizzle-orm/mysql-core";
import { usersTable } from "./_exists/users";

export const plans = mysqlTable('plans', {
  id: int('id').autoincrement().primaryKey(),
  code: varchar('code', { length: 32 }).notNull().unique(),
  name: varchar('name', { length: 100 }).notNull(),
  billingMode: mysqlEnum('billing_mode', ['free', 'processor', 'manual']).notNull(),
  requestsPerMinute: int('requests_per_minute').notNull(),
  requestsPerHour: int('requests_per_hour').notNull(),
  monthlyQuota: int('monthly_quota'),
  apiKeyLimit: int('api_key_limit').notNull().default(1),
  isPublic: boolean('is_public').notNull().default(true),
  isActive: boolean('is_active').notNull().default(true),
});

export const planPrices = mysqlTable('plan_prices', {
  id: int('id').autoincrement().primaryKey(),
  planId: int('plan_id').notNull().references(() => plans.id, { onDelete: 'cascade' }),
  currency: varchar('currency', { length: 3 }).notNull().default('USD'),
  interval: mysqlEnum('interval', ['month', 'year', 'one_time']).notNull(),
  amountCents: int('amount_cents').notNull(),
  provider: mysqlEnum('provider', ['internal', 'processor', 'manual']).notNull(),
  providerPriceId: varchar('provider_price_id', { length: 128 }),
  active: boolean('active').notNull().default(true),
  effectiveFrom: timestamp('effective_from').notNull().defaultNow(),
  effectiveTo: timestamp('effective_to'),
});

export const subscriptions = mysqlTable('subscriptions', {
  id: int('id').autoincrement().primaryKey(),
  userId: int('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
  planId: int('plan_id').notNull().references(() => plans.id),
  planPriceId: int('plan_price_id').references(() => planPrices.id),
  status: mysqlEnum('status', ['trialing', 'active', 'past_due', 'canceled', 'expired']).notNull(),
  provider: mysqlEnum('provider', ['none', 'processor', 'monero', 'manual']).notNull(),
  currentPeriodStart: timestamp('current_period_start'),
  currentPeriodEnd: timestamp('current_period_end'),
  cancelAtPeriodEnd: boolean('cancel_at_period_end').notNull().default(false),
});

export const plansRelations = relations(plans, ({ many }) => ({
  prices: many(planPrices),
  subscriptions: many(subscriptions),
}));

export const planPricesRelations = relations(planPrices, ({ one, many }) => ({
  plan: one(plans, {
    fields: [planPrices.planId],
    references: [plans.id],
  }),
  subscriptions: many(subscriptions),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(usersTable, {
    fields: [subscriptions.userId],
    references: [usersTable.id],
  }),
  plan: one(plans, {
    fields: [subscriptions.planId],
    references: [plans.id],
  }),
  planPrice: one(planPrices, {
    fields: [subscriptions.planPriceId],
    references: [planPrices.id],
  }),
}));