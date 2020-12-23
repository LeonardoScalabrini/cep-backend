const { assert, expect } = require('chai')
const repetitionPairValidator = require('../../../src/composite/validator/repetition-pair-validator')

describe('Repetition in Pairs Validator Test', function () {
  var request = null
  beforeEach(function (done) {
    request = {
      cep: '523563',
      cidade: 'cidade'
    }
    done()
  })

  it('no alternate digits', function (done) {
    expect(repetitionPairValidator.validate(request))
    done()
  })

  it('repetitive digit 1 alternated in pair', function (done) {
    request.cep = '121426'
    assert.throw(() => {
      repetitionPairValidator.validate(request)
    })
    done()
  })

  it('repetitive digit 2 and 5 alternated in pair', function (done) {
    request.cep = '552523'
    assert.throw(() => {
      repetitionPairValidator.validate(request)
    })
    done()
  })
})
