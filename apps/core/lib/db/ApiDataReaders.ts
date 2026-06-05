import maxmind, { Reader, type Response } from 'maxmind';
import { open, type RootDatabase } from 'lmdb';
import type { BgpRecord, CityGeoRecord, GeoRecord, TorRecord, ThreatRecord, CrawlersRecord, ProxyRecord, UserAgentRecord, EmailListRecord } from '@riavzon/shield-base';
import { resolvePath } from '@riavzon/utils/server';
import path from 'node:path';


const cwd = path.resolve(process.cwd(), 'data-sources');
const searchDirs = [
  process.env.DATA_SOURCES_DIR ?? '',
  'data-sources',
  '../data-sources',
  '../../data-sources',  
  cwd
].filter(Boolean);

function resolveDb(fileName: string): string {
  return resolvePath(fileName, searchDirs);
}

export type ThreatRecordModified = ThreatRecord & { network: string }

export interface DataReaders {
    asnDataBase(ip: string): BgpRecord | null;
    cityDataBase(ip: string): CityGeoRecord | null;
    countryDataBase(ip: string): GeoRecord | null;
    goodBotsDataBase(ip: string): CrawlersRecord | null;
    torDataBase(ip: string): TorRecord | null;
    proxyDataBase(ip: string): ProxyRecord | null;
    fireholAnonDataBase(ip: string): ThreatRecordModified | null;
    fireholLvl1DataBase(ip: string): ThreatRecordModified | null;
    fireholLvl2DataBase(ip: string): ThreatRecordModified | null;
    fireholLvl3DataBase(ip: string): ThreatRecordModified | null;
    fireholLvl4DataBase(ip: string): ThreatRecordModified | null;
    getUserAgentLmdb(): RootDatabase<UserAgentRecord, string>;
    getDisposableEmailList(): RootDatabase<EmailListRecord, string>  | undefined;
}

export interface AppReaders {
    asn: Reader<BgpRecord & Response>;
    city: Reader<CityGeoRecord & Response>;
    country: Reader<GeoRecord & Response>;
    goodBots: Reader<CrawlersRecord & Response>;
    tor: Reader<TorRecord & Response>;
    proxy: Reader<ProxyRecord & Response>;
    fireholAnon: Reader<ThreatRecordModified & Response>;
    fireholLvl1: Reader<ThreatRecordModified & Response>;
    fireholLvl2: Reader<ThreatRecordModified & Response>;
    fireholLvl3: Reader<ThreatRecordModified & Response>;
    fireholLvl4: Reader<ThreatRecordModified & Response>;
    userAgentLmdb: RootDatabase<UserAgentRecord, string>;
    disposableEmailListDb: RootDatabase<EmailListRecord, string>
}


export class DataSources implements DataReaders {
   private readonly readers: AppReaders;
   private constructor(readers: AppReaders) {
    this.readers = readers;
  }

  public static async initialize(): Promise<DataSources> {
    const options = { watchForUpdates: process.env.NODE_ENV !== 'test' };
    
    const [asn, city, country, goodBots, tor, proxy, fireholAnon, fireholLvl1, fireholLvl2, fireholLvl3, fireholLvl4] = await Promise.all([
      maxmind.open<BgpRecord & Response>(resolveDb('asn.mmdb'), options),
      maxmind.open<CityGeoRecord & Response>(resolveDb('city.mmdb'), options),
      maxmind.open<GeoRecord & Response>(resolveDb('country.mmdb'), options),
      maxmind.open<CrawlersRecord& Response>(resolveDb('goodBots.mmdb'), options),
      maxmind.open<TorRecord & Response>(resolveDb('tor.mmdb'), options),
      maxmind.open<ProxyRecord & Response>(resolveDb('proxy.mmdb'), options),
      maxmind.open<ThreatRecordModified & Response>(resolveDb('firehol_anonymous.mmdb'), options),
      maxmind.open<ThreatRecordModified & Response>(resolveDb('firehol_l1.mmdb'), options),
      maxmind.open<ThreatRecordModified & Response>(resolveDb('firehol_l2.mmdb'), options),
      maxmind.open<ThreatRecordModified & Response>(resolveDb('firehol_l3.mmdb'), options),
      maxmind.open<ThreatRecordModified & Response>(resolveDb('firehol_l4.mmdb'), options),
    ]);


    const userAgentLmdb = open<UserAgentRecord, string>({
      path: resolveDb('useragent-db/useragent.mdb'),
      name: 'useragent',
      compression: true,
      readOnly: true,
      useVersions: true,
      sharedStructuresKey: Symbol.for('structures'),
      pageSize: 4096,
      cache: {
          validated: true
      },
      noReadAhead: true,
      maxReaders: 2024,
    });

    const disposableEmailListDb = open<EmailListRecord, string>({
        path: resolveDb('email-db/disposable-emails.mdb'),
        name: 'email',
        compression: true,
        readOnly: true,
        useVersions: true,
        sharedStructuresKey: Symbol.for('structures'),
        pageSize: 4096,
        cache: {
            validated: true
        },
        noReadAhead: true,
        maxReaders: 2024,
    });
    return new DataSources({
       asn,
       city,
       country,
       goodBots,
       tor,
       proxy,
       fireholAnon,
       fireholLvl1,
       fireholLvl2,
       fireholLvl3,
       fireholLvl4,
       userAgentLmdb,
       disposableEmailListDb
    });
  }
    
  public asnDataBase(ip: string): BgpRecord | null {
    const result: BgpRecord | null = this.readers.asn.get(ip);
    return result;
  }

  public cityDataBase(ip: string): CityGeoRecord | null {
    const result: CityGeoRecord | null = this.readers.city.get(ip);
    return result;
  }

  public countryDataBase(ip: string): GeoRecord | null {
    const result: GeoRecord | null = this.readers.country.get(ip);
    return result;
  }

  public goodBotsDataBase(ip: string): CrawlersRecord | null {
    const result: CrawlersRecord | null = this.readers.goodBots.get(ip);
    return result;
  }

  public torDataBase(ip: string): TorRecord | null {
    const result: TorRecord | null = this.readers.tor.get(ip);
    return result;
  }

  public proxyDataBase(ip: string): ProxyRecord | null {
    const result: ProxyRecord | null = this.readers.proxy.get(ip);
    return result;
  }

  public fireholAnonDataBase(ip: string): ThreatRecordModified | null {
    const result: ThreatRecordModified | null = this.readers.fireholAnon.get(ip);
    return result;
  }

  public fireholLvl1DataBase(ip: string): ThreatRecordModified | null {
    const result: ThreatRecordModified | null = this.readers.fireholLvl1.get(ip);
    return result;
  }

  public fireholLvl2DataBase(ip: string): ThreatRecordModified | null {
    const result: ThreatRecordModified | null = this.readers.fireholLvl2.get(ip);
    return result;
  }

  public fireholLvl3DataBase(ip: string): ThreatRecordModified | null {
    const result: ThreatRecordModified | null = this.readers.fireholLvl3.get(ip);
    return result;
  }

  public fireholLvl4DataBase(ip: string): ThreatRecordModified | null {
    const result: ThreatRecordModified | null = this.readers.fireholLvl4.get(ip);
    return result;
  }

  public getUserAgentLmdb(): RootDatabase<UserAgentRecord, string> {
    return this.readers.userAgentLmdb;
  }

  public getDisposableEmailList(): RootDatabase<EmailListRecord, string> {
    return this.readers.disposableEmailListDb;
  }
}