const jwt = require('jsonwebtoken')

console.log(
  jwt.sign({
    sub: 'dev',
  }, process.env.API_SECRET,
  { audience: 'https://webcms-api.hyper.io' }
  )
)
