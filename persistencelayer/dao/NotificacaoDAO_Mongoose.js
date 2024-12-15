const mongoose = require('mongoose');
const Notificacao = require('../models/Notificacao');
const Usuario = require('../models/Usuario');
const INotificacaoDAO = require('./INotificacaoDAO');

class NotificacaoDAO_mongoose extends INotificacaoDAO {
  constructor() {
    super();
    mongoose.connect('mongodb+srv://matheus62053:pc3123@cluster0.ry71u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  async getNotificacoesGestor(req) {
    try {
      const notificacoes = await Notificacao.find({ tipo: 'gestor' });
      return notificacoes;
    } catch (error) {
      throw new Error('Erro ao obter notificações do gestor');
    }
  }

  async getNotificacoesFuncionario(req) {
    try {
      const notificacoes = await Notificacao.find({ tipo: 'funcionario' });
      return notificacoes;
    } catch (error) {
      throw new Error('Erro ao obter notificações do funcionário');
    }
  }

  async enviarMensagemParaFuncionario(req) {
    try {
      const { idFuncionario, mensagem } = req.body;
      const funcionario = await Usuario.findById(idFuncionario);
      if (!funcionario) {
        throw new Error('Funcionário não encontrado');
      }
      const novaNotificacao = new Notificacao({
        usuario: idFuncionario,
        mensagem,
        tipo: 'funcionario'
      });
      await novaNotificacao.save();
      return novaNotificacao;
    } catch (error) {
      throw new Error('Erro ao enviar mensagem para o funcionário');
    }
  }

  async enviarMensagemParaTodos(req) {
    try {
      const { mensagem } = req.body;
      const funcionarios = await Usuario.find({ tipo: 'funcionario' });
      const notificacoes = await Promise.all(funcionarios.map(async (funcionario) => {
        const novaNotificacao = new Notificacao({
          usuario: funcionario._id,
          mensagem,
          tipo: 'funcionario'
        });
        await novaNotificacao.save();
        return novaNotificacao;
      }));
      return notificacoes;
    } catch (error) {
      throw new Error('Erro ao enviar mensagem para todos os funcionários');
    }
  }
}

module.exports = NotificacaoDAO_mongoose;
