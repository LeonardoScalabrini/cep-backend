const CepService = require('../service/cep-service')
module.exports = app => {
  app.route('/api/v1/cep').post(
    async (req, res) => {
      try {
        const cep = await CepService.create(req.body);
        res
        .status(200)
        .header('Content-Security-Policy', "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'")
        .json(cep);
      } catch (error) {
        res.status(500).json(error)
      }
    })
}
