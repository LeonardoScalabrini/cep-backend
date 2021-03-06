require('dotenv').config({
  path: '.env-' + process.env.NODE_ENV
})

module.exports = {
  PORT: process.env.PORT,
  database: {
    stringConnection: process.env.STRING_CONNECTION_DB
  }
}
