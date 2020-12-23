const assert = require('assert')
const Cep = require('../../src/schema/cep-schema')
const Repository = require('../../src/repository/cep-repository')

describe('Repository Cep', () => {
  beforeEach(function (done) {
    Cep.collection.drop((err, res) => {
      done()
    })
  })

  it('creates a cep', (done) => {
    const cep = new Cep({ cidade: 'Cidade', cep: 'Cep' })
    Repository.create(cep)
      .then(() => {
        assert(!cep.isNew)
        assert(cep.id)
        Cep.findById(cep.id, (err, res) => {
          assert.strictEqual(res.id, cep.id)
          assert.strictEqual(res.cidade, cep.cidade)
          assert.strictEqual(res.cep, cep.cep)
          done()
        })
      })
  })

  it('getAll ceps', (done) => {
    const cep = new Cep({ cidade: 'Cidade', cep: 'Cep' })
    const cep2 = new Cep({ cidade: 'Cidade2', cep: 'Cep2' })
    Cep.insertMany([cep, cep2], (error, docs) => {
      assert.strictEqual(docs.length, 2)
      Repository.getAll((error, res) => {
        assert.strictEqual(res.length, 2)
        assert.strictEqual(res[0].id, cep.id)
        assert.strictEqual(res[0].cidade, cep.cidade)
        assert.strictEqual(res[0].cep, cep.cep)
        done()
      })
    })
  })
})
