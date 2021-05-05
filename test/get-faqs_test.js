const test = require('tape')
const app = require('../server')
const testServer = require('@twilson63/test-server')
const fetch = require('node-fetch')


test('GET /api/faqs', async t => {
  t.plan(1)
  const server = testServer(app)
  const result = await fetch(server.url + '/api/faqs')
    .then(r => r.json())
  t.ok(result.ok)

  server.close()

})
