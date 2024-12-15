const IIntegracaoController = require('./IIntegracaoController');
const config = require('../config');
const IntegracaoDAO = require('../persistencelayer/dao/' + config.IIntegracaoDAO);
let integracaoDao = new IntegracaoDAO();

class IntegracaoController extends IIntegracaoController {
  constructor() {
    super();
  }

  async integrar(req, res) {
    try {
      let resultado = await integracaoDao.integrar(req);
      return res.json(resultado);
    } catch (error) {
      return res.status(500).send('Erro ao integrar com o sistema externo');
    }
  }
}

module.exports = IntegracaoController;
