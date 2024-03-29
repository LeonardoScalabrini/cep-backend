module.exports =
  class CepValidateComposite {
    constructor () {
      this.collectValidator = []
    }

    validate (req) {
      this.collectValidator.forEach(v => v.validate(req))
    }

    next (validator) {
      this.collectValidator.push(validator)
      return this
    }
}
