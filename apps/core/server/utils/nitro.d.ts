import type { DataSources } from '~~/lib/db/ApiDataReaders';

declare module 'nitropack' {
  interface NitroApp {
    dataSources: DataSources
  }
}

export {};