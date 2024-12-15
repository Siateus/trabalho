const IRelatorioController = require('./IRelatorioController');
const config = require('../config');
const RelatorioDAO = require('../persistencelayer/dao/' + config.IRelatorioDAO);
let relatorioDao = new RelatorioDAO();

class RelatorioController extends IRelatorioController {
  constructor() {
    super();
  }

  async gerarRelatorio(req, res) {
    try {
      let relatorio = await relatorioDao.gerarRelatorio(req);
      return res.json(relatorio);
    } catch (error) {
      return res.status(500).send('Erro ao gerar relatório');
    }
  }

  async createRelatorio(req, res) {
    try {
      let relatorio = await relatorioDao.createRelatorio(req);
      return res.json(relatorio);
    } catch (error) {
      return res.status(500).send('Erro ao criar relatório');
    }
  }

  async getRelatorios(req, res) {
    try {
      let relatorios = await relatorioDao.getRelatorios(req);
      return res.json(relatorios);
    } catch (error) {
      return res.status(500).send('Erro ao obter relatórios');
    }
  }

  async getRelatorioById(req, res) {
    try {
      let relatorio = await relatorioDao.getRelatorioById(req);
      return res.json(relatorio);
    } catch (error) {
      return res.status(500).send('Erro ao obter relatório');
    }
  }

  async updateRelatorio(req, res) {
    try {
      let relatorio = await relatorioDao.updateRelatorio(req);
      return res.json(relatorio);
    } catch (error) {
      return res.status(500).send('Erro ao atualizar relatório');
    }
  }

  async deleteRelatorio(req, res) {
    try {
      let relatorio = await relatorioDao.deleteRelatorio(req);
      return res.json(relatorio);
    } catch (error) {
      return res.status(500).send('Erro ao excluir relatório');
    }
  }
}

module.exports = RelatorioController;
