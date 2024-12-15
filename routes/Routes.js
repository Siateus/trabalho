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
let NotificacaoController = require('../controllers/' + config.INotificacaoController);

let authController = new AuthController();
let usuarioController = new UsuarioController();
let relatorioController = new RelatorioController();
let integracaoController = new IntegracaoController();
let frequenciaController = new FrequenciaController();
let perfilController = new PerfilController();
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
    app.get('/', (req, res) => {
      res.send('Rest API SGPT');
    });

    app.get('/gestores/login', (req, res) => authController.loginGestor(req, res));
    app.get('/funcionarios/login', (req, res) => authController.loginFuncionario(req, res));
    app.get('/gestores/usuarios', (req, res) => usuarioController.listarFuncionarios(req, res));
    app.get('/gestores/usuarios/:id', (req, res) => usuarioController.getUsuario(req, res));
    app.get('/gestores/usuarios/cargo/:cargo', (req, res) => usuarioController.listarPorCargo(req, res));
    app.get('/gestores/relatorios', (req, res) => relatorioController.getRelatorios(req, res));
    app.get('/gestores/integracao', (req, res) => integracaoController.integrar(req, res));
    app.get('/gestores/notificacoes', (req, res) => notificacaoController.getNotificacoesGestor(req, res));
    app.get('/funcionarios/frequencia', (req, res) => frequenciaController.getFrequencia(req, res));
    app.get('/funcionarios/perfil', (req, res) => perfilController.getPerfil(req, res));
    app.get('/funcionarios/notificacoes', (req, res) => notificacaoController.getNotificacoesFuncionario(req, res));
  }

  post() {
    app.post('/gestores/usuarios', (req, res) => usuarioController.cadastrarFuncionario(req, res));
    app.post('/gestores/relatorios', (req, res) => relatorioController.createRelatorio(req, res));
    app.post('/gestores/frequencia', (req, res) => frequenciaController.registrarFrequencia(req, res));
    app.post('/funcionarios/perfil/imagem', (req, res) => perfilController.adicionarImagemPerfil(req, res));
    app.post('/gestores/notificacoes/funcionario', (req, res) => notificacaoController.enviarMensagemParaFuncionario(req, res));
    app.post('/gestores/notificacoes/todos', (req, res) => notificacaoController.enviarMensagemParaTodos(req, res));
  }

  put() {
    app.put('/gestores/usuarios/:id', (req, res) => usuarioController.editarFuncionario(req, res));
  }

  delete() {
    app.delete('/gestores/usuarios/:id', (req, res) => usuarioController.deletarFuncionario(req, res));
  }

  listen() {
    app.listen(3000, () => console.log('server iniciado'));
  }
}

module.exports = Routes;
