const mongoose = require('mongoose');

const notificacaoSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  evento: { type: String, required: true },
  dataHora: { type: Date, default: Date.now },
  detalhes: { type: String }
});

module.exports = mongoose.model('Notificacao', notificacaoSchema);