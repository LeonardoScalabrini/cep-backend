const Cep = require('../schema/cep-schema')

module.exports = new class CepRepository {
  getAll (callback) {
    return Cep.find(callback)
  }

  create (cep) {
    return Cep.create(cep)
  }
}()
