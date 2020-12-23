const { assert } = require('chai')
const express = require('../../src/config/express')()
const request = require('supertest')

describe('GET /api/v1/cep', function () {
  this.timeout(10000)
  it('responds with json', function (done) {
    request(express)
      .get('/api/v1/cep')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        assert.equal(res.body[0]._id, 1)
        assert.equal(res.body[0].cidade, 'Sarandi')
        assert.equal(res.body[0].cep, '1132132')
        if (err) return done(err)
        done()
      })
  })
})
