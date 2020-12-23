const { PORT } = require('./config.js')
const express = require('express')

module.exports = () => {
  const app = express()

  app.set('port', PORT)

  require('../route/get-cep-route')(app)
  require('../route/post-cep-route')(app)

  return app
}
