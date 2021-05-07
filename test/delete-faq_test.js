const test = require('tape')
const fetchMock = require('fetch-mock')
const fetch = require('node-fetch')
const testServer = require('@twilson63/test-server')

globalThis.fetch = fetchMock.sandbox()
  .delete('https://dev.hyper63.com/data/twilson63/faq-1', {ok: true, mock: true })

const app = require('../server')

test('DELETE /api/faqs/:id', async t => {
  t.plan(1)
  const server = testServer(app)
  const result = await ( await fetch(server.url + '/api/faqs/faq-1', {
    method: 'DELETE'
  })).json().catch(err => ({ok: false, message: err.message}))
  console.log(result)
  t.ok(result.ok)
  server.close()

})
