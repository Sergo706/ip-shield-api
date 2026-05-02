import { mysqlTable,varchar, boolean,  int, text, timestamp } from "drizzle-orm/mysql-core";
import { sql } from 'drizzle-orm'; 
import { usersTable } from "./users";
import { relations } from "drizzle-orm";

export const visitors = mysqlTable('visitors', {
  visitorId: int('visitor_id').autoincrement().notNull().unique(),
  canaryId: varchar('canary_id',{ length: 64 }).primaryKey(),
  ipAddress: varchar('ip_address', { length: 64 }),
  userAgent: text('user_agent'),
  country: varchar({ length: 64 }),
  region: varchar({length: 64}),
  regionName: varchar('region_name', { length: 350 }),
  city: varchar({ length: 64 }),
  district: varchar({ length: 260 }),
  lat: varchar({ length: 150 }),
  lon: varchar({ length: 150 }),
  timezone: varchar({ length: 64 }),
  currency: varchar({ length: 64 }),
  isp: varchar({ length: 64 }),
  org: varchar({ length: 64 }),
  as_org: varchar({ length: 64 }),
  deviceType: varchar('device_type', { length: 64 }),
  browser: varchar({ length: 64 }),
  proxy: boolean(),
  proxyAllowed: boolean('proxy_allowed'),
  hosting: boolean(),
  hostingAllowed: boolean('hosting_allowed'),
  isBot: boolean('is_bot').default(false),
  firstSeen: timestamp('first_seen').default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
  lastSeen: timestamp('last_seen').default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
  requestCount: int('request_count').default(1),
  deviceVendor: varchar('deviceVendor',{length: 64}).default('unknown'),
  deviceModel: varchar('deviceModel',{length: 64}).default('unknown'),
  browserType: varchar('browserType',{length: 64}).default('unknown'),
  browserVersion: varchar('browserVersion',{length: 64}).default('unknown'),
  os: varchar({length: 64}).default('unknown'),
  suspiciousActivityScore: int('suspicious_activity_score').default(0)
});

export const visitorsRelations = relations(visitors, ({ many }) => ({
  users: many(usersTable)
}));