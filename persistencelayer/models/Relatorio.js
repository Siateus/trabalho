const mongoose = require('mongoose');

const relatorioSchema = new mongoose.Schema({
  tipo: { type: String, required: true },
  dataInicial: { type: Date, required: true },
  dataFinal: { type: Date, required: true },
  dataCriacao: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Relatorio', relatorioSchema);
