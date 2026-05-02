import { relations } from 'drizzle-orm';
import { boolean, int, mysqlEnum, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

import { usersTable } from './users';

export const apiTokens = mysqlTable('api_tokens', {
    id: int('id').autoincrement().primaryKey(),
    userId: int('user_id').notNull().references(() => usersTable.id, {
        onDelete: 'cascade',
    }),
    apiToken: varchar('api_token', { length: 300 }).notNull().unique(),
    publicIdentifier: varchar('public_identifier', { length: 300 }).notNull().unique(),
    prefix: varchar('prefix', { length: 50 }).notNull(),
    name: varchar('name', { length: 150 }).notNull(),
    createdAt: timestamp('created_at', { fsp: 3 }).notNull().defaultNow(),
    expiresAt: timestamp('expires_at', { fsp: 3 }),
    restrictedToIpAddress: varchar('restricted_to_ip_address', { length: 200 }),
    lastUsed: timestamp('last_used', { fsp: 3 }),
    privilegeType: mysqlEnum('privilege_type', ['demo', 'restricted', 'protected', 'full', 'custom'])
        .notNull()
        .default('restricted'),
    usageCount: int('usage_count').default(0),
    valid: boolean('valid').default(false),
});

export const apiTokensRelations = relations(apiTokens, ({ one }) => ({
    user: one(usersTable, {
        fields: [apiTokens.userId],
        references: [usersTable.id],
    }),
}));