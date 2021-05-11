module.exports = async function ({core, params, body}, res) {
  const { faqs } = core
  // Async -> Promise then execute
  try {
    const result = await faqs.update(params.id, body).toPromise()
    return res.json(result)
  } catch (err) {
    if (err.status) {
      res.status(err.status).json({ ok: false, message: err.message})
      return
    }
    res.status(500).json({ok: false, message: err.message})

  }

}
