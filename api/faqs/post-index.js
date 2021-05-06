module.exports = async function createFaq(req, res) {
  const faqs = req.core.faqs
  // Async -> Promise then execute
  const result = await faqs.create(req.body).toPromise()
    .catch(err => ({ error: err.message}))
  res.json(result)
}
