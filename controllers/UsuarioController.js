const IUsuarioController = require('./IUsuarioController');
const config = require('../config');
const UsuarioDAO = require('../persistencelayer/dao/' + config.IUsuarioDAO);
let usuarioDao = new UsuarioDAO();
const Auth = require('../persistencelayer/models/Auth.js');
const jwt = require('jsonwebtoken');

class UsuarioController extends IUsuarioController {
  constructor() {
    super();
  }

  async getPerfil(req, res) {
    try {
      let userId;

      if (req.params.id) {
        userId = req.params.id;
      } else {
        const auth = req.cookies.token || null;
        if (!auth) {
          return res.status(401).json({ message: 'Token não fornecido' });
        }
        const Token = jwt.verify(auth, 'senhaParaProtegerOToken');
        userId = Token.id;
      }

      let user = await usuarioDao.getPerfil(userId); // Passe o userId diretamente
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao obter usuário' });
    }
  }
  
  async cadastrarFuncionario(req, res) {
    try {
      // Data validation
      const errors = [];
      
      if (!req.body.cpf) {
        errors.push('CPF é obrigatório');
      } else if (!validaCPF(req.body.cpf)) {
        errors.push('CPF inválido');
      }

      if (!req.body.email) {
        errors.push('Email é obrigatório');
      } else if (!validaEmail(req.body.email)) {
        errors.push('Email inválido');
      }

      if (!req.body.nome || req.body.nome.trim().length === 0) {
        errors.push('Nome é obrigatório');
      }

      if (!req.body.cargo || req.body.cargo.trim().length === 0) {
        errors.push('Cargo é obrigatório');
      }

      // If there are validation errors, return them
      if (errors.length > 0) {
        return res.status(400).json({ 
          message: 'Erros de validação',
          errors: errors 
        });
      }

      // Format the data before sending to DAO
      const funcionarioData = {
        ...req.body,
        nome: req.body.nome.trim(),
        email: req.body.email.toLowerCase().trim(),
        cpf: req.body.cpf.replace(/\D/g, ''),
        dataNascimento: formatarData(req.body.dataNascimento),
        status: req.body.status || 'ativo',
        tipo: req.body.tipo || 'funcionario'
      };

      const user = await usuarioDao.cadastrarFuncionario(funcionarioData);
      return res.json({ 
        message: 'Funcionário cadastrado com sucesso', 
        user 
      });

    } catch (error) {
      console.error('Erro no controller:', error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({ 
          message: 'Erro de validação',
          errors: Object.values(error.errors).map(err => err.message)
        });
      }
      return res.status(500).json({ 
        message: 'Erro ao cadastrar funcionário',
        error: error.message 
      });
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
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

function formatarData(data) {
  if (!data) return null;
  
  // If already a Date object, return it
  if (data instanceof Date) return data;
  
  // If in DD/MM/YYYY format, convert to YYYY-MM-DD
  if (typeof data === 'string') {
    if (data.includes('/')) {
      const [dia, mes, ano] = data.split('/');
      return new Date(ano, mes - 1, dia);
    }
    // Try to parse the date string
    return new Date(data);
  }
  
  return null;
}

module.exports = UsuarioController;
