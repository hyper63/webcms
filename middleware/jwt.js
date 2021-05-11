const jwt = require('express-jwt')

module.exports = jwt({
  secret: process.env.API_SECRET,
  algorithms: ['HS256'],
  audience: 'https://webcms-api.hyper.io'
}).unless({path: [
  { url: '/', methods: ['GET']},
  { url: '/api/faqs', methods: ['GET']},
  { url: /^\/api\/faqs\/(.*)$/, methods: ['GET']},
  { url: /^\/api-docs\/(.*)$/, methods: ['GET']}
]})
