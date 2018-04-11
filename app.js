'use strict';
var app = require('./config/server');
var http = require('http').Server(app);
var port = (process.env.PORT || 5000);
var io = require('socket.io')(http);

app.listen(port, function(){
	console.log('Servidor Rodando');
});


//MAKES  IO A GLOBAL VAR
app.set('io', io);
			
io.set("transports", ["xhr-polling"]); 
io.set("polling duration", 10); 


// CREATES A WEBSOCKET CONNECTION
io.on('connection', (socket) => {
	console.log('user is connected');

	socket.on('disconnect', () => {
		console.log('user is desconnected');
	});

	socket.on('msgParaServidor', (data) => {
		//MESSAGES
		socket.emit(
			'msgParaCliente', 
			{apelido: data.apelido, mensagem: data.mensagem}
		);

		socket.broadcast.emit(
			'msgParaCliente', 
			{apelido: data.apelido, mensagem: data.mensagem}
		);

		//USERS
		if(parseInt(data.apelido_atualizado_nos_clientes) == 0) {
			socket.emit(
				'participantesParaCliente', 
				{apelido: data.apelido}
			);

			socket.broadcast.emit(
				'participantesParaCliente', 
				{apelido: data.apelido}
			);
		}
	});
});