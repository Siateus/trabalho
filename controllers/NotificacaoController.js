const INotificacaoController = require('./INotificacaoController');
const config = require('../config');
const NotificacaoDAO = require('../persistencelayer/dao/' + config.INotificacaoDAO);
let notificacaoDao = new NotificacaoDAO();

class NotificacaoController extends INotificacaoController {
  constructor() {
    super();
  }

  async getNotificacoesGestor(req, res) {
    try {
      let notificacoes = await notificacaoDao.getNotificacoesGestor(req);
      return res.json(notificacoes);
    } catch (error) {
      return res.status(500).send('Erro ao obter notificações do gestor');
    }
  }

  async getNotificacoesFuncionario(req, res) {
    try {
      let notificacoes = await notificacaoDao.getNotificacoesFuncionario(req);
      return res.json(notificacoes);
    } catch (error) {
      return res.status(500).send('Erro ao obter notificações do funcionário');
    }
  }

  async enviarMensagemParaFuncionario(req, res) {
    try {
      let mensagem = await notificacaoDao.enviarMensagemParaFuncionario(req);
      return res.json(mensagem);
    } catch (error) {
      return res.status(500).send('Erro ao enviar mensagem para o funcionário');
    }
  }

  async enviarMensagemParaTodos(req, res) {
    try {
      let mensagem = await notificacaoDao.enviarMensagemParaTodos(req);
      return res.json(mensagem);
    } catch (error) {
      return res.status(500).send('Erro ao enviar mensagem para todos os funcionários');
    }
  }
}

module.exports = NotificacaoController;
