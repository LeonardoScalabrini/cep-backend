const { PORT } = require('./src/config/config.js')
const express = require('express')

const app = express()

app.listen(PORT, () => {
  console.log('#### CEP-BACKEND: ', PORT)
})

module.exports = app
