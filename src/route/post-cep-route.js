const CepService = require('../service/cep-service')
module.exports = app => {
  app.route('/api/v1/cep').post(
    (req, res) => {
      try {
        CepService.create(req.body)
          .then((cep) => {
            res.status(200).json(cep)
          })
      } catch (error) {
        res.status(500).json(error)
      }
    })
}
