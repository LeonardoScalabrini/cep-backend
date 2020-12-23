const { assert, expect } = require('chai')
const cepValidator = require('../../../src/composite/validator/cep-validator')

describe('Cep Validator Test', function () {
  var request = null
  beforeEach(function (done) {
    request = {
      cep: '100001',
      cidade: 'cidade'
    }
    done()
  })

  it('cep with value valid', function (done) {
    expect(cepValidator.validate(request))
    done()
  })

  it('cep NaN', function (done) {
    request.cep = 'asdkjasdklj'
    assert.throw(() => {
      cepValidator.validate(request)
    })
    done()
  })

  it('cep minimum value', function (done) {
    request.cep = '99999'
    assert.throw(() => {
      cepValidator.validate(request)
    })
    done()
  })

  it('cep maximum value', function (done) {
    request.cep = '1000000'
    assert.throw(() => {
      cepValidator.validate(request)
    })
    done()
  })
})
