const mongoose = require('mongoose');

const dadoSchema = new mongoose.Schema({
  temperatura: Number,
  umidade: Number,
  // Outros campos relevantes para o seu aplicativo
});

const Dado = mongoose.model('Dado', dadoSchema);

module.exports = Dado;
