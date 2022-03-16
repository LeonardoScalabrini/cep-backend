const CepRepository = require('../repository/cep-repository')
var { database } = require('../config/config')

module.exports = app => {
  app.route('/api/v1/cep').get(
    (req, res) => {
      if (database.stringConnection) {
        CepRepository.getAll((error, docs) => {
          res
          .status(200)
          header(
            'Content-Security-Policy',
            "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'"
          )
          .json(docs)
        })
      } else {
        res.status(200).json('Aqui 18')
      }
    })
}
