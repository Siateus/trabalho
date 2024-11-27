const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  usuarioId: mongoose.Schema.Types.ObjectId,
  adm: Boolean
});

module.exports = mongoose.model('Admin', AdminSchema);
