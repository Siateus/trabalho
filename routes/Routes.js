const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const IRoutes = require('./IRoutes.js');

const app = express();

const config = require('../config.js');
let AuthController = require('../controllers/' + config.IAuthController);
let UsuarioController = require('../controllers/' + config.IUsuarioController);
let RelatorioController = require('../controllers/' + config.IRelatorioController);
let IntegracaoController = require('../controllers/' + config.IIntegracaoController);
let FrequenciaController = require('../controllers/' + config.IFrequenciaController);
let PerfilController = require('../controllers/' + config.IPerfilController);
let MensagemController = require('../controllers/' + config.IMensagemController);
let NotificacaoController = require('../controllers/' + config.INotificacaoController);

let authController = new AuthController();
let usuarioController = new UsuarioController();
let relatorioController = new RelatorioController();
let integracaoController = new IntegracaoController();
let frequenciaController = new FrequenciaController();
let perfilController = new PerfilController();
let mensagemController = new MensagemController();
let notificacaoController = new NotificacaoController();

class Routes extends IRoutes {
  constructor() {
    super();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static('public'));
    app.use(cors());
  }

  get() {
    app.get('/', function(req, res) {
      res.send('Rest API SGPT');
    });

   
    app.get('/gestores/usuarios', function(req, res) {
      usuarioController.listarFuncionarios(req, res);
    });
    app.get('/gestores/usuarios/:id', function(req, res) {
      usuarioController.getUsuario(req, res);
    });
    app.get('/gestores/usuarios/cargo/:cargo', function(req, res) {
      usuarioController.listarPorCargo(req, res);
    });
    app.get('/gestores/notificacoes', function(req, res) {
      notificacaoController.getNotificacoesGestor(req, res);
    });
    app.get('/funcionarios/perfil/:id', function(req, res) {
      usuarioController.getPerfil(req, res);
    });
    app.get('/gestores/perfil/:id', function(req, res) {
      usuarioController.getPerfil(req, res);
    });
    app.get('/funcionarios/notificacoes/:id', function(req, res) {
      notificacaoController.listarNotificacoes(req, res);
    });
    app.get('/gestores/mensagens/exibir', function(req, res) {
      mensagemController.listarMensagens(req, res);
    });
    
    //---------Rotas em construção------------
    /*app.get('/funcionarios/frequencia', function(req, res) {
      frequenciaController.getFrequencia(req, res);
    });
    app.get('/gestores/relatorios/gerar', function(req, res) {
      relatorioController.getRelatorios(req, res);
    });
    app.get('/gestores/integracao', function(req, res) {
      integracaoController.integrar(req, res);
    });*/
  }

  post() {
    app.post('/gestores/login', function(req, res) {
      authController.loginGestor(req, res);
    });
    app.post('/funcionarios/login', function(req, res) {
      authController.loginFuncionario(req, res);
    });
    app.post('/gestores/usuarios', function(req, res) {
      usuarioController.cadastrarFuncionario(req, res);
    });
    app.post('/gestores/relatorios', function(req, res) {
      relatorioController.createRelatorio(req, res);
    });
    app.post('/funcionario/frequencia', function(req, res) {
      frequenciaController.registrarFrequencia(req, res);
    });
    app.post('/gestores/mensagens/funcionario/:id', function(req, res) {
      mensagemController.enviarMensagemParaFuncionario(req, res);
    });
    app.post('/gestores/mensagens/todos', function(req, res) {
      notificacaoController.enviarMensagemParaTodos(req, res);
    });
    
    // ---------------rotas em construção---------------------
    /*app.post('/funcionarios/perfil/imagem', function(req, res) {
    //   perfilController.adicionarImagemPerfil(req, res);
    // }); */  
  }

  put() {
    app.put('/gestores/usuarios/editar/:id', function(req, res) {
      usuarioController.editarFuncionario(req, res);
    });
  }

  delete() {
    app.delete('/gestores/usuarios/deletar/:id', function(req, res) {
      usuarioController.deletarFuncionario(req, res);
    });
    app.delete('/gestores/mensagens/deletar:id', function(req, res) {
      mensagemController.deletarMensagem(req, res);
    });
    app.delete('/gestores/notificacoes/:id', function(req, res) {
      notificacaoController.deletarNotificacao(req, res);
    });
  }

  listen() {
    app.listen(3000, function() {
      console.log('server iniciado');
    });
  }
}

module.exports = Routes;
