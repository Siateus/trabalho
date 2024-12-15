const mongoose = require('mongoose');
const Relatorio = require('../models/Relatorio');
const IRelatorioDAO = require('./IRelatorioDAO');

class RelatorioDAO_mongoose extends IRelatorioDAO {
  constructor() {
    super();
    mongoose.connect('mongodb+srv://matheus62053:pc3123@cluster0.ry71u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  async gerarRelatorio(req) {
    try {
      const { filtro } = req.body;
      const relatorios = await Relatorio.find(filtro);
      const relatorioGerado = processarRelatorios(relatorios);
      return relatorioGerado;
    } catch (error) {
      throw new Error('Erro ao gerar relatório');
    }
  }

  async createRelatorio(req) {
    try {
      const { titulo, conteudo, criadoPor } = req.body;
      const novoRelatorio = new Relatorio({ titulo, conteudo, criadoPor });
      await novoRelatorio.save();
      return novoRelatorio;
    } catch (error) {
      throw new Error('Erro ao criar relatório');
    }
  }

  async getRelatorios() {
    try {
      const relatorios = await Relatorio.find();
      return relatorios;
    } catch (error) {
      throw new Error('Erro ao obter relatórios');
    }
  }

  async getRelatorioById(req) {
    try {
      const { id } = req.params;
      const relatorio = await Relatorio.findById(id);
      if (!relatorio) {
        throw new Error('Relatório não encontrado');
      }
      return relatorio;
    } catch (error) {
      throw new Error('Erro ao obter relatório');
    }
  }

  async updateRelatorio(req) {
    try {
      const { id } = req.params;
      const { titulo, conteudo } = req.body;
      const relatorioAtualizado = await Relatorio.findByIdAndUpdate(id, { titulo, conteudo }, { new: true });
      if (!relatorioAtualizado) {
        throw new Error('Relatório não encontrado');
      }
      return relatorioAtualizado;
    } catch (error) {
      throw new Error('Erro ao atualizar relatório');
    }
  }

  async deleteRelatorio(req) {
    try {
      const { id } = req.params;
      const relatorioDeletado = await Relatorio.findByIdAndDelete(id);
      if (!relatorioDeletado) {
        throw new Error('Relatório não encontrado');
      }
      return 'Relatório excluído com sucesso';
    } catch (error) {
      throw new Error('Erro ao excluir relatório');
    }
  }
}

// Função auxiliar para processar relatórios (exemplo)
function processarRelatorios(relatorios) {
  const totalRelatorios = relatorios.length;
  const somaValores = relatorios.reduce((soma, relatorio) => soma + relatorio.valor, 0);
  const mediaValores = somaValores / totalRelatorios;

  // Adicionar a média calculada a cada relatório
  const relatoriosProcessados = relatorios.map(relatorio => ({
    ...relatorio._doc, // Inclui todos os campos do relatório original
    mediaValores // Adiciona o campo de média calculada
  }));

  return relatoriosProcessados; // Retorna os relatórios processados
}

module.exports = RelatorioDAO_mongoose;
