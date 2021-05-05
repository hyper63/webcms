const services = require('../services')
const core = require('../core')

module.exports = (req, res, next) => {
  req.core = core(services) // { faq: { list, create, update }}
  next()
}
