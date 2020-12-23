const mongoose = require('mongoose')

const CepSchema = new mongoose.Schema({
  cidade: { type: String, required: true },
  cep: { type: String, required: true }
})

const Cep = mongoose.model('cep', CepSchema)
module.exports = Cep
