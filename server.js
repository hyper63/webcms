const fetch = require('node-fetch')

if (!globalThis.fetch) {
  globalThis.fetch = fetch
}

const express = require('express')
const faqGetIndex = require('./api/faqs/get-index.js')
const faqPostIndex = require('./api/faqs/post-index.js')
const faqGetByID = require('./api/faqs/[id]/get-index')
const faqPutByID = require('./api/faqs/[id]/put-index')

const core = require('./middleware/core')


const app = express()

app.use(core)
app.use(express.json())

app.use(function (err, req, res, next) {
  console.log(err.stack)
  res.status(500).json({ ok: false, message: err.message})
})


app.get('/api/faqs', faqGetIndex)
app.post('/api/faqs', faqPostIndex)
app.get('/api/faqs/:id', faqGetByID )
app.put('/api/faqs/:id', faqPutByID)

app.get('/', (req, res) => {
  res.json({ name: 'hyper web cms'})
})


app.all('*', (req, res) => {
  res.status(404).json({ok: false, message: 'not implemented'})
})

if (!module.parent) {
  app.listen(3000)
}

module.exports = app
