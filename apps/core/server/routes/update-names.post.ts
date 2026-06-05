import { type Results, validateZodSchema, isObjectHasValues } from "@riavzon/utils";
import { updateUserNames } from "../models/updateUserName";
import { personalSchema } from '~~/shared/types/auth';
import z from "zod";

type UpdateNamesTypes = z.infer<typeof personalSchema>;
export default defineAuthenticatedEventPostHandlers(async (event): Promise<Results<string>> => {
     const log = getLogger().child({service: 'app', branch: 'handler', type: 'update-name'});
     const userId = event.context.authorizedData?.userId;
     if (!userId) {
        setResponseStatus(event, 401);
        return {
            ok: false,
            date: new Date().toISOString(),
            reason: 'Unauthorized'
        };
     }

     await limitBytes(3000000)(event);
     const body = event.context.body as UpdateNamesTypes;
     const validation = validateZodSchema(personalSchema, body, log);
         if ('valid' in validation) {
             setResponseStatus(event, 400);
             return {
                 ok: false,
                 date: new Date().toISOString(),
                 reason: JSON.stringify(validation.errors)
             };
         }
         const names = validation.data;
         try {
            if (isObjectHasValues(names)) {
                const res = await updateUserNames({name: names.firstname, lastName: names.lastname}, Number(userId), log);
                return res;
            } else {
                return {
                    ok: true,
                    date: new Date().toISOString(),
                    data: 'Nothing to update...'
                };
            }
         } catch {
            setResponseStatus(event, 500);
            return {
                ok: false,
                date: new Date().toISOString(),
                reason: 'Server error'
            };
         }
});  