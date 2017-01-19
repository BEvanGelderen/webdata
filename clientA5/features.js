var todosSort=[];
var todos = [];
var content;
var idHolder;

function todo(todo, duedate, id, priority){
	this.todo = todo;
	this.duedate = duedate;
	this.priority = priority;
	this.id = id
	if(priority){
		this.html = '<li class="todo" id="'+ id+ '" datetime="'+duedate+'">'+todo+'<input type="checkbox" class="done"><img src="img/star2_bright.png" class="star"></li><button class="delete"> Delete</button><button class="edit">Edit</button><time>'+duedate+'</time>'
	}
	else{
		this.html = '<li class="todo" id="'+ id+ '" datetime="'+duedate+'">'+todo+'<input type="checkbox" class="done"><img src="img/star_bright_empty.png" class="emptyStar"></li><button class="delete"> Delete</button><button class="edit">Edit</button><time>'+duedate+'</time>'
	}
}

function edit(){
	console.log(todos);
	todos[idHolder].todo = ""; 
	console.log(todos);
	
	$(".delete").hide();
	$(".edit").hide();
	$("time").hide();

}

function compare(array, obj2){
	for(var obj1 in array){
	if(array[obj1].todo === obj2.todo) return false; }
	return true;
}

function update(){
	$.getJSON("todos.json", function(todoos){
	for(var object in todoos){
	if(compare(todos, todoos[object])){
	add(todoos[object].todo, todoos[object].duedate, (todoos[object].priority), todoos[object].Id);}
	}
		
	});
}

function add($todo, $date, priority, id){
	todos[id]= new todo($todo, $date, id, priority);
		console.log(todos);
	if(priority){
		$("#high").prepend(todos[id].html);
	}
	else{
		$("#low").prepend(todos[id].html);

	}
	$(".delete").hide();
	$(".edit").hide();
	$("time").hide();
}


function main(){
$.getJSON("todos.json", function(todoos){
	for(var object in todoos){
		todos[todoos[object].Id]= new todo(todoos[object].todo, todoos[object].duedate, todoos[object].Id, (todoos[object].priority));
	}
		
	});
$(".h-input").hide();
$(".l-input").hide();
$(".delete").hide();
$(".edit").hide();
$("time").hide();


$(document).on("click", ".h-plus", function(){
		$(".h-input").slideToggle(400);
	if($(this).html() === '<img src="img/plus.png">'){
		$(this).html("back <--");
	}
	else{
		$(this).html('<img src="img/plus.png">');
	}
	});

$(document).on("click", ".l-plus", function(){
		$(".l-input").slideToggle(400);
	if($(this).html() === '<img src="img/plus.png">'){
		$(this).html("back <--");
	}
	else{
		$(this).html('<img src="img/plus.png">');
	}
});

$(document).on("click",".todo", function(){
	$(this).next().slideToggle(400);
	$(this).next().next().slideToggle(400);
	$(this).next().next().next().slideToggle(400)


});

$(document).on("click", ".delete", function(){
	idHolder = $(this).prev().attr("id");
	todos.splice(idHolder, 1); 
	console.log(idHolder);
	$(this).next().remove();
	$(this).next().remove();
	$(this).prev().remove();
	$(this).remove();
	window.location.href = "/deletetodo?id="+idHolder;

});

$(document).on("click", ".edit", function(){
	var todoChange = $(this).prev().prev().text();
	var todoDate = $(this).next().text();
	var correctDate
	idHolder = $(this).prev().prev().attr("id");
	$(this).prev().remove();
	$(this).prev().remove();
	$(this).next().remove();
	correctDate = todoDate;
	$(this).before('<input type="text" id="edittext" class="h-input" value="'+todoChange+'"><br/> <input type="date" id="editdate" class="h-input" value="'+correctDate+'"><br/><button id="editplus" class="h-input">edit</button>');
	$(this).remove();
});

$(document).on("click", "#editplus", function(){
	var $todo = $("#edittext").val();
	var $date = $('#editdate').val();
	var priority = $(this).parent("ul").attr("id");
	$(this).prev().remove();
	$(this).prev().remove();
	$(this).prev().remove();
	$(this).prev().remove();
	$(this).remove();
	console.log("/edittodo?todo="+$todo+"&duedate="+$date+"&priority="+priority+"&id="+idHolder);
	edit();
	window.location.href = "/edittodo?todo="+$todo+"&duedate="+$date+"&priority="+priority+"&id="+idHolder;
});

$(document).on("click", "#highbutton", function(){
	var $todo = $("#highplus").val();
	var $date = $('#highdate').val();
	window.location.href = "/addtodo?todo="+$todo+"&duedate="+$date+"&priority="+true;

});

$(document).on("click", "#lowbutton", function(){
	var $todo = $("#lowplus").val();
	var $date = $('#lowdate').val();
	window.location.href = "/addtodo?todo="+$todo+"&duedate="+$date+"&priority="+false;
});

$(document).on("click", ".done", function(){
	var $todo = $(this).closest("li").html();
	$(this).closest("li").html("<s>"+$todo+"</s>");
	$(this).prop("checked", true);
});

$(document).on("click", ".star", function(){
	idHolder = $(this).parent().attr("id");
	$(this).next().remove();
	$(this).next().remove();
	$(this).next().remove();
	$(this).closest("li").remove();
	$(".delete").hide();
	$(".edit").hide();
	$("time").hide();
	window.location.href = "/edittodo?todo="+todos[idHolder].todo+"&duedate="+todos[idHolder].duedate+"&priority="+"low"+"&id="+idHolder;
	edit();
});

$(document).on("click", ".emptyStar", function(){
	idHolder = $(this).parent().attr("id");
	todos[idHolder].priority = true;
	$(this).next().remove();
	$(this).next().remove();
	$(this).next().remove();
	$(this).closest("li").remove();
	$(".delete").hide();
	$(".edit").hide();
	$("time").hide();
	window.location.href = "/edittodo?todo="+todos[idHolder].todo+"&duedate="+todos[idHolder].duedate+"&priority="+"high"+"&id="+idHolder;
	edit();
});

// $(document).on("click", "#sortDate", function(){
	
// 	todos.sort(function(a, b){

// 		var aDate = a.duedate;
// 		var bDate = b.duedate;
// 		if(aDate>bDate){
// 			return -1;
// 		}
// 		else if(bDate === aDate){
// 			return 0
// 		}
// 		else{
// 			return 1
// 		}
// 	})
	
// 	var todoString = "<h1>Todo's</h1><ul>"
// 	for(var i = 0; i< numberOfTodos; i++){
// 		todoString = todoString+ todos[i].html;

// 	}
// 	todoString = todoString + '</ul>'
// 	 content = $(".content").html();
// 	$(".content").html(todoString);
// 	$(".delete").hide();
// 	$(".edit").hide();

// });

$(document).on("click","#backToNormal", function(){
	$(".content").html(content);
	});

update();
setInterval(function(){update();}, 2000);

}


$(document).ready(main);

