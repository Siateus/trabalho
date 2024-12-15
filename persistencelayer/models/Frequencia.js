const mongoose = require('mongoose');

const frequenciaSchema = new mongoose.Schema({
  funcionario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  data: { type: Date, required: true },
  horaEntrada: { type: String, required: true },
  horaSaida: { type: String, required: true },
  horasTrabalhadas: { type: Number, required: true },
  motivoAusencia: { type: String }
});

module.exports = mongoose.model('Frequencia', frequenciaSchema);
