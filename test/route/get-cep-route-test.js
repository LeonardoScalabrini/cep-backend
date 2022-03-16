const { assert } = require('chai')
const express = require('../../src/config/express')()
const request = require('supertest')
const Cep = require('../../src/schema/cep-schema')

describe('GET /api/v1/cep', () => {
  var id = null
  beforeEach(() => {
    Cep.collection.drop((err, res) => {
      const cep = new Cep({ cidade: 'Cidade', cep: 'Cep' })
      Cep.insertMany([cep], (error, docs) => {
        id = docs[0].id
      })
    })
  })

  it('responds with json', () => {
    request(express)
      .get('/api/v1/cep')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect('Content-Security-Policy', "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'")
      .expect(200)
      .end(function (err, res) {
        assert.equal(res.body[0]._id, id)
        assert.equal(res.body[0].cidade, 'Cidade')
        assert.equal(res.body[0].cep, 'Cep')
        if (err) return done(err)
      })
  })
})
