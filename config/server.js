var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

var app = express();

app.set('view engine', 'ejs');

app.set('views', './app/views');

//middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(express.static('./app/public'));

consign({cwd: process.cwd()+"/app"})
	.include('/routes')
	.then('/models')
	.then('/controllers')
	.into(app);

module.exports = app;