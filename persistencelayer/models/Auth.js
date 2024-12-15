const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  senha: { type: String, required: true }
});

module.exports = mongoose.model('Auth', authSchema);
