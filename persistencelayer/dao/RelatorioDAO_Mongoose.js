const mongoose = require('mongoose');
const IRelatorioDAO = require('./IRelatorioDAO.js');
const Relatorio = require('../models/Relatorio.js');

class RelatorioDAO_mongoose extends IRelatorioDAO {
  constructor(){
    super();
    mongoose.connect('mongodb+srv://matheus62053:pc3123@cluster0.ry71u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  async gerarRelatorio({ tipo, dataInicial, dataFinal }) {
    try {
      const relatorio = new Relatorio({ tipo, dataInicial, dataFinal });
      await relatorio.save();
      return relatorio;
    } catch (error) {
      throw new Error('Erro ao gerar relatório');
    }
  }

  async listarRelatorios() {
    try {
      const relatorios = await Relatorio.find();
      return relatorios;
    } catch (error) {
      throw new Error('Erro ao listar relatórios');
    }
  }

  async deletarRelatorio(id) {
    try {
      const relatorio = await Relatorio.findByIdAndDelete(id);
      return relatorio;
    } catch (error) {
      throw new Error('Erro ao deletar relatório');
    }
  }
}

module.exports = RelatorioDAO_mongoose;
