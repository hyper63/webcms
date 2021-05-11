const fetch = require('node-fetch')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./openapi.json');



if (!globalThis.fetch) {
  globalThis.fetch = fetch
}

const express = require('express')
const faqGetIndex = require('./api/faqs/get-index.js')
const faqPostIndex = require('./api/faqs/post-index.js')
const faqGetByID = require('./api/faqs/[id]/get-index')
const faqPutByID = require('./api/faqs/[id]/put-index')
const faqDeleteByID = require('./api/faqs/[id]/delete-index')

const core = require('./middleware/core')
const jwt = require('./middleware/jwt')
const cors = require('cors')
const app = express()

app.use(jwt)
app.use(core)
//app.use(cors)
app.use(express.json())

app.use('/api-docs', cors(), swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get('/api/faqs', faqGetIndex)
app.post('/api/faqs', faqPostIndex)
app.get('/api/faqs/:id', faqGetByID)
app.put('/api/faqs/:id', faqPutByID)
app.delete('/api/faqs/:id', faqDeleteByID)

app.get('/', (req, res) => {
  res.json({ name: 'hyper web cms' })
})

app.all('*', (req, res) => {
  res.status(404).json({ ok: false, message: 'not implemented' })
})

app.use(function (err, req, res, next) {
  console.log(err.stack)
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ok: false, message: 'not authorized'})
  }
  res.status(err.status || 500).json({ ok: false, message: err.message })
})

if (!module.parent) {
  app.listen(3000)
}

module.exports = app
