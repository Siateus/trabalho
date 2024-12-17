const mongoose = require('mongoose');
const IMensagemDAO = require('./IMensagemDAO.js');
const Mensagem = require('../models/Mensagem.js');
const Notificacao = require('../models/Notificacao.js');

class MensagemDAO_mongoose extends IMensagemDAO {
  constructor(){
    super();
    mongoose.connect('mongodb+srv://matheus62053:pc3123@cluster0.ry71u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  async enviarMensagem(req) {
    try {
      const mensagem = new Mensagem(req.body);
      await mensagem.save();

      // Criar notificação associada à mensagem
      const notificacao = new Notificacao({
        usuario: mensagem.usuario,
        evento: 'Nova Mensagem',
        dataHora: new Date(),
        detalhes: mensagem.conteudo
      });
      await notificacao.save();

      return mensagem;
    } catch (error) {
      throw new Error('Erro ao enviar mensagem');
    }
  }

  async listarMensagens(req) {
    try {
      const mensagens = await Mensagem.find();
      return mensagens;
    } catch (error) {
      throw new Error('Erro ao listar mensagens');
    }
  }

  async deletarMensagem(req) {
    try {
      const mensagem = await Mensagem.findByIdAndDelete(req.params.id);
      return mensagem;
    } catch (error) {
      throw new Error('Erro ao deletar mensagem');
    }
  }
}

module.exports = MensagemDAO_mongoose;
