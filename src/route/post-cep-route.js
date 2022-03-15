const CepService = require('../service/cep-service')
module.exports = app => {
  app.route('/api/v1/cep').post(
    async (req, res) => {
      try {
        const cep = await CepService.create(req.body);
        res.status(200).json(cep)
      } catch (error) {
        res.status(500).json(error)
      }
    })
}
