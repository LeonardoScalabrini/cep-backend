const { PORT } = require('./config.js')
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const bodyParser = require('body-parser')

module.exports = () => {
  const app = express()
  app.use(helmet())
  app.use(cors({
    methods: ['GET','POST']
}));
  app.use((req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
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
