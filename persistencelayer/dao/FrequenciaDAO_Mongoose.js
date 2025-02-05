const mongoose = require('mongoose');
const Frequencia = require('../models/Frequencia');
const IFrequenciaDAO = require('./IFrequenciaDAO');

class FrequenciaDAO_mongoose extends IFrequenciaDAO {
  constructor() {
    super();
    mongoose.connect('mongodb+srv://matheus62053:pc3123@cluster0.ry71u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  async registrarFrequencia(req) {
    try {
      const novaFrequencia = new Frequencia(req.body);
      await novaFrequencia.save();
      return novaFrequencia;
    } catch (error) {
      throw new Error('Erro ao registrar frequência');
    }
  }

  async getFrequencia(req) {
    try {
      const frequencias = await Frequencia.find();
      return frequencias;
    } catch (error) {
      throw new Error('Erro ao obter frequências');
    }
  }

  async getFrequenciaById(req) {
    
    let frequencias = await Frequencia.find({ funcionario: req.params.id });
    return frequencias;

  }

  async updateFrequencia(req) {
    try {
      const { id } = req.params;
      const frequenciaAtualizada = await Frequencia.findByIdAndUpdate(id, req.body, { new: true });
      if (!frequenciaAtualizada) {
        throw new Error('Frequência não encontrada');
      }
      return frequenciaAtualizada;
    } catch (error) {
      throw new Error('Erro ao atualizar frequência');
    }
  }

  async deleteFrequencia(req) {
    try {
      const { id } = req.params;
      const frequenciaDeletada = await Frequencia.findByIdAndDelete(id);
      if (!frequenciaDeletada) {
        throw new Error('Frequência não encontrada');
      }
      return frequenciaDeletada;
    } catch (error) {
      throw new Error('Erro ao excluir frequência');
    }
  }
}

module.exports = FrequenciaDAO_mongoose;
