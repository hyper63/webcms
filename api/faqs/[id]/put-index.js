module.exports = async function ({core, params, body}, res) {
  const { faqs } = core
  const result = await faqs.update(params.id, body).toPromise()
  return res.json(result)
}
