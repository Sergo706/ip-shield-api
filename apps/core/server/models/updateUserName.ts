import { Results } from "@riavzon/utils";
import { eq } from "drizzle-orm";
import { dbPool } from "~~/lib/db/connection";
import { usersTable } from "~~/lib/db/schema/_exists/users";
import { PinoLogger } from "~~/shared/types/PinoLogger";

 
export async function updateUserNames(data: {name: string | undefined, lastName: string | undefined}, userId: number, log: PinoLogger): Promise<Results<string>> {
        try {
            await dbPool.update(usersTable).set({
                name: data.name,
                lastName: data.lastName
            }).where(eq(usersTable.id, userId));

            return { ok: true, date: new Date().toISOString(), data: 'Updated successfully!' };  
        } catch (err) {
            log.error({err}, 'Error updating names');
            return {
                    ok: false,
                    date: new Date().toISOString(),
                    reason: 'Server Error',
                };
            }
    }