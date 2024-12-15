const IAuthController = require('./IAuthController');
const config = require('../config');
const AuthDAO = require('../persistencelayer/dao/' + config.IAuthDAO);
let authDao = new AuthDAO();

class AuthController extends IAuthController {
  constructor() {
    super();
  }

  async loginGestor(req, res) {
    try {
      let gestor = await authDao.loginGestor(req);
      return res.json(gestor);
    } catch (error) {
      return res.status(500).send('Erro ao autenticar gestor');
    }
  }

  async loginFuncionario(req, res) {
    try {
      let funcionario = await authDao.loginFuncionario(req);
      return res.json(funcionario);
    } catch (error) {
      return res.status(500).send('Erro ao autenticar funcionário');
    }
  }
}

module.exports = AuthController;
