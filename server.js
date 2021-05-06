const express = require('express')
const faqGetIndex = require('./api/faqs/get-index.js')
const faqPostIndex = require('./api/faqs/post-index.js')
const faqGetByID = require('./api/faqs/[id]/get-index')

const core = require('./middleware/core')


const app = express()

app.use(core)
app.use(express.json())

app.get('/api/faqs', faqGetIndex)
app.post('/api/faqs', faqPostIndex)
app.get('/api/faqs/:id', faqGetByID )

app.get('/', (req, res) => {
  res.json({ name: 'hyper web cms'})
})

if (!module.parent) {
  app.listen(3000)
}

module.exports = app
