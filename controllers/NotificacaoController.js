const express = require('express');
const router = express.Router();
const Notificacao = require('../models/Notificacao');



module.exports = {
  async notificacoes(req, res) 
  { 
    try { 
      const notificacoes = await Notificacao.find({ usuarioId: req.usuarioId }); 
      res.send(notificacoes); 
    } catch (error) { 
      res.status(500).send('Erro ao buscar notificações'); 
    } 
  }
};
