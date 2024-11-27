const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');




module.exports = {
   async login(req, res) {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(400).send('Usuário não encontrado');

    const senhaValida = await senha === usuario.senha;
    if (!senhaValida) return res.status(400).send('Senha inválida');

    return res.send('logado');
  }
};
