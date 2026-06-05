import { getUserUsage } from "./getUserUsage";
import { PublicApiResponse, GeoData } from "~~/shared/types/ApiShapes";
import { getGeo } from "../utils/geo";
import type {PinoLogger} from '#shared/types/PinoLogger';

export async function geoDataApi(ipv4: string, userId: number, log: PinoLogger): Promise<PublicApiResponse<GeoData>> {
    try {
        const stats = await getUserUsage(userId, log);
        if (!stats.ok) {
            throw new Error(`Cannot get stats ${stats.reason}`);
        }

        const geo = getGeo(ipv4);
        const finalData: PublicApiResponse<GeoData> = {
            ok: true,
            date: new Date().toISOString(),
            data: {
                ...geo
            },
            meta: {
                total_credits: stats.data.totalQuota,
                credits_remaining: stats.data.remainingThisMonth
            }
        }; 
        return finalData;
    } catch (err) {
        log.error({err}, "Error in geo api");
        throw err;
    }
}