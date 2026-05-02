import { mysqlTable,varchar,datetime, boolean, timestamp, int, } from "drizzle-orm/mysql-core";
import { apiTokens } from "./api";
import { subscriptions } from "../plan";
import { visitors } from "./visitors";
import { relations } from "drizzle-orm";

export const usersTable = mysqlTable('users', {
  id: int().autoincrement().primaryKey(),
  lastMfaAt: datetime('last_mfa_at'),
  activeUser: boolean(`active_user`).default(true),
  name: varchar({length: 100}).notNull(),
  lastName: varchar('last_name', {length: 100}).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  avatar: varchar({length: 200}),
  passwordHash: varchar('password_hash',{length:255}),
  provider: varchar({length:50}),
  providerId: varchar('provider_id', {length:100}),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
  rememberUser: boolean('remember_user').default(false),
  termsAndPrivacyAgreement: boolean('terms_and_privacy_agreement').default(false),
  acceptsMarketing: boolean('accepts_marketing').default(false),
  country: varchar({length: 100}),
  city: varchar({length: 100}),
  zip: varchar({length: 100}),
  district: varchar({length: 200}),
  visitorId: int('visitor_id').notNull().references(() => visitors.visitorId, {
    onUpdate: 'cascade',
    onDelete: 'restrict'
  })
});

export const usersRelations = relations(usersTable, ({ one, many }) => ({
  apiTokens: many(apiTokens),
  subscriptions: many(subscriptions),
  visitor: one(visitors, {
    fields: [usersTable.visitorId],
    references: [visitors.visitorId],
  }),

}));