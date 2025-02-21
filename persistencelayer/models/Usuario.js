const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  dataNascimento: { type: Date, required: true },
  idade: { type: Number },
  email: { type: String, required: true, unique: true },
  cargo: { type: String, required: true },
  status: { type: String, required: true },
  tipo: { type: String, enum: ['gestor', 'funcionario'], required: true },
  imagemPerfil: { type: String } // Caminho da imagem de perfil
});

module.exports = mongoose.model('Usuario', usuarioSchema);
