import { getUserUsage } from "./getUserUsage";
import { PublicApiResponse, SingleIp } from "~~/shared/types/ApiShapes";
import { getGeo } from "../utils/geo";
import { threatLevel } from "../utils/threatLevel";
import type {PinoLogger} from '#shared/types/PinoLogger';

export async function singleLookUp(ipv4: string, userId: number, log: PinoLogger): Promise<PublicApiResponse<SingleIp>> {
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
        const finalData: PublicApiResponse<SingleIp> = {
            ok: true,
            date: new Date().toISOString(),
            data: {
                ip: ipv4,
                location: {
                    country: geo.country,
                    country_code: geo.country_code,
                    region: geo.region,
                    city: geo.city,
                    language_iso639: geo.language_iso639,
                    timezone: geo.timezone,
                    latitude: geo.latitude,
                    longitude: geo.longitude
                },
                proxy: proxy ? true : false,
                vpn: vpn ? true : false,
                threat_level: threatLevel(ipv4),
                is_known_bot: bot ? true : false,
                tor: tor ? true : false,
                network: bgp ? {
                    asn_id: bgp.asn_id || null,
                    asn_name: bgp.asn_name || null,
                    classification: bgp.classification || null,
                } : null
            },
            meta: {
                total_credits: stats.data.totalQuota,
                credits_remaining: stats.data.remainingThisMonth
            }
        }; 
        return finalData;
    } catch (err) {
        log.error({err}, 'Error in lookup api');
        throw err;
    }
}