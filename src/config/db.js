var mongoose = require('mongoose')
var { database } = require('./config.js')

if (!database.stringConnection) {
  return
}

mongoose.connect(database.stringConnection, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
