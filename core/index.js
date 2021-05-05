const faqs = require('./faqs')

module.exports = (services) => 
({
  faqs: faqs(services)
})
