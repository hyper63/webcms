const test = require('tape')
const fetch = require('node-fetch')
const testServer = require('@twilson63/test-server')

const app = require('../server')
const jwt = require('jsonwebtoken')

const token = jwt.sign({sub: 'test'}, process.env.API_SECRET, {audience: 'https://webcms-api.hyper.io'})

test('DELETE /api/faqs/:id', async t => {
  t.plan(1)
  const server = testServer(app)
  const result = await ( await fetch(server.url + '/api/faqs/faq-1', {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })).json().catch(err => ({ok: false, message: err.message}))
  console.log(result)
  t.ok(result.ok)
  server.close()

})
