const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const IAuthDAO = require('./IAuthDAO');
const Usuario = require('../models/Usuario');
const Auth = require('../models/Auth');
const config = require('../../config');

class AuthDAO_mongoose extends IAuthDAO {
  constructor() {
    super();
    mongoose.connect('mongodb+srv://matheus62053:pc3123@cluster0.ry71u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  async logarGestor(req) {
    const { email, senha } = req.body;
  
    // Verifica se o email e a senha foram fornecidos
    if (!email || !senha) {
      return { erro: 'Dados insuficientes.' };
    }
  
    try {
      // Encontra o gestor com o email e tipo 'gestor'
      const gestor = await Usuario.findOne({ email, tipo: 'gestor' });
  
      // Verifica se o gestor foi encontrado
      if (!gestor) {
        return { erro: 'Usuário ou senha incorretos.' };
      }
  
      // Verifica a senha do gestor
      const auth = await Auth.findOne({ usuario: gestor._id, senha });
  
      // Se a senha estiver incorreta, retorna um erro
      if (!auth) {
        return { erro: 'Usuário ou senha incorretos.' };
      }
  
      // Gera o token com as informações do gestor
      const token = jwt.sign(
        {
          id: gestor._id,
          nome: gestor.nome,
          email: gestor.email,
          tipo: gestor.tipo
        },
        'senhaParaProtegerOToken'// Chave secreta para proteger o token
      );
     
     
      // Retorna o token gerado
      return token;
  
    } catch (error) {
      // Retorna erro em caso de falha na autenticação
      
        console.error('Erro de autenticação:', error);
        return { erro: 'Erro ao autenticar gestor.' };
      
      
    }
  }
  

  async logarFuncionario(req) {
    const { email, senha } = req.body;
  
    // Verifica se o email e a senha foram fornecidos
    if (!email || !senha) {
      return { erro: 'Dados insuficientes.' };
    }
  
    try {
      // Encontra o usuário com o email
      const usuario = await Usuario.findOne({ email });
  
      // Verifica se o usuário foi encontrado
      if (!usuario) {
        return { erro: 'Usuário ou senha incorretos.' };
      }
  
      // Verifica a senha do usuário
      const auth = await Auth.findOne({ usuario: usuario._id, senha });
  
      // Se a senha estiver incorreta, retorna um erro
      if (!auth) {
        return { erro: 'Usuário ou senha incorretos.' };
      }
  
      // Gera o token com as informações do usuário
      const token = jwt.sign(
        {
          id: usuario._id,
          nome: usuario.nome,
          email: usuario.email,
          tipo: usuario.tipo
        },'senhaParaProtegerOToken' // Chave secreta para proteger o token
      );
      
      // Retorna o token gerado
      return token;
  
    } catch (error) {
      // Retorna erro em caso de falha na autenticação
      return { erro: 'Erro ao autenticar usuário.' };
    }
  }
}

module.exports = AuthDAO_mongoose;
