module.exports = new class RequestValidator {
  validate (req) {
    if (!req || !req.cep || !req.cep.trim()) {
      throw 'O campo CEP deve ser preenchido!'
    }

    if (!req.cidade || !req.cidade.trim()) {
      throw 'O campo Cidade deve ser preenchido!'
    }
  }
}()
