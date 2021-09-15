const { assert } = require('chai')
const express = require('../../src/config/express')()
const request = require('supertest')
const Cep = require('../../src/schema/cep-schema')

describe('POST /api/v1/cep', () => {
  beforeEach(() => {
    Cep.collection.drop()
  })

  it('responds with json', () => {
    request(express)
      .post('/api/v1/cep')
      .send({cep: '523563', cidade: 'Maringá'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        assert.isNotNull(res.body.id)
        assert.equal(res.body.cidade, 'Maringá')
        assert.equal(res.body.cep, '523563')
      })
  })

  it('responds with error', () => {
    request(express)
      .post('/api/v1/cep')
      .send({cep: '121426', cidade: 'Maringá'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)
      .end(function (err, res) {
        assert.equal(res.body, 'O campo CEP não deve possuir nenhum dígito repetitivo alternado em pares')
      })
  })
})
