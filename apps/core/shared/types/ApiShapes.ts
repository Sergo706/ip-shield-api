export interface Meta {
    credits_remaining: number,
    total_credits: number;
}
interface ApiSuccess<T> {
   ok: true,
   date: string;
   data: T,
   meta: Meta, 
}
interface ApiError {
   ok: false,
   date: string;
   error: {
    code: string,
    message: string,
    details: string
  },
   meta: Meta, 
}
export type PublicApiResponse<T> = ApiSuccess<T> | ApiError;

export interface GeoData {
    ip: string | null;
    country_code: string | null; 
    region: string | null;
    continent: string | null;
    country: string | null;
    city: string | null;
    capital: string | null;
    subregion: string | null; 
    zip_code: string | null;
    latitude: string | null;
    longitude: string | null;
    state: string | null;
    nationality: string | null;
    phone: string | null;
    currency: string | null;
    currency_name: string | null;
    currency_symbol: string | null;
    language_iso639: string | null;
    tld: string | null;
    utc_offset: string | null;
    timezone: string | null;
    timeZoneName: string | null;
}

export interface Network {
    ip: string;
    proxy: boolean;
    vpn: boolean;
    threat_level: number;
    is_known_bot: boolean;
    bot_details: {
        bot_owner: string; 
        creationTime: string;
    } | null;

    is_tor_node: boolean;
    tor_details: {
        flags: string[] | null;
        last_seen: string | null;
        exit_probability: number | null;
        guard_probability: number | null;
        exit_addresses: string | null;
        exit_policy_summary: string | null;
        country: string | null;
        as_name: string | null;
        as_id: string | null;
    } | null;

    asn: {
        asn_id: string | null;
        asn_name: string | null;
        classification: string | null;
        route_visibility_count: number | null;
    } | null;
}
export interface BadUserAgent {
    useragent: string | null;
    useragent_rx: string | null;
    description: string | null;
    tool: string | null;
    category: string | null;
    link: string | null;
    priority: string | null;
    severity: string | null;
}

export interface EmailCheck {
  email: string;
  domain: string;
  is_disposable: boolean;
}

export interface SingleIp {
    ip: string;
    location: {
        country: string | null;
        country_code: string | null;
        region: string | null;
        city: string | null;
        language_iso639: string | null;
        timezone: string | null;
        latitude: string | null;
        longitude: string | null;
    };
    proxy: boolean;
    vpn: boolean;
    threat_level: number;
    is_known_bot: boolean;
    tor: boolean;
    network: {
        asn_id: string | null;
        asn_name: string | null;
        classification: string | null;
    } | null;
}

export interface Summary {
    ip: string;
    country_code: string | null;
    proxy: boolean;
    vpn: boolean;
    threat_level: number;
    is_known_bot: boolean;
    is_tor_node: boolean;
    classification: string | null;
    asn_id: string | null;
}