const IRelatorioController = require('./IRelatorioController');
const mongoose = require('mongoose');
const Relatorio = require('../models/Relatorio');

class RelatorioController extends IRelatorioController {
  constructor() {
    super();
    mongoose.connect('mongodb+srv://matheus62053:<db_password>@cluster0.ry71u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }
}