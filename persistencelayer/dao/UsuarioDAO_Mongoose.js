const mongooose = require('mongoose');
const Usuario = require('./models/Usuario');
const IUsuarioDAO = require('./IUsuarioDAO');


class UsuarioDAO_mongoose extends IUsuarioDAO {
  constructor(){
    super();
    mongooose.connect('mongodb+srv://matheus62053:<db_password>@cluster0.ry71u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  async getUsuario(req) {
      let user = await Usuario.findById(req.params.id);
      return user;
  }
  
  async cadastrarFuncionario(req) {
    try {
      const user = await Usuario.create(req.body);
      return user;
    } catch (error) {
      res.status(500).send('Erro ao cadastrar funcionário');
    }
  }

  async listarFuncionarios(req) {
    let users = await Usuario.find();
    return users;
  }
  async listarPorCargo(req) {
    let users = await Usuario.find({ cargo: req.params.cargo });
    return users;
  }

  async deletarFuncionario(req) {
    let user = await Usuario.findByIdAndRemove(req.params.id);
    return res.json(user);
  }

  async editarFuncionario(req) {
    let user = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json(user);
  }

} 
module.exports = UsuarioDAO_mongoose;