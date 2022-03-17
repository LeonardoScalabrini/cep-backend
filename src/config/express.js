const { PORT } = require('./config.js')
const helmet = require('helmet')
const express = require('express')
const bodyParser = require('body-parser')
const ALLOWED_METHODS = ['GET', 'POST']

module.exports = () => {
  const app = express()
  app.use(helmet())
  app.use((req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    if (!ALLOWED_METHODS.includes(req.method)) 
      res.status(405).json('Método não permitido!')
    next()
  })
  app.use(bodyParser.json())
  app.set('port', PORT)
  require('./db')
  require('../route/get-cep-route')(app)
  require('../route/post-cep-route')(app)
  require('../route/get-not-found')(app)

  return app
}
