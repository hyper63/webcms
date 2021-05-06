const test = require('tape')
const app = require('../server')
const testServer = require('@twilson63/test-server')
const fetch = require('node-fetch')


test('GET /api/faqs/:id', async t => {
  t.plan(1)
  const server = testServer(app)
  const result = await fetch(server.url + '/api/faqs/faq-1')
    .then(r => r.json())

  console.log(result)

  /* result
{
  id: 'faq-1',
  question: 'What is an Either',
  answer: 'RTFM',
  tags: [ 'common' ],
  type: 'faq',
  created: '2021-05-06T18:31:39.499Z'
}
  */
  t.equal(result.id, 'faq-1')

  server.close()

})
