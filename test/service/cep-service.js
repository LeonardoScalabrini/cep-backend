var sinon = require('sinon')
const { assert } = require('chai')
const CepService = require('../../src/service/cep-service')
const CepRepository = require('../../src/repository/cep-repository')
const CepValidateComposite = require('../../src/composite/cep-validate-composite')

describe('Cep Service', () => {

  var req = {
    cep: '523563',
    cidade: 'Cidade'
  }

  var spyNext = null
  var spyValidate = null
  var stub = null

  before(function (done) {
    spyNext = sinon.spy(CepValidateComposite.prototype, 'next')
    spyValidate = sinon.spy(CepValidateComposite.prototype, 'validate')
    stub = sinon.stub(CepRepository, 'create').callsFake(() => {
    })
    done()
  })

  it('should validate and create cep', (done) => {
    CepService.create(req)
    assert(spyNext.calledThrice)
    assert(spyValidate.calledOnce)
    assert(stub.calledOnce)
    done()
  })

  it('should throw error and not create cep', (done) => {
    assert.throw(() => {
      CepService.create({})
    })
    done()
  })
})
