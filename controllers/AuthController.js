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
      const gestor = await authDao.loginGestor(req);
      return res.json({ message: 'Login bem-sucedido', gestor });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async loginFuncionario(req, res) {
    try {
      const usuario = await authDao.loginFuncionario(req);
      return res.json({ message: 'Login bem-sucedido', usuario });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = AuthController;
