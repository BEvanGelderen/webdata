var http = require("http");
var express = require("express");
var fs = require("fs");
var passport = require("passport");
var querymod = require("./querymod");
var analyticsmod = require("./analyticsmod");
var tempmod = require("./tempmod");

var jsonresponse;
var numberOfTodos = 0;
var _this = this;

module.exports.numberOfTodos = numberOfTodos;

var app = express();

app.use(passport.initialize());
app.use(passport.session());
app.use('/', express.static(__dirname + '/clientA5'));
app.use('/main.html', express.static(__dirname + '/clientA5/main.html'));
app.use('/analytics', express.static(__dirname + '/clientA5/analytics.html'));
app.get('m+a+i+n+.*', function(req, res){
	res.redirect('/main.html');
});

app.get("/todos.json", function(req, res){
		querymod.refresh(res);
});

tempmod.template(app);
querymod.onAddtodo(app);
querymod.onEdittodo(app);
querymod.onDeletetodo(app);
analyticsmod.analyticstuff(app);


http.createServer(app).listen(1337);
