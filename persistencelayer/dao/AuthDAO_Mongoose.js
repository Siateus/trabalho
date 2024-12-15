const mongoose = require('mongoose');
const IAuthDAO = require('./IAuthDAO');
const Usuario = require('../models/Usuario');
const Auth = require('../models/Auth');

class AuthDAO_mongoose extends IAuthDAO {
  constructor() {
    super();
    mongoose.connect('mongodb+srv://matheus62053:pc3123@cluster0.ry71u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  async loginGestor(req) {
    try {
      let gestor = await Usuario.findOne({ email: req.body.email, tipo: 'gestor' });
      if (!gestor) {
        throw new Error('Gestor não encontrado');
      }
      let auth = await Auth.findOne({ usuario: gestor._id, senha: req.body.senha });
      if (!auth) {
        throw new Error('Senha incorreta');
      }
      return gestor;
    } catch (error) {
      throw new Error('Erro ao autenticar gestor');
    }
  }

  async loginFuncionario(req) {
    try {
      let funcionario = await Usuario.findOne({ email: req.body.email, tipo: 'funcionario' });
      if (!funcionario) {
        throw new Error('Funcionário não encontrado');
      }
      let auth = await Auth.findOne({ usuario: funcionario._id, senha: req.body.senha });
      if (!auth) {
        throw new Error('Senha incorreta');
      }
      return funcionario;
    } catch (error) {
      throw new Error('Erro ao autenticar funcionário');
    }
  }
}

module.exports = AuthDAO_mongoose;
