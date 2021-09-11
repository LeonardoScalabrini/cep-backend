var mongoose = require('mongoose')
var { database } = require('./config.js')

console.log('database', JSON.stringify(database))
console.log('database', database.stringConnection)

if (!database.stringConnection) {
  return
}

mongoose.connect(database.stringConnection, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
