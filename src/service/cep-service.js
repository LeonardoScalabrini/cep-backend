const CepValidateComposite = require('../composite/cep-validate-composite')
const CepRepository = require('../repository/cep-repository')
const RequestValidator = require('../composite/validator/request-validator')
const CepValidator = require('../composite/validator/cep-validator')
const RepetitionPairValidator = require('../composite/validator/repetition-pair-validator')

module.exports = new class CepService {

  constructor () {
    this.cepValidateComposite = new CepValidateComposite()
  }

  create (req) {
    this.cepValidateComposite
      .next(RequestValidator)
      .next(CepValidator)
      .next(RepetitionPairValidator)
      .validate(req)
    return CepRepository.create(req)
  }
}()
