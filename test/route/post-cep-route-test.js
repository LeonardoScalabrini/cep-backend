const { assert } = require('chai')
const express = require('../../src/config/express')()
const request = require('supertest')
const Cep = require('../../src/schema/cep-schema')

describe('POST /api/v1/cep', function () {
  beforeEach(function (done) {
    Cep.collection.drop((err, res) => {
      done()
    })
  })

  it('responds with json', function (done) {
    request(express)
      .post('/api/v1/cep')
      .send({cep: '523563', cidade: 'Maringá'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        assert.isNotNull(res.body.id)
        assert.equal(res.body.cidade, 'Maringá')
        assert.equal(res.body.cep, '523563')
        done()
      })
  })

  it('responds with error', function (done) {
    request(express)
      .post('/api/v1/cep')
      .send({cep: '121426', cidade: 'Maringá'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)
      .end(function (err, res) {
        assert.equal(res.body, 'O campo CEP não deve possuir nenhum dígito repetitivo alternado em pares')
        done()
      })
  })
})
