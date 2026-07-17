import http from 'node:http';

const port = Number.parseInt(process.env.HEALTHCHECK_PORT ?? process.env.PORT ?? '3000', 10);

const options = {
  host: '127.0.0.1',
  port: Number.isNaN(port) ? 3000 : port,
  path: '/health',
  timeout: 2000,
};

const request = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  if (res.statusCode !== undefined && res.statusCode >= 200 && res.statusCode < 300) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

request.on('error', (err) => {
  console.error('ERROR:', err.message);
  process.exit(1);
});

request.end();
