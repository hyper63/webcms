const hyper = require('@hyper.io/connect')
const { Async } = require('crocks')

if (!globalThis.fetch) { throw new Error('fetch is not defined') }

const asyncFetch = Async.fromPromise(fetch)
const toJSON = res => Async.fromPromise(res.json.bind(res))() 

module.exports =  
({
  query,
  create,
  get
})

// Query -> Async
function query(qry) {
  return asyncFetch(hyper.url('data', '_query'), {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${hyper.token()}`
    },
    body: JSON.stringify(qry)
  }).chain(toJSON)
}

// Object -> Async 
function create(doc) {
  return asyncFetch(hyper.url('data'), {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${hyper.token()}`
    },
    body: JSON.stringify(doc)
  }).chain(toJSON)
}

function get(id) {
    return asyncFetch(hyper.url('data', id ), {
        method: 'GET',
         headers: { 
            Authorization: `Bearer ${hyper.token()}`,
            Accept: 'application/json'
    }
    }).chain(toJSON)
}
