var querymod = require("./querymod");

module.exports = {
	template : function(app){
		app.set('views', __dirname + '/template'); 
		app.set('view engine', 'ejs');  
		app.get("/main.html", function (req, res) {
		   	querymod.initialize(res);
		});

	}
}