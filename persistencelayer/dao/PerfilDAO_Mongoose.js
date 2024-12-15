const mongoose = require('mongoose');
const Usuario = require('../models/Usuario');
const IPerfilDAO = require('./IPerfilDAO');
const fs = require('fs');
const path = require('path');

class PerfilDAO_mongoose extends IPerfilDAO {
  constructor() {
    super();
    mongoose.connect('mongodb+srv://matheus62053:pc3123@cluster0.ry71u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  async getPerfil(req) {
    try {
      const { id } = req.params;
      const perfil = await Usuario.findById(id);
      if (!perfil) {
        throw new Error('Perfil não encontrado');
      }
      return perfil;
    } catch (error) {
      throw new Error('Erro ao obter perfil');
    }
  }

  async editarPerfil(req) {
    try {
      const { id } = req.params;
      const perfilAtualizado = await Usuario.findByIdAndUpdate(id, req.body, { new: true });
      if (!perfilAtualizado) {
        throw new Error('Perfil não encontrado');
      }
      return perfilAtualizado;
    } catch (error) {
      throw new Error('Erro ao editar perfil');
    }
  }

  async adicionarImagemPerfil(req) {
    try {
      const { id } = req.params;
      const { imagemPerfil } = req.files; // Supondo que a imagem seja enviada como um arquivo
      const uploadPath = path.join(__dirname, '../uploads', imagemPerfil.name);

      // Salvar a imagem no sistema de arquivos
      imagemPerfil.mv(uploadPath, async (err) => {
        if (err) {
          throw new Error('Erro ao salvar imagem de perfil');
        }

        // Atualizar o caminho da imagem no banco de dados
        const perfilAtualizado = await Usuario.findByIdAndUpdate(id, { imagemPerfil: uploadPath }, { new: true });
        if (!perfilAtualizado) {
          throw new Error('Perfil não encontrado');
        }
        return perfilAtualizado;
      });
    } catch (error) {
      throw new Error('Erro ao adicionar imagem de perfil');
    }
  }
}

module.exports = PerfilDAO_mongoose;
