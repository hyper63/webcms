const test = require('tape')
const testServer = require('@twilson63/test-server')

const app = require('../server')
const fetch = require('node-fetch')
const jwt = require('jsonwebtoken')

const token = jwt.sign({sub: 'test'}, process.env.API_SECRET, {audience: 'https://webcms-api.hyper.io'})

test('PUT /api/faqs/:id', async t => {
  t.plan(1)
  const server = testServer(app)
  const result = await (await fetch(server.url + '/api/faqs/faq-1', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
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
