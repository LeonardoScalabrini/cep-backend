const { assert, expect } = require('chai')
const requestValidator = require('../../../src/composite/validator/request-validator')

describe('Request Validator Test', function () {
  var request = null
  beforeEach(function (done) {
    request = {
      cep: 'cep',
      cidade: 'cidade'
    }
    done()
  })

  it('request with cep and cidade', function (done) {
    expect(requestValidator.validate(request))
    done()
  })

  it('request null', function (done) {
    assert.throw(() => {
      requestValidator.validate(null)
    })
    done()
  })

  it('request undefined', function (done) {
    assert.throw(() => {
      requestValidator.validate(undefined)
    })
    done()
  })

  it('cep null', function (done) {
    request.cep = null
    assert.throw(() => {
      requestValidator.validate(request)
    })
    done()
  })

  it('cep undefined', function (done) {
    request.cep = undefined
    assert.throw(() => {
      requestValidator.validate(request)
    })
    done()
  })

  it('cep empty', function (done) {
    request.cep = ''
    assert.throw(() => {
      requestValidator.validate(request)
    })
    done()
  })

  it('cep empty with space', function (done) {
    request.cep = ' '
    assert.throw(() => {
      requestValidator.validate(request)
    })
    done()
  })

  it('cidade null', function (done) {
    request.cep = null
    assert.throw(() => {
      requestValidator.validate(request)
    })
    done()
  })

  it('cidade undefined', function (done) {
    request.cidade = undefined
    assert.throw(() => {
      requestValidator.validate(request)
    })
    done()
  })

  it('cidade empty', function (done) {
    request.cidade = ''
    assert.throw(() => {
      requestValidator.validate(request)
    })
    done()
  })

  it('cidade empty with space', function (done) {
    request.cidade = ' '
    assert.throw(() => {
      requestValidator.validate(request)
    })
    done()
  })
})
