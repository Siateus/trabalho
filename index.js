const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); // Corrigir a digitação
const cors = require('cors');

mongoose.connect('mongodb+srv://vaguettilp3:lp320242@cluster0.midlc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { 
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Configuração do Express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());

// Importação dos controladores
const authController = require('./controllers/AuthController');
const funcionarioController = require('./controllers/FuncionarioController');
const notificacaoController = require('./controllers/NotificacaoController');
const adminController = require('./controllers/AdminController');



// Rotas de Autenticação
app.post('/api/login', authController.login);

// Rotas Admin
app.post('/api/admin/cadastrar', adminController.cadastrarFuncionario); 
app.get('/api/admin/listar', adminController.listarFuncionarios); 
app.delete('/api/admin/deletar/:id', adminController.deletarFuncionario); 
app.put('/api/admin/editar/:id', adminController.editarFuncionario);

// Rotas de Funcionário
app.get('/api/funcionario/perfil', funcionarioController.perfil);
app.post('/api/funcionario/ponto', funcionarioController.registrarPonto);
app.get('/api/funcionario/historico', funcionarioController.historico);

// Rotas de Notificações
app.get('/api/funcionario/notificacoes', notificacaoController.notificacoes);

// Rota principal
app.get('/', (req, res) => {
  res.send('Alô REST API!!!!');
});

// Inicialização do servidor
app.listen(3000, () => console.log('Servidor iniciado na porta 3000'));
