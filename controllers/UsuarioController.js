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
      if (!validaCPF(req.body.cpf)) {
        return res.status(400).json({ message: 'CPF inválido' });
      }
      if (!validaEmail(req.body.email)) {
        return res.status(400).json({ message: 'E-mail inválido' });
      }
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
function validaEmail(email) {
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  return regex.test(email);
}
function validaCPF(cpf) {
  var Soma = 0
  var Resto

  var strCPF = String(cpf).replace(/[^\d]/g, '')
  
  if (strCPF.length !== 11)
     return false
  
  if ([
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
    ].indexOf(strCPF) !== -1)
    return false

  for (i=1; i<=9; i++)
    Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);

  Resto = (Soma * 10) % 11

  if ((Resto == 10) || (Resto == 11)) 
    Resto = 0

  if (Resto != parseInt(strCPF.substring(9, 10)) )
    return false

  Soma = 0

  for (i = 1; i <= 10; i++)
    Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i)

  Resto = (Soma * 10) % 11

  if ((Resto == 10) || (Resto == 11)) 
    Resto = 0

  if (Resto != parseInt(strCPF.substring(10, 11) ) )
    return false

  return true
}

module.exports = UsuarioController;
