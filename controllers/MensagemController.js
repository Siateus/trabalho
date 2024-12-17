const IMensagemController = require('./IMensagemController');
const MensagemDAO = require('../persistencelayer/dao/MensagemDAO_Mongoose');
let mensagemDao = new MensagemDAO();
const Usuario = require('../persistencelayer/models/Usuario');

class MensagemController extends IMensagemController {
  constructor() {
    super();
  }

  async enviarMensagemParaFuncionario(req, res) {
    try {
      const { conteudo } = req.body;
      const idFuncionario = req.params.id;
      const funcionario = await Usuario.findById(idFuncionario); // Corrigido para usar Usuario.findById
      if (!funcionario) {
        return res.status(404).json({ message: 'Funcionário não encontrado' });
      }
      const novaMensagem = {
        usuario: idFuncionario,
        conteudo,
        tipo: 'funcionario'
      };
      const mensagem = await mensagemDao.enviarMensagem({ body: novaMensagem });
      return res.json(mensagem);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao enviar mensagem para o funcionário' });
    }
  }

  async listarMensagens(req, res) {
    try {
      const mensagens = await mensagemDao.listarMensagens(req);
      return res.json(mensagens);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar mensagens' });
    }
  }

  async deletarMensagem(req, res) {
    try {
      const mensagem = await mensagemDao.deletarMensagem(req);
      if (!mensagem) {
        return res.status(404).json({ message: 'Mensagem não encontrada' });
      }
      return res.json({ message: 'Mensagem deletada com sucesso' });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao deletar mensagem' });
    }
  }
}

module.exports = MensagemController;
