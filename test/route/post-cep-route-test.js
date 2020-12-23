const { assert } = require('chai')
const express = require('../../src/config/express')()
const request = require('supertest')

describe('POST /api/v1/cep', function () {
  this.timeout(10000)
  it('responds with json', function (done) {
    request(express)
      .post('/api/v1/cep')
      .send({name: 'john'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        assert.equal(res.body[0]._id, 2)
        assert.equal(res.body[0].cidade, 'Maringá')
        assert.equal(res.body[0].cep, '121212312')
        if (err) return done(err)
        done()
      })
  })
})
