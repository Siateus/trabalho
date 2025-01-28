const config = {
  "IRoutes": "Routes.js",
  "IAuthController": "AuthController.js",
  "IUsuarioController": "UsuarioController.js",
  "IRelatorioController": "RelatorioController.js",
  "IIntegracaoController": "IntegracaoController.js",
  "IFrequenciaController": "FrequenciaController.js",
  "IPerfilController": "PerfilController.js",
  "INotificacaoController": "NotificacaoController.js",
  "IMensagemController": "MensagemController.js",
  "IUsuarioDAO": "UsuarioDAO_Mongoose.js",
  "IRelatorioDAO": "RelatorioDAO_Mongoose.js",
  "IIntegracaoDAO": "IntegracaoDAO_Mongoose.js",
  "IFrequenciaDAO": "FrequenciaDAO_Mongoose.js",
  "INotificacaoDAO": "NotificacaoDAO_Mongoose.js",
  "IAuthDAO": "AuthDAO_Mongoose.js",
  "IPerfilDAO": "PerfilDAO_Mongoose.js",
  "IMensagemDAO": "MensagemDAO_Mongoose.js",
  "secretKey": process.env.JWT_SECRET_KEY || "defaultSecretKey"  // Definindo a chave secreta do JWT
};

module.exports = config;
