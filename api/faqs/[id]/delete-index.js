module.exports = async function ({core, params}, res) {
  const result = await core.faqs.delete(params.id).toPromise()
  res.json(result)
}
