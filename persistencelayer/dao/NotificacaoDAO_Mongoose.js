const mongoose = require('mongoose');
const INotificacaoDAO = require('./INotificacaoDAO.js');
const Notificacao = require('../models/Notificacao.js');

class NotificacaoDAO_mongoose extends INotificacaoDAO {
  constructor(){
    super();
    mongoose.connect('mongodb+srv://matheus62053:pc3123@cluster0.ry71u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  async listarNotificacoes(usuarioId) {
    return await Notificacao.find({ usuario: usuarioId })
      .sort({ data: -1 })
      .populate('usuario', 'nome email');
  }

  async criarNotificacao(dados) {
    return await Notificacao.create(dados);
  }

  async listarTudo() {
    return await Notificacao.find();
  }

  async marcarComoLida(notificacaoId) {
    return await Notificacao.findByIdAndUpdate(
      notificacaoId,
      { lida: true },
      { new: true }
    );
  }

}

module.exports = NotificacaoDAO_mongoose;
