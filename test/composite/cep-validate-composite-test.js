const { assert } = require('chai')
const CepValidateComposite = require('../../src/composite/cep-validate-composite')

describe('Cep Validator Composite', function () {
  var cepValidateComposite = null
  var mockValidator = null
  var mockRequest = null
  beforeEach(function (done) {
    cepValidateComposite = new CepValidateComposite()
    mockRequest = {
    }
    mockValidator = {
      count: 0,
      validate() {
        this.count++
      }
    }
    done()
  })

  it('should call one validate', function (done) {
    cepValidateComposite.next(mockValidator)
    cepValidateComposite.validate(mockRequest)
    assert.strictEqual(mockValidator.count, 1)
    done()
  })

  it('should call two validates', function (done) {
    cepValidateComposite
      .next(mockValidator)
      .next(mockValidator)
    cepValidateComposite.validate(mockRequest)
    assert.strictEqual(mockValidator.count, 2)
    done()
  })

  it('should throw error validate', function (done) {
    mockValidatorError = {
      count: 0,
      validate() {
        this.count++
        throw 'Erro'
      }
    }
    cepValidateComposite.next(mockValidatorError)
    assert.throw(() => {
      cepValidateComposite.validate(mockRequest)
    })
    assert.strictEqual(mockValidatorError.count, 1)
    done()
  })

  it('should call validate and throw error', function (done) {
    mockValidatorError = {
      count: 0,
      validate() {
        this.count++
        throw 'Erro'
      }
    }

    mockValidator = {
      count: 0,
      validate() {
        this.count++
      }
    }

    cepValidateComposite
      .next(mockValidator)
      .next(mockValidatorError)

    assert.throw(() => {
      cepValidateComposite
        .validate(mockRequest)
    })
    assert.strictEqual(mockValidator.count, 1)
    assert.strictEqual(mockValidatorError.count, 1)
    done()
  })
})
