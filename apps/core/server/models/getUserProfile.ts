import type { UserProfile } from '#shared/types/UserProfile';
import { Results } from '@riavzon/utils';
import { eq } from 'drizzle-orm';
import { dbPool } from '~~/lib/db/connection';
import { usersTable } from '~~/lib/db/schema/_exists/users';
import { PinoLogger } from '~~/shared/types/PinoLogger';


export async function getUserProfile(userId: number, log: PinoLogger): Promise<Results<UserProfile>> {
    try {
        const [data] = await dbPool.select({name: usersTable.name, lastName: usersTable.lastName, avatar: usersTable.avatar}).from(usersTable).where(eq(usersTable.id, userId));
        if (!data) {
            return {
                ok: false,
                date: new Date().toISOString(),
                reason: 'No data'
            };
        }

        return {
            ok: true,
            date: new Date().toISOString(),
            data
        };
    } catch (err) {
        log.error({err}, 'Error in user profile api');
        const msg =  err instanceof Error ? err.message : 'Error getting data';
        return {
            ok: false,
            date: new Date().toISOString(),
            reason: msg
        };
    }
}