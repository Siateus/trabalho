const IFrequenciaController = require('./IFrequenciaController');
const config = require('../config');
const FrequenciaDAO = require('../persistencelayer/dao/' + config.IFrequenciaDAO);
let frequenciaDao = new FrequenciaDAO();

class FrequenciaController extends IFrequenciaController {
  constructor() {
    super();
  }

  async registrarFrequencia(req, res) {
    try {
      let frequencia = await frequenciaDao.registrarFrequencia(req);
      return res.json(frequencia);
    } catch (error) {
      return res.status(500).send('Erro ao registrar frequência');
    }
  }

  async getFrequencia(req, res) {
    try {
      let frequencias = await frequenciaDao.getFrequencia(req);
      return res.json(frequencias);
    } catch (error) {
      return res.status(500).send('Erro ao obter frequências');
    }
  }

  async getFrequenciaById(req, res) {
    try {
      let frequencia = await frequenciaDao.getFrequenciaById(req);
      return res.json(frequencia);
    } catch (error) {
      return res.status(500).send('Erro ao obter frequência');
    }
  }

  async updateFrequencia(req, res) {
    try {
      let frequencia = await frequenciaDao.updateFrequencia(req);
      return res.json(frequencia);
    } catch (error) {
      return res.status(500).send('Erro ao atualizar frequência');
    }
  }

  async deleteFrequencia(req, res) {
    try {
      let frequencia = await frequenciaDao.deleteFrequencia(req);
      return res.json(frequencia);
    } catch (error) {
      return res.status(500).send('Erro ao excluir frequência');
    }
  }
}

module.exports = FrequenciaController;
