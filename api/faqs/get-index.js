module.exports = async function (req, res) {
  const { core } = req
  const result = await core.faqs.list().toPromise()
  res.json(result)
}
