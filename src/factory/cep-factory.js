const Cep = require('../schema/cep-schema')

module.exports = new class CepFactory {
  factory (req) {
    return new Cep({ cidade: req.cidade, cep: req.cep })
  }
}()
