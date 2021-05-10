const fetchMock = require('fetch-mock')
globalThis.fetch = fetchMock.sandbox()
  .post('https://dev.hyper63.com/data/twilson63', { ok: true })
  .post('https://dev.hyper63.com/data/twilson63/_query', { status: 200, body: {ok: true, docs: [
    {
      "id": "faq-1",
      "question": "What is hyper?",
      "answer": "awesome",
      "tags": ["common"]
    }
  ]}})
  .put('https://dev.hyper63.com/data/twilson63/faq-1', { ok: true })
  .delete('https://dev.hyper63.com/data/twilson63/faq-1', {ok: true, mock: true })
  .get('https://dev.hyper63.com/data/twilson63/faq-1', {
  id: 'faq-1',
  question: 'What is an Either',
  answer: 'RTFM',
  tags: [ 'common' ],
  type: 'faq',
  created: '2021-05-06T18:31:39.499Z'
})


require('./post-faq_test')
require('./get-faqs_test')
require('./put-faq_test')
require('./delete-faq_test')
require('./get-faq-by-id_test')
