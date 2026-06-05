import { defineApiManagementHandler } from "@riavzon/auth-h3client";
import { ensureSubscription } from "~~/server/models/ensureSubscription";

export default defineEventHandler(async (event) => {
    const action = event.context.params?.action;
    const allowedActions = action === 'rotate' || action === 'revoke' || action === 'new-token' || action === 'ip-restriction-update';
    const log = getLogger().child({service: 'app', branch: 'handler', type: 'api-tokens-management'});

    if (!action || !allowedActions) {
        setResponseStatus(event, 400);
        return {
            ok: false,
            date: new Date().toISOString(),
            reason: 'Bad request'
        };
    }   

    const handler = defineApiManagementHandler(async (_event) => {
        if (action === 'new-token') { 
            const userId = _event.context.authorizedData?.userId;
            if (!userId) {
                log.warn('User not authorized');
                setResponseStatus(event, 401);
                return {
                    ok: false,
                    date: new Date().toISOString(),
                    reason: 'Unauthorized'
                };
            }
            await ensureSubscription(Number(userId), log);
        }

        const contextKeyMap = {
            'new-token': 'newApiToken',
            'ip-restriction-update': 'ipRestrictionUpdate',
            'revoke': 'revoke',
            'rotate': 'rotate',
        } as const;

        const key = contextKeyMap[action];
        const data = _event.context[key];


            return {
                ok: true,
                date: new Date().toISOString(),
                data
            };
    }, 'demo', 'demo');
    
    return handler(event);
});