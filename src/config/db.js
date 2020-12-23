var mongoose = require('mongoose')
var { database } = require('./config.js')

mongoose.connect(database.stringConnection, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
