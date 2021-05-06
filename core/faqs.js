const { Async, eitherToAsync, Either } = require('crocks')
const z = require('zod')
const { Right, Left } = Either

const schema = z.object({
  id: z.string().optional(),
  question: z.string().max(200),
  answer: z.string().max(1000),
  tags: z.array(z.string()).min(1)
})

const validate = (faq) => {
  const { success, data, error } = schema.safeParse(faq)
  return success ? Right(data) : Left(error)
}

const verify = (result) => result.ok ? Right(result) : Left(new Error('could not create'))
const addDefaults = faq => ({...faq, type: 'faq', created: new Date().toISOString()})

module.exports = (services) => {
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
    Async.of(faq)
        // validate
        .map(validate).chain(eitherToAsync)
        //process
        .map(addDefaults)
        .chain(services.create)
        // verify
        .map(verify).chain(eitherToAsync)
    ,
    update: (id, faq) => null,
    get: (id) => services.get(id).map(schema.parse),
    'delete': (id) => null
  })
}
