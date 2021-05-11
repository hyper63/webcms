module.exports = async function createFaq(req, res) {
  const faqs = req.core.faqs
  // Async -> Promise then execute
  try {
    const result = await faqs.create(req.body).toPromise()
    return res.json(result)
  } catch (err) {
    if (err.status) {
      res.status(err.status).json({ ok: false, message: err.message})
      return
    }
    res.status(500).json({ok: false, message: err.message})

  }
}
