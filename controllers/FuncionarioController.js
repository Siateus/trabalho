const mongoose = require('mongoose');
const express = require('express');
const Usuario = require('../models/Usuario');




module.exports = {
  async perfil(req, res) {
    try {
      const usuario = await Usuario.find();
      res.send(usuario);
    } catch (error) {
      res.status(500).send('Erro ao buscar perfil do usuário');
    }
  },

  async registrarPonto(req, res) {
    try {
      const { tipo, dataHora, horaEntrada, horaSaida } = req.body;
      const ponto = new Ponto({
        usuarioId: req.usuarioId,
        tipo,
        dataHora,
        horaEntrada,
        horaSaida,
      });
      await ponto.save();
      res.status(201).send(ponto);
    } catch (error) {
      res.status(500).send('Erro ao registrar ponto');
    }
  },

  async historico(req, res) {
    try {
      const pontos = await Ponto.find({ usuarioId: req.usuarioId });
      res.send(pontos);
    } catch (error) {
      res.status(500).send('Erro ao buscar histórico de pontos');
    }
  }
};

