const mongoose = require('mongoose');
const admin = require('../models/Admin');
const Usuario = require('../models/Usuario');

module.exports = {
  async cadastrarFuncionario(req, res) {
    try {
      const user = await Usuario.create(req.body);
      res.json(user);
    } catch (error) {
      res.status(500).send('Erro ao cadastrar funcionário');
    }
  },

  async listarFuncionarios(req, res) {
    let users = await Usuario.find();
    return res.json(users);
  },

  async deletarFuncionario(req, res) {
    let user = await Usuario.findByIdAndRemove(req.params.id);
    return res.json(user);
  },

  async editarFuncionario(req, res) {
    let user = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json(user);
  }
};
