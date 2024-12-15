const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cpf: { type: String, required: true },
  dataNascimento: { type: Date, required: true },
  idade: { type: Number, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
  cargo: { type: String, required: true },
  tipo: { type: String, enum: ['gestor', 'funcionario'], required: true }
});

module.exports = mongoose.model('Usuario', usuarioSchema);
