'use strict';
var app = require('./config/server');
var http = require('http').Server(app);
var port = (process.env.PORT || 5000);
var io = require('socket.io')(http);

app.listen(port, function(){
	console.log('Servidor Rodando');
});


//transformar a variavel io em global
app.set('io', io);
			
io.set("transports", ["xhr-polling"]); 
io.set("polling duration", 10); 


// criar a conexao do websocket
io.on('connection', (socket) => {
	console.log('usuario conectou');

	socket.on('disconnect', () => {
		console.log('usuario desconectou');
	});

	socket.on('msgParaServidor', (data) => {
		//Dialogo
		socket.emit(
			'msgParaCliente', 
			{apelido: data.apelido, mensagem: data.mensagem}
		);

		socket.broadcast.emit(
			'msgParaCliente', 
			{apelido: data.apelido, mensagem: data.mensagem}
		);

		//participantes
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