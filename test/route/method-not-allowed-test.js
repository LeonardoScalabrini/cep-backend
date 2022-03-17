const { assert } = require('chai')
const express = require('../../src/config/express')()
const request = require('supertest')

describe('OPTIONS *', () => {

  it('responds with json', () => {
    request(express)
      .options('/')
      .expect(405)
      .end(function (err, res) {
        assert.equal(res.body, 'Método não permitido!')
        if (err) return done(err)
      })
  })
})
