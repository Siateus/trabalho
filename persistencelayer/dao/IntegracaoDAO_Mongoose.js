const mongoose = require('mongoose');
const axios = require('axios');
const Integracao = require('../models/Integracao');
const IIntegracaoDAO = require('./IIntegracaoDAO');

class IntegracaoDAO_mongoose extends IIntegracaoDAO {
  constructor() {
    super();
    mongoose.connect('mongodb+srv://matheus62053:pc3123@cluster0.ry71u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  async integrar(req) {
    try {
      const { sistema, dados } = req.body;

      // Exemplo de integração com um sistema externo usando uma API REST
      const response = await axios.post(`https://api.exemplo.com/${sistema}/integracao`, dados);

      // Salvar o resultado da integração no banco de dados
      const novaIntegracao = new Integracao({
        sistema,
        status: response.status === 200 ? 'concluida' : 'falha',
        dataIntegracao: new Date(),
        detalhes: response.data
      });
      await novaIntegracao.save();

      return novaIntegracao;
    } catch (error) {
      throw new Error('Erro ao integrar com o sistema externo');
    }
  }
}

module.exports = IntegracaoDAO_mongoose;
