const express = require('express')
const faqGetIndex = require('./api/faqs/get-index.js')
const core = require('./middleware/core')

const app = express()

app.use(core)

app.get('/api/faqs', faqGetIndex)


app.get('/', (req, res) => {
  res.json({ name: 'hyper web cms'})
})

if (!module.parent) {
  app.listen(3000)
}

module.exports = app
