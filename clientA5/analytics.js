
function main(){

$.getJSON("todolists", function(todo){
	console.log(todo);
	for(var list in todo){
		$(".todolists").prepend("<li>"+todo[list].Name+"</li>");
	}
});

$.getJSON("todoitems", function(todo){
	console.log(todo);
	for(var list in todo){

		$(".todoitems").prepend("<li>"+todo[list].Title+"</li>");
	}
});

$.getJSON("todoitemslist", function(todo){
	console.log(todo);
	for(var list in todo){

		$(".todoitemslist").prepend("<li>"+todo[list].Title+"</li>");
	}
});

$.getJSON("sortbydate", function(todo){
	console.log(todo);
	for(var list in todo){

		$(".sortbydate").append("<li>"+todo[list].Title+"</li>");
	}
});

$.getJSON("sortbypriority", function(todo){
	console.log(todo);
	for(var list in todo){

		$(".sortbypriority").append("<li>"+todo[list].Title+"</li>");
	}
});

$.getJSON("sortbycompletionstatus", function(todo){
	console.log(todo);
	for(var list in todo){

		$(".sortbycompletionstatus").append("<li>"+todo[list].Title+"</li>");
	}
});

$.getJSON("subitems", function(todo){
	console.log(todo);
	for(var list in todo){

		$(".subitems").append("<li>"+todo[list].Title+"</li>");
	}
});

$.getJSON("tags", function(todo){
	console.log(todo);
	for(var list in todo){

		$(".tags").append("<li>"+todo[list].Text+"</li>");
	}
});

$.getJSON("itemswithatag", function(todo){
	console.log(todo);
	for(var list in todo){

		$(".itemswithatag").append("<li>"+todo[list].Name+"</li>");
	}
});

$.getJSON("status", function(todo){
	console.log(todo);
	for(var list in todo){

		$(".status").append("<li>"+todo[list].TagId+" "+todo[list].number+" "+todo[list].Completed+"</li>");
	}
});

$.getJSON("week", function(todo){
	console.log(todo);
	for(var list in todo){

		$(".week").append("<li>"+todo[list].done+" "+todo[list].numberofDone+"</li>");
	}
});

$.getJSON("completedfastest", function(todo){
	console.log(todo);
	for(var list in todo){

		$(".completedfastest").append("<li>"+todo[list].done+"</li>");
	}
});

$.getJSON("tagcombinations", function(todo){
	console.log(todo);
	for(var list in todo){

		$(".tagcombinations").append("<li>("+todo[list].TagId1+"."+todo[list].TagId2+") -"+todo[list].frequency+"</li>");
	}
});

$.getJSON("completiontime", function(todo){
	console.log(todo);
	for(var list in todo){

		$(".completiontime").append("<li>"+todo[list].Name+": "+todo[list].avgCompletionTime+"</li>");
	}
});

}


$(document).ready(main);

