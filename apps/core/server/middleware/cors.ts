export default defineEventHandler((event) => {
  if (event.method === 'OPTIONS' && event.path.startsWith('/api/v1/')) {
    setResponseHeaders(event, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'x-api-key, Content-Type, Accept',
      'Access-Control-Max-Age': '86400',
    });
    setResponseStatus(event, 204);
    return '';
  }
});
