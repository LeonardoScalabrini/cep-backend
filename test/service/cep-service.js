var sinon = require('sinon')
const { assert } = require('chai')
const CepService = require('../../src/service/cep-service')
const CepRepository = require('../../src/repository/cep-repository')
const CepValidateComposite = require('../../src/composite/cep-validate-composite')
const CepFactory = require('../../src/factory/cep-factory')

describe('Cep Service', () => {

  var req = {
    cep: '523563',
    cidade: 'Cidade'
  }

  var spyNext = null
  var spyValidate = null
  var stub = null
  var stubFactory = null
  before(function (done) {
    spyNext = sinon.spy(CepValidateComposite.prototype, 'next')
    spyValidate = sinon.spy(CepValidateComposite.prototype, 'validate')
    stubFactory = sinon.stub(CepFactory, 'factory').callsFake(() => {
    })
    stub = sinon.stub(CepRepository, 'create').callsFake(() => {
    })
    done()
  })

  it('should validate and create cep', (done) => {
    CepService.create(req)
    assert(spyNext.calledThrice)
    assert(spyValidate.calledOnce)
    assert(stubFactory.calledOnce)
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
