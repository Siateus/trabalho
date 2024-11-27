const mongoose = require('mongoose');

const PontoSchema = new mongoose.Schema({
  usuarioId: mongoose.Schema.Types.ObjectId,
  tipo: String,
  dataHora: Date,
  horaEntrada: String,
  horaSaida: String
});

module.exports = mongoose.model('Ponto', PontoSchema);
