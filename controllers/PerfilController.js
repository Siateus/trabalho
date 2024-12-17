const IPerfilController = require('./IPerfilController');
const config = require('../config');
const PerfilDAO = require('../persistencelayer/dao/' + config.IPerfilDAO);
let perfilDao = new PerfilDAO();

class PerfilController extends IPerfilController {
  constructor() {
    super();
  }

  async getPerfil(req, res) {
    try {
      let perfil = await perfilDao.getPerfil(req);
      return res.json(perfil);
    } catch (error) {
      return res.status(500).send('Erro ao obter perfil');
    }
  }

  async editarPerfil(req, res) {
    try {
      let perfil = await perfilDao.editarPerfil(req);
      return res.json(perfil);
    } catch (error) {
      return res.status(500).send('Erro ao editar perfil');
    }
  }

  async adicionarImagemPerfil(req, res) {
    try {
      let perfil = await perfilDao.adicionarImagemPerfil(req);
      return res.json({ messagem: 'Imagem de perfil adicionada com sucesso' });
    } catch (error) {
      return res.status(500).send('Erro ao adicionar imagem de perfil');
    }
  }
}

module.exports = PerfilController;
