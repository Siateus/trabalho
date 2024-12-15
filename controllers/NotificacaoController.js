const express = require('express');
const router = express.Router();
const Notificacao = require('../models/Notificacao');



module.exports = {
  async getNotificacoesGestor(req, res) {
    // Lógica para obter notificações recebidas pelo gestor
  },

  async getNotificacoesFuncionario(req, res) {
    // Lógica para obter notificações recebidas pelo funcionário
  }
};

