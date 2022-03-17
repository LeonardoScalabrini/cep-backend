const { PORT } = require('./config.js')
const express = require('express')
const bodyParser = require('body-parser')

module.exports = () => {
  const app = express()
  app.use(bodyParser.json())
  app.set('port', PORT)

  app.use(function (req, res, next) {
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'"
    );
    next();
  });
  require('./db')
  require('../route/get-cep-route')(app)
  require('../route/post-cep-route')(app)

  return app
}
