import { Network, PublicApiResponse } from "~~/shared/types/ApiShapes";
import { getUserUsage } from "./getUserUsage";
import { threatLevel } from "../utils/threatLevel";
import type {PinoLogger} from '#shared/types/PinoLogger';

export async function networkApiData(ipv4: string, userId: number, log: PinoLogger): Promise<PublicApiResponse<Network>> {

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

   
        const finalData: PublicApiResponse<Network> = {
            ok: true,
            date: new Date().toISOString(),
            data: {
                ip: ipv4,
                proxy: proxy ? true : false,
                vpn: vpn ? true : false,
                threat_level: threatLevel(ipv4),
                is_known_bot: bot ? true : false,
                bot_details: bot?.provider || bot?.creationTime ? {
                    bot_owner: bot.provider,
                    creationTime: bot.creationTime
                } : null,

                is_tor_node: tor ? true : false,
                tor_details: tor ? {
                    flags: typeof tor.flags === 'string' ? tor.flags.split(',') : null,
                    last_seen: tor.last_seen || null,
                    exit_probability: tor.exit_probability || null,
                    guard_probability: tor.guard_probability || null,
                    exit_addresses: tor.exit_addresses || null,
                    exit_policy_summary: tor.exit_policy_summary || null,
                    country: tor.country || null,
                    as_name: tor.as_name || null,
                    as_id: tor.as || null
                } : null,

                asn: bgp ? {
                    asn_id: bgp.asn_id || null,
                    asn_name: bgp.asn_name || null,
                    classification: bgp.classification || null,
                    route_visibility_count: Number(bgp.hits) || null
                } : null
            },
            meta: {
                total_credits: stats.data.totalQuota,
                credits_remaining: stats.data.remainingThisMonth
            }
        }; 
        return finalData;
    } catch (err) {
        log.error({err}, 'Error in network api');
        throw err;
    }
    
}