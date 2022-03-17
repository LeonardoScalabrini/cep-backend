const { assert } = require('chai')
const express = require('../../src/config/express')()
const request = require('supertest')

describe('OPTIONS *', () => {

  it('responds with json', () => {
    request(express)
      .options('/')
      .expect(204)
  })
})
