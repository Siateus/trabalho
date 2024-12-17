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

  async criarNotificacao(req) {
    try {
      const notificacao = new Notificacao(req.body);
      await notificacao.save();
      return notificacao;
    } catch (error) {
      throw new Error('Erro ao criar notificação');
    }
  }

  async listarNotificacoes(req) {
    try {
      const notificacoes = await Notificacao.find({ usuario: req.params.id });
      return notificacoes;
    } catch (error) {
      throw new Error('Erro ao listar notificações');
    }
  }

  async deletarNotificacao(req) {
    try {
      const notificacao = await Notificacao.findByIdAndDelete(req.params.id);
      return notificacao;
    } catch (error) {
      throw new Error('Erro ao deletar notificação');
    }
  }
}

module.exports = NotificacaoDAO_mongoose;
