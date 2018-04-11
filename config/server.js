var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

var app = express();
//agora o ejs é responsavel pela engine de views
app.set('view engine', 'ejs');
//mudando onde procurar o dir das views
app.set('views', './app/views');

//middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(express.static('./app/public'));

//O consign procura todas as rotas na pasta routes, e executa a dbConnection, e executa todos os models e inclui na variavel app.
consign({cwd: process.cwd()+"/app"})
	.include('/routes')
	//.then('./config/dbConnection.js')
	.then('/models')
	.then('/controllers')
	.into(app);

module.exports = app;