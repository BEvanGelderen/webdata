//mysql analytic shit
var mysql      = require('mysql');
var anaconnection = mysql.createConnection({
  host     : 'localhost',
  database : 'todo',
  user	   : 'root',
  password : 'MarenBerzijnepisch'
});

anaconnection.connect();

module.exports = {

	analyticstuff: function(app){
	app.get('/todolists', function(req, res){
anaconnection.query('SELECT * FROM ToDoList WHERE Owner = 1', function(err, results, fields){
if(err) console.log(err);
console.log(results);
res.json(results);
});
});

app.get('/todoitems', function(req, res){
anaconnection.query('select Id, Title from ToDoItem where ToDoListID=1', function(err, results, fields){
if(err) console.log(err);
console.log(results);
res.json(results);
});
});

app.get('/todoitemslist', function(req, res){
anaconnection.query('select Id, Title from ToDoItem where ToDoListID=1 limit 4,10', function(err, results, fields){
if(err) console.log(err);
console.log(results);
res.json(results);
});
});

app.get('/sortbydate', function(req, res){
anaconnection.query('select Id, Title from ToDoItem where ToDoListID=1 order by CreationDate limit 4,10', function(err, results, fields){
if(err) console.log(err);
console.log(results);
res.json(results);
});
});

app.get('/sortbypriority', function(req, res){
anaconnection.query('select Id, Title from ToDoItem where ToDoListID=1 order by Priority limit 4,10', function(err, results, fields){
if(err) console.log(err);
console.log(results);
res.json(results);
});
});

app.get('/sortbycompletionstatus', function(req, res){
anaconnection.query('select Id, Title from ToDoItem where ToDoListID=1 order by Completed limit 4,10', function(err, results, fields){
if(err) console.log(err);
console.log(results);
res.json(results);
});
});

app.get('/subitems', function(req, res){
anaconnection.query('select Id, Title from ToDoItem where ParentToDo=1', function(err, results, fields){
if(err) console.log(err);
console.log(results);
res.json(results);
});
});

app.get('/tags', function(req, res){
anaconnection.query('select Text from Tag, ItemTag where (ToDoID = 1) and (TagId = Id)', function(err, results, fields){
if(err) console.log(err);
console.log(results);
res.json(results);
});
});

app.get('/itemswithatag', function(req, res){
anaconnection.query('select distinct ToDoList.* from ToDoList, ItemTag, ToDoItem where ItemTag.TagID = 1 and ItemTag.ToDoID = ToDoItem.Id and ToDoItem.ToDoListID = ToDoList.Id', function(err, results, fields){
if(err) console.log(err);
console.log(results);
res.json(results);
});
});

app.get('/status', function(req, res){
anaconnection.query('select ItemTag.TagId, count(ToDoItem.Completed =1) as "number", ToDoItem.Completed from (ToDoItem join ItemTag on ItemTag.ToDoId = ToDoItem.Id) group by ItemTag.TagId, ToDoItem.Completed', function(err, results, fields){
if(err) console.log(err);
console.log(results);
res.json(results);
});
});

app.get('/week', function(req, res){
anaconnection.query('select week(CompletionDate) as done, count(week(CompletionDate))as numberofDone from ToDoItem where (DateDiff(Curdate(), CompletionDate) > 360) group by done', function(err, results, fields){
if(err) console.log(err);
console.log(results);
res.json(results);
});
});

app.get('/completedfastest', function(req, res){
anaconnection.query('select TagId, datediff(CompletionDate, CreationDate) as done from (ToDoItem join ItemTag on ToDoItem.Id = ItemTag.ToDoId) where CompletionDate is not null and TagId = 3 order by done limit 10', function(err, results, fields){
if(err) console.log(err);
console.log(results);
res.json(results);
});
});

app.get('/tagcombinations', function(req, res){
anaconnection.query('select Tag1.TagId as TagId1, Tag2.TagId as TagId2, count(*) as frequency from ItemTag as Tag1 join ItemTag as Tag2 on Tag1.ToDoId = Tag2.ToDoId where Tag1.TagId != Tag2.TagId group by Tag1.TagId, Tag2.TagId', function(err, results, fields){
if(err) console.log(err);
console.log(results);
res.json(results);
});
});

app.get('/completiontime', function(req, res){
anaconnection.query('select avg(datediff(CompletionDate, ToDoItem.CreationDate)) as avgCompletionTime , ToDoList.Name From ToDoItem join ToDoList where ToDoListID = ToDoList.Id group by ToDoListID', function(err, results, fields){
if(err) console.log(err);
console.log(results);
res.json(results);
});
});

	}
};
