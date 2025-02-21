const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const IRoutes = require('./IRoutes.js');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

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
        app.use(cors({
            origin: '*',
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
        }));
        app.use(cookieParser());
        app.use(bodyParser.json());
       
          
    }
    

    get() {
        app.get('/', function(req, res) {
            res.send('Rest API SGPT');
        });

        // Rotas protegidas para gestores
        app.get('/api/funcionarios', function(req, res) {
            usuarioController.listarFuncionarios(req, res);
        });
        app.get('/api/funcionarios/:id',  function(req, res) {
            usuarioController.getUsuario(req, res);
        });
        app.get('/api/funcionarios/cargo/:cargo',  function(req, res) {
            usuarioController.listarPorCargo(req, res);
        });
        app.get('/api/notificacoes',  function(req, res) {
            notificacaoController.getNotificacoesGestor(req, res);
        });
        app.get('/api/mensagens/exibir',  function(req, res) {
            mensagemController.listarMensagens(req, res);
        });

        // Rota para deslogar
        app.get('/api/deslogar', function(req, res) {
            authController.deslogar(req, res);
        });



        app.get('/api/perfillogado', function(req, res) {
            usuarioController.getPerfil(req, res);
        });


         // Rotas para funcionários
         app.get('/api/perfil/:id',  function(req, res) {
            usuarioController.getPerfil(req, res);
        });
        app.get('/api/notificacoes/:id', function(req, res) {
            notificacaoController.listarNotificacoes(req, res);
        });
        
        app.get('/api/frequencia/:id', function(req, res) {
            frequenciaController.getFrequenciaById(req, res);
        });

        app.get('/api/frequencia', function(req, res) {
            frequenciaController.getFrequencia(req, res);
        });

            //---------Rotas em construção------------
        /*
        app.get('/relatorios/gerar', function(req, res) {
        relatorioController.getRelatorios(req, res);
        });
        app.get('/integracao', function(req, res) {
        integracaoController.integrar(req, res);
        });*/
    }

    post() {
        app.post('/api/gestores/login', function(req, res) {
            authController.loginGestor(req, res);
        });
        app.post('/api/funcionarios/login', function(req, res) {
              authController.loginFuncionario(req, res);
        });
        app.post('/api/funcionarios/cadastrar', function(req, res) {
            usuarioController.cadastrarFuncionario(req, res);
        });
        app.post('/api/funcionarios/frequencia',  function(req, res) {
            frequenciaController.registrarFrequencia(req, res);
        });
        app.post('/api/mensagens/funcionario/:id',  function(req, res) {
            mensagemController.enviarMensagemParaFuncionario(req, res);
        });
        app.post('/api/mensagens/todos',  function(req, res) {
            notificacaoController.enviarMensagemParaTodos(req, res);
        });
        // ---------------rotas em construção---------------------
        /*app.post('/perfil/imagem', function(req, res) {
            perfilController.adicionarImagemPerfil(req, res);
        });  
        app.post('/api/relatorios',  function(req, res) {
            relatorioController.createRelatorio(req, res);
        });*/
    }
    put() {
        app.put('/api/funcionarios/:id/:idAdm',  function(req, res) {
            usuarioController.editarFuncionario(req, res);
        });
    }

    delete() {
        app.delete('/api/funcionarios/:id/:idAdm', function(req, res) {
            usuarioController.deletarFuncionario(req, res);
        });
        app.delete('/api/mensagens/deletar/:id',  function(req, res) {
            mensagemController.deletarMensagem(req, res);
        });
        app.delete('/api/notificacoes/:id',  function(req, res) {
            notificacaoController.deletarNotificacao(req, res);
        });
    }

    listen() {
        app.listen(3000, '0.0.0.0', function() {
            console.log('servidor iniciado na porta 3000');
        });
    }
}

module.exports = Routes;
