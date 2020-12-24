const assert = require('assert')
const CepFactory = require('../../src/factory/cep-factory')

describe('CepFactory Cep', () => {

  it('creates a cep', (done) => {
    req = {
      cep: 'Cep',
      cidade: 'Cidade'
    }
    const cep = CepFactory.factory(req)
    assert.strictEqual('Cep', cep.cep)
    assert.strictEqual('Cidade', cep.cidade)
    done()
  })
})
