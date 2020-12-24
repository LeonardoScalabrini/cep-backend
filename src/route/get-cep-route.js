const CepRepository = require('../repository/cep-repository')

module.exports = app => {
  app.route('/api/v1/cep').get(
    (req, res) => {
      CepRepository.getAll((error, docs) => {
        res.status(200).json(docs)
      })
    })
}
