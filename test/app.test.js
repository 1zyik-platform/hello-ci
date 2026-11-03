const assert = require('node:assert/strict');
const { after, before, test } = require('node:test');
const app = require('../src/app');

let server;
let baseUrl;

before(async () => {
  await new Promise(resolve => {
    server = app.listen(0, resolve);
  });
  baseUrl = `http://localhost:${server.address().port}`;
});

after(() => {
  server.close();
});

test('/health reports the service is up', async () => {
  const res = await fetch(`${baseUrl}/health`);

  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { status: 'ok' });
});

test('/metrics serves Prometheus metrics', async () => {
  const res = await fetch(`${baseUrl}/metrics`);

  assert.equal(res.status, 200);
  assert.match(res.headers.get('content-type'), /^text\/plain/);
  assert.match(await res.text(), /^process_cpu_user_seconds_total /m);
});

test('unknown paths return 404', async () => {
  const res = await fetch(`${baseUrl}/nope`);

  assert.equal(res.status, 404);
});
