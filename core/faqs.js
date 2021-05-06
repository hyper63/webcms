const { Async } = require('crocks')

module.exports = (services) => {
  console.log({services})
  return ({
    list: () => 
      services.query({
        selector: {
          type: 'faq'
        },
        limit: 1000
      })
    ,
    create: (faq) => 
      Async.of({...faq, type: 'faq'})
        .chain(services.create)
    ,
    update: (id, faq) => null,
    get: (id) => null,
    'delete': (id) => null
  })
}
