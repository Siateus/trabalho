const mongoose = require('mongoose');

const relatorioSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  conteudo: { type: String, required: true },
  dataCriacao: { type: Date, default: Date.now },
  criadoPor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }
});

module.exports = mongoose.model('Relatorio', relatorioSchema);
