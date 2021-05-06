const hyper = require('@hyper.io/connect')
const fetch = require('node-fetch')
const { Async } = require('crocks')

const asyncFetch = Async.fromPromise(fetch)
const toJSON = res => Async.fromPromise(res.json.bind(res))() 

module.exports =  
({
  query,
  create
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


