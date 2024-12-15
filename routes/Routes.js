
const express = require('express');
const bodyParser = require('body-parser');
//================================

var cors = require('cors');
const IRoutes = require('./IRoutes.js');
const app = express();


// Importação dos controladores
const authController = require('./controllers/AuthController');
const usuarioController = require('./controllers/UsuarioController');
const relatorioController = require('./controllers/RelatorioController');
const integracaoController = require('./controllers/IntegracaoController');
const frequenciaController = require('./controllers/FrequenciaController');
const perfilController = require('./controllers/PerfilController');
const notificacaoController = require('./controllers/NotificacaoController');



class Routes extends IRoutes{

  constructor() {   
    super();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));  
} // finaliza construtor

  get(){
    
    // Rotas de Gestor
    app.get('/gestores/usuarios', usuarioController.getAllUsuarios);
    app.get('/gestores/usuarios/:id', usuarioController.getUsuarioById);
    app.put('/gestores/usuarios/:id', usuarioController.updateUsuario);
    app.delete('/gestores/usuarios/:id', usuarioController.deleteUsuario);
    app.get('/gestores/frequencia', frequenciaController.getFrequencia);
    app.get('/gestores/relatorios', relatorioController.getRelatorios);
    app.post('/gestores/relatorios', relatorioController.createRelatorio);
   
    app.get('/gestores/integracao/status', integracaoController.getStatus);
    app.get('/gestores/notificacoes', notificacaoController.getNotificacoesGestor);

    // Rotas de Funcionário
    
    app.get('/funcionarios/perfil/:id', perfilController.getPerfil);
    app.put('/funcionarios/perfil/:id', perfilController.updatePerfil);
    app.get('/funcionarios/notificacoes', notificacaoController.getNotificacoesFuncionario);

    // Rota principal
    app.get('/', (req, res) => {
      res.send('Alô REST API!!!!');
    });


  }
  post(){
    // Rotas de Autenticação
    app.post('/gestores/login', authController.loginGestor);
    app.post('/funcionarios/login', authController.loginFuncionario);

    // Rotas de Gestor
    app.post('/gestores/usuarios', usuarioController.createUsuario);
    app.post('/gestores/integracao', integracaoController.integrar);

    // Rotas de Funcionário
    app.post('/funcionarios/frequencia', frequenciaController.registrarFrequencia);

  }

  listen(){
    // Inicialização do servidor
    app.listen(3000, () => console.log('Servidor iniciado na porta 3000'));
     }

}
module.exports = Routes;
