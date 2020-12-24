const { PORT } = require('./config.js')
const express = require('express')
const bodyParser = require('body-parser')

module.exports = () => {
  const app = express()
  app.use(bodyParser.json())
  app.set('port', PORT)

  require('./db')
  require('../route/get-cep-route')(app)
  require('../route/post-cep-route')(app)

  return app
}
