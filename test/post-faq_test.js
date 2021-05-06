const test = require('tape')
const testServer = require('@twilson63/test-server')
const fetch = require('node-fetch')
const app = require('../server')

test('Create FAQ no tags', async t => {
  t.plan(1)

  const server = testServer(app)

  const result = await fetch(server.url + '/api/faqs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      question: 'What is an Either',
      answer: 'RTFM',
      tags: []
    })
  }).then(r => r.json())

  console.log(result)

  t.ok(result.ok)

  server.close()

})

test('Create FAQ', async t => {
  t.plan(1)

  const server = testServer(app)

  const result = await fetch(server.url + '/api/faqs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      question: 'What is an Either',
      answer: 'RTFM',
      tags: ['common']
    })
  }).then(r => r.json())

  console.log(result)

  t.ok(result.ok)

  server.close()

})
