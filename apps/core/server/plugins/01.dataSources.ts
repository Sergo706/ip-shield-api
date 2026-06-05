import { DataSources } from '~~/lib/db/ApiDataReaders';

// eslint-disable-next-line @typescript-eslint/no-misused-promises
export default defineNitroPlugin(async (nitroApp) => {
  const dataSources = await DataSources.initialize();
  nitroApp.dataSources = dataSources;
});