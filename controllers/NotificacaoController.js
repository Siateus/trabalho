
const INotificacaoController = require('./INotificacaoController');
const config = require('../config');
const NotificacaoDAO = require('../persistencelayer/dao/' + config.INotificacaoDAO);

const notificacaoDao = new NotificacaoDAO();

class NotificacaoController extends INotificacaoController {
  constructor() {
    super();
    this.notificacaoDao = new NotificacaoDAO();

  }
  async listarNotificacoes(req, res) {
    try {
      const notificacoes = await notificacaoDao.listarNotificacoes(req.params.id);
      res.json(notificacoes);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao listar notificações' });
    }
  }

  async criarNotificacao(usuarioId, tipo, mensagem) {
    try {
      await notificacaoDao.criarNotificacao({
        usuario: usuarioId,
        tipo,
        mensagem
      });
    } catch (error) {
      console.error('Erro ao criar notificação:', error);
    }
  }

  async marcarComoLida(req, res) {
    try {
      await notificacaoDao.marcarComoLida(req.params.id);
      res.json({ message: 'Notificação marcada como lida' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao marcar notificação como lida' });
    }
  }
}

module.exports = new NotificacaoController();
