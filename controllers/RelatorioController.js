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
      const { tipo, dataInicial, dataFinal } = req.body;
      const relatorio = await relatorioDao.gerarRelatorio({ tipo, dataInicial, dataFinal });
      return res.json(relatorio);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao gerar relatório' });
    }
  }

  async listarRelatorios(req, res) {
    try {
      const relatorios = await relatorioDao.listarRelatorios();
      return res.json(relatorios);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar relatórios' });
    }
  }

  async deletarRelatorio(req, res) {
    try {
      const relatorio = await relatorioDao.deletarRelatorio(req.params.id);
      if (!relatorio) {
        return res.status(404).json({ message: 'Relatório não encontrado' });
      }
      return res.json({ message: 'Relatório deletado com sucesso' });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao deletar relatório' });
    }
  }
}

module.exports = RelatorioController;
