const IAuthController = require('./IAuthController');
const config = require('../config');
const AuthDAO = require('../persistencelayer/dao/' + config.IAuthDAO);
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const NotificacaoController = require('./NotificacaoController');
let authDao = new AuthDAO();

class AuthController extends IAuthController {
  constructor() {
    super();
    this.authDao = new AuthDAO();  // Certifique-se de instanciar o AuthDAO aqui
  }

  // Função para logar o gestor
  async loginGestor(req, res) {
    const result = await this.authDao.logarGestor(req); // Chama a função correta no AuthDAO

    if (result.erro) {
      return res.status(400).json({ message: result.erro });
    }
    
    await NotificacaoController.criarNotificacao(
      result._id,
      'login',
      `Login realizado com sucesso em ${new Date().toLocaleString()}`
    );
    res.status(200).json({ message: 'Login bem-sucedido',
      token: result
    });
  }

  // Função para logar o funcionário
  async loginFuncionario(req, res) {
    const result = await this.authDao.logarFuncionario(req); // Chama a função correta no AuthDAO

    if (result.erro) {
      return res.status(400).json({ message: result.erro });
    }

    // Se o login foi bem-sucedido, retorna o token
    res.cookie('token', result);
    res.status(200).json({ message: 'Login bem-sucedido', token: result });
  }

  // Função para deslogar o usuário
  async deslogar(req, res) {
    res.clearCookie('token');
    res.status(200).json({ message: 'Deslogado com sucesso.' });
  }

   logado(roles = []) {
    return async (req, res, next) => {
      try {
     
        const auth = req.cookies.token || null; // Corrigido para req.cookies.token
        
  
        if (!auth) {
          return res.status(401).json({ message: 'Não autorizado.' });
        }
  
        const Token = await jwt.verify(auth, 'senhaParaProtegerOToken');
  
        if (roles.length && !roles.includes(Token.tipo)) {
          return res.status(403).json({ message: 'Acesso não autorizado.' });
        }
  
        req.user = Token; // Adiciona os dados do token ao objeto de request
        next();
      } catch (err) {
        console.error(err);
        return res.status(403).json({ message: 'Token inválido ou expirado.' });
      }
    };
  }  
  
}

module.exports = AuthController;
