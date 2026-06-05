import { PublicApiResponse, BadUserAgent } from "~~/shared/types/ApiShapes";
import { getUserUsage } from "./getUserUsage";
import { UserAgentRecord } from "@riavzon/shield-base";
import type {PinoLogger} from '#shared/types/PinoLogger';

export async function userAgentDataApi(useragentHeader: string, userId: number, log: PinoLogger): Promise<PublicApiResponse<BadUserAgent | {clean: true}>> {
    try {
        const stats = await getUserUsage(userId, log);
        if (!stats.ok) {
            throw new Error(`Cannot get stats ${stats.reason}`);
        }
        
        const { dataSources } = useNitroApp();
        const data = dataSources.getUserAgentLmdb();
        
        let matchedRecord: UserAgentRecord | null = null;

        for (const { value } of data.getRange()) {
            try {
                const regex = new RegExp(value.useragent_rx, 'i');
                
                if (regex.test(useragentHeader)) {
                    matchedRecord = value;
                    break;
                }
            } catch {
                continue;
            }
        }

        if (!matchedRecord) {
             return {
                  ok: true,
                  date: new Date().toISOString(),
                  data: {clean: true},
                  meta: {
                    total_credits: stats.data.totalQuota,
                    credits_remaining: stats.data.remainingThisMonth,
                 },
             };
        }

        const finalData: PublicApiResponse<BadUserAgent> = {
            ok: true,
            date: new Date().toISOString(),
            data: {
                useragent: useragentHeader,
                useragent_rx: matchedRecord.useragent_rx,
                description: matchedRecord.metadata_description,
                tool: matchedRecord.metadata_tool,
                category: matchedRecord.metadata_category,
                link: matchedRecord.metadata_link,
                priority: matchedRecord.metadata_priority,
                severity: matchedRecord.metadata_severity
            },
            meta: {
                total_credits: stats.data.totalQuota,
                credits_remaining: stats.data.remainingThisMonth,
            }
        }; 
        return finalData;
    } catch (err) {
        log.error({err}, 'Error in useragent api');
        throw err;
    }
}