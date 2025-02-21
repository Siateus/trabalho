const IUsuarioController = require('./IUsuarioController');
const config = require('../config');
const UsuarioDAO = require('../persistencelayer/dao/' + config.IUsuarioDAO);
const NotificacaoController = require('./NotificacaoController');
const notificacaoController = new NotificacaoController();
let usuarioDao = new UsuarioDAO();
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
          const { id } = req.params;

          console.log('Tentando deletar funcionário com ID:', id); // Debug

          // Verificar se o ID é válido
          if (!id) {
              return res.status(400).json({
                  success: false,
                  message: 'ID do funcionário não fornecido'
              });
          }

          // Verificar se o funcionário existe
          const funcionario = await Usuario.findById(id);
          if (!funcionario) {
              return res.status(404).json({
                  success: false,
                  message: 'Funcionário não encontrado'
              });
          }

          // Primeiro tentar deletar a autenticação
          try {
              await Auth.findOneAndDelete({ usuario: id });
          } catch (authError) {
              console.error('Erro ao deletar autenticação:', authError);
              // Continuar mesmo se falhar a deleção da auth
          }

          // Deletar o usuário
          const usuarioDeletado = await Usuario.findByIdAndDelete(id);
          if (!usuarioDeletado) {
              return res.status(404).json({
                  success: false,
                  message: 'Erro ao deletar usuário'
              });
          }

          // Criar notificação
          try {
              await notificacaoController.criarNotificacao(
                  id,
                  'exclusao',
                  `O funcionário ${funcionario.nome} foi removido do sistema.`
              );
          } catch (notifError) {
              console.error('Erro ao criar notificação:', notifError);
              // Continuar mesmo se falhar a criação da notificação
          }

          return res.status(200).json({
              success: true,
              message: 'Funcionário deletado com sucesso'
          });

      } catch (error) {
          console.error('Erro ao deletar funcionário:', error);
          return res.status(500).json({
              success: false,
              message: 'Erro interno ao deletar funcionário',
              error: error.message
          });
      }
  }

async editarFuncionario(req, res) {
  try {
    console.log(req.body);
    console.log(req.params.id);
    console.log(req.params.idAdm);
      // Busca o administrador que está realizando a ação
      let Adm = await usuarioDao.getPerfil(req.params.idAdm);
      if (!Adm) {
          return res.status(403).json({ message: 'Administrador não encontrado ou sem permissão' });
      }
      
      // Edita os dados do funcionário
      let user = await usuarioDao.editarFuncionario(req.params.id, req.body);
      if (!user) {
          return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      console.log(user);
      // Cria a notificação de alteração
    
      await notificacaoController.criarNotificacao(
          user._id,
          'alteracao',
          `O funcionário ${user.nome} teve seus dados atualizados.`
      );

      return res.json({ message: 'Funcionário atualizado com sucesso', user });
  } catch (error) {
      return res.status(500).json({ message: 'Erro ao atualizar funcionário', error: error.message });
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
