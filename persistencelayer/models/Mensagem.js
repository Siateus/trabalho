const mongoose = require("mongoose");

const mensagemSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  conteudo: { type: String, required: true },
  tipo: { type: String, enum: ["funcionario", "todos"], required: true },
  dataHora: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Mensagem", mensagemSchema);
