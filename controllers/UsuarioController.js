const IUsuarioController = require('./IUsuarioController');
const config = require('../config');
const UsuarioDAO = require('../persistencelayer/dao/' + config.IUsuarioDAO);
let usuarioDao = new UsuarioDAO();

class UsuarioController extends IUsuarioController {
  constructor() {
    super();
  }

  async getPerfil(req, res) {
    try {
      let user = await usuarioDao.getPerfil(req);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao obter usuário' });
    }
  }

  async cadastrarFuncionario(req, res) {
    try {
      let user = await usuarioDao.cadastrarFuncionario(req);
      return res.json({ message: 'Funcionário cadastrado com sucesso', user });
    } catch (error) {
      console.error(error); // Adicionando log de erro para depuração
      return res.status(500).json({ message: 'Erro ao cadastrar funcionário' });
    }
  }

  async listarFuncionarios(req, res) {
    try {
      let users = await usuarioDao.listarFuncionarios(req);
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar funcionários' });
    }
  }

  async listarPorCargo(req, res) {
    try {
      let users = await usuarioDao.listarPorCargo(req);
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar funcionários por cargo' });
    }
  }

  async deletarFuncionario(req, res) {
    try {
      let user = await usuarioDao.deletarFuncionario(req);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      return res.json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao deletar usuário' });
    }
  }

  async editarFuncionario(req, res) {
    try {
      let user = await usuarioDao.editarFuncionario(req);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      return res.json({ message: 'Funcionário atualizado com sucesso', user });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao atualizar funcionário' });
    }
  }
}

module.exports = UsuarioController;
