//mysql shit
var mysql      = require('mysql');
var server 	= require('./dataserverA5');
var url = require("url");
var connection = mysql.createConnection({
  host     : 'localhost',
  database : 'doit',
  user	   : 'root',
  password : 'webdata'
});
var jsonresponse;


connection.connect();

module.exports={
refjson: function(){
	return jsonresponse;
},
onAddtodo: function(app){
	app.get('/addtodo', function(req, res){
		var query = url.parse(req.url, true).query;
		console.log(server.numberOfTodos);
		var sqlquery = 'INSERT INTO ToDoItem(Id, todo, duedate, Priority) VALUES ("'+server.numberOfTodos+'","'+query["todo"]+'","'+query["duedate"]+'","'+query["priority"]+'")';
		connection.query(sqlquery, function(error){
			if(error)console.log(error);
			});	
		server.numberOfTodos++;
		res.redirect("/main.html");
		});
	},
onEdittodo: function(app){
	app.get('/edittodo', function(req, res){
	  	var query = url.parse(req.url, true).query;
	  	var pre = (query["priority"] === "high");
	   	var sqlquery = 'UPDATE ToDoItem SET todo = "'+query["todo"] +'", duedate = "'+query["duedate"]+'", priority="'+pre+'" WHERE Id = ' + parseInt(query["id"]) + '';
	  	console.log(query);
	  	connection.query(sqlquery, function(error){
			if(error)console.log(error);
			});	
	  	res.redirect("/main.html");
		});
	},

onDeletetodo: function(app){
	app.get('/deletetodo', function(req, res){
	  var query = url.parse(req.url, true).query;
	  var sqlquery = 'DELETE FROM ToDoItem WHERE Id = '+ query["id"];
	  console.log(sqlquery);
	  connection.query(sqlquery, function(error){
		if(error)console.log(error);
		});	
	  res.redirect("/main.html");
	  });
	},

refresh: function(res){
	connection.query('SELECT Id, todo, duedate, priority FROM ToDoItem', function(err, results, fields){
		jsonresponse = JSON.stringify(results)
		jsonresponse = JSON.parse(jsonresponse);
		for(var todo in jsonresponse){
			jsonresponse[todo].priority = (jsonresponse[todo].priority == 'true');
		};
		server.numberOfTodos = jsonresponse[jsonresponse.length-1].Id+1;
		res.json(jsonresponse);
	});
},
initialize: function(res){
	connection.query('SELECT Id, todo, duedate, priority FROM ToDoItem', function(err, results, fields){
		jsonresponse = JSON.stringify(results)
		jsonresponse = JSON.parse(jsonresponse);
		for(var todo in jsonresponse){
			jsonresponse[todo].priority = (jsonresponse[todo].priority == 'true');
		};
		server.numberOfTodos = jsonresponse[jsonresponse.length-1].Id+1;
		res.render('todotemplate', {todo_array: jsonresponse});
	});
	;
}


};