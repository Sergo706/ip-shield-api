import { getUserUsage } from "./getUserUsage";
import { PublicApiResponse, Summary } from "~~/shared/types/ApiShapes";
import { getGeo } from "../utils/geo";
import { threatLevel } from "../utils/threatLevel";
import type {PinoLogger} from '#shared/types/PinoLogger';

export async function summaryApi(ipv4: string, userId: number, log: PinoLogger): Promise<PublicApiResponse<Summary>> {
    try {
        const stats = await getUserUsage(userId, log);
        if (!stats.ok) {
            throw new Error(`Cannot get stats ${stats.reason}`);
        }

        const { dataSources } = useNitroApp();
        const proxy = dataSources.proxyDataBase(ipv4);
        const vpn = dataSources.fireholAnonDataBase(ipv4);
        const bot = dataSources.goodBotsDataBase(ipv4);
        const tor = dataSources.torDataBase(ipv4);
        const bgp = dataSources.asnDataBase(ipv4);

        const geo = getGeo(ipv4);
        const finalData: PublicApiResponse<Summary> = {
            ok: true,
            date: new Date().toISOString(),
            data: {
                ip: ipv4,
                country_code: geo.country_code,
                proxy: proxy ? true : false,
                vpn: vpn ? true : false,
                threat_level: threatLevel(ipv4),
                is_known_bot: bot ? true : false,
                is_tor_node: tor ? true : false,
                classification: bgp?.classification ?? null,
                asn_id: bgp?.asn_id ?? null,
            },
            meta: {
                total_credits: stats.data.totalQuota,
                credits_remaining: stats.data.remainingThisMonth
            }
        }; 
        return finalData;
    } catch (err) {
        log.error({err}, 'Error in summary api');
        throw err;
    }
}