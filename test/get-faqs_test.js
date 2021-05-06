const test = require('tape')
const fetchMock = require('fetch-mock')
/*
globalThis.fetch = fetchMock
  .sandbox()
  .post('https://dev.hyper63.com/data/twilson63/_query', { status: 200, body: {ok: true, docs: []}})
 */

const app = require('../server')
const testServer = require('@twilson63/test-server')
const fetch = require('node-fetch')

test('GET /api/faqs', async t => {
  t.plan(1)
  const server = testServer(app)
  const result = await fetch(server.url + '/api/faqs')
    .then(r => r.json())

  console.log(result)
  t.ok(result.ok)

  server.close()

})
