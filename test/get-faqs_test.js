const test = require('tape')
const app = require('../server')
const testServer = require('@twilson63/test-server')
const fetch = require('node-fetch')

test('GET /api/faqs', async t => {
  t.plan(1)
  const server = testServer(app)
  const result = await fetch(server.url + '/api/faqs', {
    headers: {
      accept: 'application/json'
    } 
  })
    .then(r => r.json())

  t.ok(result.ok)
  console.log(JSON.stringify(result))

  server.close()

})
