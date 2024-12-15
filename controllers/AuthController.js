const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

module.exports = {
  async loginGestor(req, res) {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ email, tipo: 'gestor' });
    if (!usuario) return res.status(400).send('Gestor não encontrado');

    const senhaValida = await senha === usuario.senha;
    if (!senhaValida) return res.status(400).send('Senha inválida');

    return res.send('Gestor logado');
  },

  async loginFuncionario(req, res) {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ email, tipo: 'funcionario' });
    if (!usuario) return res.status(400).send('Funcionário não encontrado');

    const senhaValida = await senha === usuario.senha;
    if (!senhaValida) return res.status(400).send('Senha inválida');

    return res.send('Funcionário logado');
  }
};
