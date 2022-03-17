const { assert } = require('chai')
const express = require('../../src/config/express')()
const request = require('supertest')

describe('GET *', () => {

  it('responds with json', () => {
    request(express)
      .get('/')
      .expect(204)
      .end(function (err, res) {
        assert.equal(res.body, 'Não encontrado!')
        if (err) return done(err)
      })
  })
})
