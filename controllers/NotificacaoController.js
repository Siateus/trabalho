const INotificacaoController = require('./INotificacaoController');
const config = require('../config');
const NotificacaoDAO = require('../persistencelayer/dao/' + config.INotificacaoDAO);
let notificacaoDao = new NotificacaoDAO();

class NotificacaoController extends INotificacaoController {
  constructor() {
    super();
  }

  async criarNotificacao(req, res) {
    try {
      let notificacoes = await notificacaoDao.criarNotificacao(req);
      return res.json(notificacoes);
    } catch (error) {
      return res.status(500).send('Erro ao obter notificações do gestor');
    }
  }

  async listarNotificacoes(req, res) {
    try {
      let notificacoes = await notificacaoDao.listarNotificacoes(req);
      return res.json(notificacoes);
    } catch (error) {
      return res.status(500).send('Erro ao listar notificações do funcionário');
    }
  }
  async deletarNotificacao(req, res) {
    try {
      let notificacoes = await notificacaoDao.deletarNotificacao(req);
      return res.json(notificacoes);
    } catch (error) {
      return res.status(500).send('Erro ao deletar notificações do funcionário');
    }
  }
}

module.exports = NotificacaoController;
