module.exports.iniciaChat = (app, req, res) => {
	
	var dadosForm = req.body;

	req.assert('apelido', 'Name or Nickname can not be blank!').notEmpty();
	req.assert('apelido', 'Name or Nickname must be between 3 and 15 characters').len(3, 15);

	var errors = req.validationErrors();

	if(errors) {
		res.render('./home/index', {validacao: errors});
		return;
	};

	app.get('io').emit(
		'msgParaCliente',
		{apelido: dadosForm.apelido, mensagem: ' acabou de entrar no chat!'}
	);

	res.render('./chats/chat', {dadosForm: dadosForm});
}