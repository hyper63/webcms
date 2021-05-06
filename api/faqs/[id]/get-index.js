module.exports = async function (req, res) {
    const {core, params} = req
    const {id} = params

   const result = await core.faqs.get(id).toPromise()
   res.json(result)
}