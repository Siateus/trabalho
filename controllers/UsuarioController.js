const IUsuarioController = require('./IUsuarioController');
const config = require('../config');
const UsuarioDAO = require('../persistencelayer/dao/' + config.IUsuarioDAO);
let usuarioDao = new UsuarioDAO();

class UsuarioController extends IUsuarioController {
  constructor() {
    super();
  }

  async getUsuario(req, res) {
    let user = await usuarioDao.getUsuario(req);
    return res.json(user);
  }

  async cadastrarFuncionario(req, res) {
    let user = await usuarioDao.cadastrarFuncionario(req);
    return res.json(user);
  }

  async listarFuncionarios(req, res) {
    let users = await usuarioDao.listarFuncionarios(req);
    return res.json(users);
  }

  async listarPorCargo(req, res) {
    let users = await usuarioDao.listarPorCargo(req);
    return res.json(users);
  }
  
  async deletarFuncionario(req, res) {
    console.log(`Deleting user with ID: ${req.params.id}` );
    let user = await usuarioDao.deletarFuncionario(req);
    return res.json(user);
  }

  async editarFuncionario(req, res) {
    let user = await usuarioDao.editarFuncionario(req);
    return res.json(user);
  }
}

module.exports = UsuarioController;
