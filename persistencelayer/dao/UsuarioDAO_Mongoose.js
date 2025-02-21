const mongoose = require('mongoose');
const IUsuarioDAO = require('./IUsuarioDAO.js');
const Usuario = require('../models/Usuario.js');
const Auth = require('../models/Auth.js');
const jwt = require('jsonwebtoken');

class UsuarioDAO_mongoose extends IUsuarioDAO {
  constructor(){
    super();
    mongoose.connect('mongodb+srv://matheus62053:pc3123@cluster0.ry71u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  calcularIdade(dataNascimento) {
    if (!dataNascimento) return null;
    
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    
    // Validate date
    if (isNaN(nascimento.getTime())) {
      throw new Error('Data de nascimento inválida');
    }
    
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    
    return idade;
  }




async getPerfil(userId) { 
  try {
    const usuario = await Usuario.findById(userId);
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    const perfil = {
      nome: usuario.nome,
      cpf: usuario.cpf,
      dataNascimento: usuario.dataNascimento,
      email: usuario.email,
      cargo: usuario.cargo,
      status: usuario.status,
      tipo: usuario.tipo,
      imagemPerfil: usuario.imagemPerfil
    };

    return perfil;
  } catch (error) {
    console.error(error); 
    throw new Error('Erro ao obter perfil');
  }
}
  

async cadastrarFuncionario(dados) {
  try {
    // Calculate age if birth date is provided
    const idade = dados.dataNascimento ? 
      this.calcularIdade(dados.dataNascimento) : 
      null;

    // Create user with calculated age
    const user = await Usuario.create({
      ...dados,
      idade,
      dataCadastro: new Date()
    });

    // Create auth record with default password
    const novoAuth = new Auth({
      usuario: user._id,
      email: user.email,
      senha: '12345678' // Consider using a more secure default or requiring password
    });
    await novoAuth.save();

    return user;

  } catch (error) {
    console.error('Erro no DAO:', error);
    if (error.name === 'ValidationError') {
      throw error; // Let the controller handle mongoose validation errors
    }
    throw new Error(error.message || 'Erro ao cadastrar funcionário');
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
    try {
      // Start a session for transaction
      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        // Find and delete the user
        const user = await Usuario.findById(req.params.id);
        
        if (!user) {
          throw new Error('Usuário não encontrado');
        }

        // Delete the associated auth record
        await Auth.deleteOne({ usuario: user._id });

        // Delete the user
        await Usuario.deleteOne({ _id: user._id });

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        return user;

      } catch (error) {
        // If anything fails, abort the transaction
        await session.abortTransaction();
        session.endSession();
        throw error;
      }
    } catch (error) {
      console.error('Erro ao deletar funcionário:', error);
      throw new Error(error.message || 'Erro ao deletar funcionário');
    }
  }

  // You might also want to update the editarFuncionario method to handle auth updates:
  async editarFuncionario(req) {
    try {
      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        // Update the user
        const user = await Usuario.findByIdAndUpdate(
          req.params.id, 
          req.body, 
          { new: true, session }
        );

        if (!user) {
          throw new Error('Usuário não encontrado');
        }

        // If email was updated, update it in Auth collection too
        if (req.body.email) {
          await Auth.findOneAndUpdate(
            { usuario: user._id },
            { email: req.body.email },
            { session }
          );
        }

        await session.commitTransaction();
        session.endSession();

        return user;

      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
      }
    } catch (error) {
      console.error('Erro ao atualizar funcionário:', error);
      throw new Error(error.message || 'Erro ao atualizar funcionário');
    }
  }
}

module.exports = UsuarioDAO_mongoose;
