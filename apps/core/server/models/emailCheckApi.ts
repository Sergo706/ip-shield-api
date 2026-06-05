import { getUserUsage } from "./getUserUsage";
import { PublicApiResponse, EmailCheck } from "~~/shared/types/ApiShapes";
import type {PinoLogger} from '#shared/types/PinoLogger';

export async function emailCheckApi(email: string, userId: number, log: PinoLogger): Promise<PublicApiResponse<EmailCheck>> {

    try {
        const stats = await getUserUsage(userId, log);
        if (!stats.ok) {
            throw new Error(`Cannot get stats ${stats.reason}`);
        }
        const { dataSources } = useNitroApp();
        const emailDb = dataSources.getDisposableEmailList();

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, domain] = email.split('@');
        const normalizedDomain = domain?.toLowerCase();

        if (!normalizedDomain) {
            throw new Error(`Invalid email`);
        }

        const data = emailDb.get(normalizedDomain);
        const isDisposable = Boolean(data);

        const finalData: PublicApiResponse<EmailCheck> = {
            ok: true,
            date: new Date().toISOString(),
            data: {
                email,
                domain: normalizedDomain,
                is_disposable: isDisposable
            },
            meta: {
                total_credits: stats.data.totalQuota,
                credits_remaining: stats.data.remainingThisMonth
            }
        }; 
        return finalData;
    } catch (err) {
        log.error({err}, 'Error in email check api');
        throw err;
    }
}