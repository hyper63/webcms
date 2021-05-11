const { Async, eitherToAsync, Either } = require('crocks')
const z = require('zod')
const { Right, Left } = Either
const { map } = require('ramda')

const schema = z.object({
  id: z.string().optional(),
  question: z.string().max(200),
  answer: z.string().max(1000),
  tags: z.array(z.string()).min(1),
  created: z.string().optional(),
  updated: z.string().optional(),
  active: z.boolean().optional()
})

/**
 * {\"code\":\"invalid_type\",\"expected\":\"string\",\"received\":\"undefined\",\"path\":[\"question\"],\"message\":\"Required\"}
 * */

const validate = (faq) => {
  const { success, data, error } = schema.safeParse(faq)

  console.log({validateSuccess: success})
  return success ? Right(data) : Left({
    status: 400,
    message: JSON.stringify(
      map(
        error => `${error.code}: expected '${error.expected}' and received '${error.received}' for the property '${error.path.join('.')}' - message: ${error.message}`
      ,
        error.issues
      )
    )
  })
}

const verify = (result) => result.ok ? Right(result) : Left({ status: result.status, message: result.message })

const addDefaults = faq => ({
  ...faq,
  type: 'faq',
  created: faq.created || new Date().toISOString(),
  updated: new Date().toISOString(),
  active: faq.active || false
})

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
    update: (id, faq) =>
      Async.of(faq)
        .map(validate).chain(eitherToAsync)
        .map(addDefaults)
        .chain(faq => services.update(id, faq))
        .map(verify).chain(eitherToAsync)
    ,
    get: (id) => services.get(id).map(schema.parse),
    'delete': (id) => services.delete(id).map(verify).chain(eitherToAsync)
  })
}
