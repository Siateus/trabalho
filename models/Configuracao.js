const mongoose = require('mongoose');

const ConfiguracaoSchema = new mongoose.Schema({
  usuarioId: mongoose.Schema.Types.ObjectId,
  notificacoes: Boolean,
  idioma: String,
  tema: String
});

module.exports = mongoose.model('Configuracao', ConfiguracaoSchema);
