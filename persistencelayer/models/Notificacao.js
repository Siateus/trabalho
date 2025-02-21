const mongoose = require('mongoose');

const notificacaoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  tipo: {
    type: String,
    enum: ['alteracao', 'exclusao', 'login'],
    required: true
  },
  mensagem: {
    type: String,
    required: true
  },
  data: {
    type: Date,
    default: Date.now
  },
  lida: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Notificacao', notificacaoSchema);