import type { GeoData } from "~~/shared/types/ApiShapes";

export function getGeo(ipv4: string): GeoData {
    const { dataSources } = useNitroApp();
    const city = dataSources.cityDataBase(ipv4);
    const country = dataSources.countryDataBase(ipv4);
    return {
         ip: ipv4,
         country_code: country?.country_code ?? city?.country_code ?? null, 
         country: country?.name ?? city?.name ?? null,
         region: city?.region ?? country?.region ?? null,
         continent: city?.continent ?? null,
         city: city?.city ?? country?.capital ?? null,
         capital: city?.capital ?? country?.capital ?? null,
         subregion: city?.subregion ?? country?.subregion ?? null, 
         zip_code: city?.zip_code ?? null,
         latitude: city?.latitude ?? null,
         longitude: city?.longitude ?? null,
         state: city?.state ?? null,
         nationality: city?.nationality ?? country?.nationality ?? null,
         phone: city?.phone ?? country?.phone ?? null,
         currency: country?.currency ?? city?.currency ?? null,
         currency_name: country?.currency_name ?? city?.currency_name ?? null,
         currency_symbol: country?.currency_symbol ?? null,
         language_iso639: country?.iso639 ?? city?.iso639 ?? null,
         tld: country?.tld ?? city?.tld ?? null,
         utc_offset: city?.utc_offset ?? country?.utc_offset ?? null,
         timezone: city?.timezone ?? country?.timezone ?? null,
         timeZoneName: city?.timeZoneName ?? country?.timeZoneName ?? null  
     };
}