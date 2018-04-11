module.exports.home = (app, req, res) => {
	res.render("./home/index", {validacao: {}});
}