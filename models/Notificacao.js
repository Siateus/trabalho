const mongoose = require('mongoose');

const NotificacaoSchema = new mongoose.Schema({
  usuarioId: mongoose.Schema.Types.ObjectId,
  mensagem: String,
  dataHora: Date,
  lida: Boolean
});

module.exports = mongoose.model('Notificacao', NotificacaoSchema);
