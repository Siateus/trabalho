const mongoose = require('mongoose');
const IUsuarioDAO = require('./IUsuarioDAO.js');
const Usuario = require('../models/Usuario.js');

class UsuarioDAO_mongoose extends IUsuarioDAO {
  constructor(){
    super();
    mongoose.connect('mongodb+srv://matheus62053:pc3123@cluster0.ry71u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  async getUsuario(req) {
    let user = await Usuario.findById(req.params.id);
    return user;
  }

  async cadastrarFuncionario(req) {
    try {
      const user = await Usuario.create(req.body);
      return user;
    } catch (error) {
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
