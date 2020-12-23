require('dotenv').config()

module.exports = {
  PORT: process.env.PORT,
  database: {
    stringConnection: process.env.STRING_CONNECTION_DB
  }
}
