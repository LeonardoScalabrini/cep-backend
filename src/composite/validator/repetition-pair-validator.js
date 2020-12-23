REGEX = /(\d{1}).\1/

module.exports = new class RequestValidator {
  validate (req) {
    if (REGEX.test(req.cep)) {
      throw 'O campo CEP não deve possuir nenhum dígito repetitivo alternado em pares'
    }
  }
}()
