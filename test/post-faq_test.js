const test = require('tape')
const testServer = require('@twilson63/test-server')
const app = require('../server')
const jwt = require('jsonwebtoken')
const token = jwt.sign({sub: 'test'}, process.env.API_SECRET, {audience: 'https://webcms.hyper.io'})
const fetch = require('node-fetch')

test('Create FAQ no tags', async t => {
  t.plan(2)

  const server = testServer(app)

  const result = await fetch(server.url + '/api/faqs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      question: 'What is an Either',
      answer: 'RTFM',
      tags: []
    })
  }).then(r => r.json())


  t.notOk(result.ok)
  t.equal(result.message, JSON.stringify([
    "too_small: expected \'undefined\' and received \'undefined\' for the property \'tags\' - message: Should have at least 1 items" 
  ]))

  server.close()

})

test('Create FAQ', async t => {
  t.plan(1)

  const server = testServer(app)

  const result = await fetch(server.url + '/api/faqs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      id: "faq-1",
      question: 'What is an Either',
      answer: 'RTFM',
      tags: ['common']
    })
  }).then(r => r.json())

  t.ok(result.ok)

  server.close()

})

