const mongoose = require('mongoose');
const IUsuarioDAO = require('./IUsuarioDAO.js');
const Usuario = require('../models/Usuario.js');
const Auth = require('../models/Auth.js');
const jwt = require('jsonwebtoken');

class UsuarioDAO_mongoose extends IUsuarioDAO {
  constructor(){
    super();
    mongoose.connect('mongodb+srv://matheus62053:pc3123@cluster0.ry71u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  calcularIdade(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  }



async getPerfil(userId) { 
  try {
    const usuario = await Usuario.findById(userId);
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    const perfil = {
      nome: usuario.nome,
      cpf: usuario.cpf,
      dataNascimento: usuario.dataNascimento,
      email: usuario.email,
      cargo: usuario.cargo,
      status: usuario.status,
      tipo: usuario.tipo,
      imagemPerfil: usuario.imagemPerfil
    };

    return perfil;
  } catch (error) {
    console.error(error); 
    throw new Error('Erro ao obter perfil');
  }
}
  

  async cadastrarFuncionario(req) {
    try {
      const idade = this.calcularIdade(req.body.dataNascimento);
      const user = await Usuario.create({ ...req.body, idade });

      // Criar registro de autenticação
      const novoAuth = new Auth({ usuario: user._id, email: user.email, senha: '12345678' });
      await novoAuth.save();

      return user;
    } catch (error) {
      console.error(error); // Adicionando log de erro para depuração
      throw new Error('Erro ao cadastrar funcionário');
    }
  }

  async listarFuncionarios(req) {
    let users = await Usuario.find();
    return users;
  }

  async listarPorCargo(req) {
    let users = await Usuario.find({ cargo: req.params.cargo });
    return users;
  }

  async deletarFuncionario(req) {
    let user = await Usuario.findByIdAndDelete(req.params.id);
    return user;
  }

  async editarFuncionario(req) {
    let user = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return user;
  }
}

module.exports = UsuarioDAO_mongoose;
