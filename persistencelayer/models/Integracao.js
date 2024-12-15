const mongoose = require('mongoose');

const integracaoSchema = new mongoose.Schema({
  sistema: { type: String, required: true },
  status: { type: String, enum: ['pendente', 'concluida', 'falha'], default: 'pendente' },
  dataIntegracao: { type: Date, default: Date.now },
  detalhes: { type: String }
});

module.exports = mongoose.model('Integracao', integracaoSchema);
