const MIM_VALUE = 100000
const MAX_VALUE = 999999

module.exports = new class RequestValidator {
  validate (req) {
    if (isNaN(req.cep)) {
      throw 'O campo CEP deve possuir apenas números!'
    }

    if (req.cep < MIM_VALUE) {
      throw 'O campo CEP deve ser menor que  100.000'
    }

    if (req.cep > MAX_VALUE) {
      throw 'O campo CEP deve ser menor que 999.999'
    }
  }
}()
