require('dotenv').config({
  path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env'
})

module.exports = {
  PORT: process.env.PORT,
  database: {
    stringConnection: process.env.STRING_CONNECTION_DB
  }
}
