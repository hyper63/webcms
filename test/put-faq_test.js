const test = require('tape')
const fetchMock = require('fetch-mock')
const testServer = require('@twilson63/test-server')

globalThis.fetch = fetchMock.sandbox()
  .put('https://dev.hyper63.com/data/twilson63/faq-1', { ok: true })

const app = require('../server')
const fetch = require('node-fetch')

test('PUT /api/faqs/:id', async t => {
  t.plan(1)
  const server = testServer(app)
  const result = await (await fetch(server.url + '/api/faqs/faq-1', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: 'faq-1',
      question: 'What is hyper?',
      answer: '....',
      tags: ['hyper']
    })
  })).json()
  console.log(result)
  t.ok(result.ok)
  server.close()

})
