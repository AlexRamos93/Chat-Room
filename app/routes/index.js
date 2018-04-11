module.exports = (app) => {
	app.get('/', (req, res) => {
		app.controllers.index.home(app, req, res);
	});
}