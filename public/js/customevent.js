$(document).ready(toDoFeature);

function toDoFeature(){
	var $buttonAddTask = $("#button-add-task");
	var $buttonDeleteTasksChecked = $("#button-delete-tasks-checked");
	var $textboxTask  = $("#textbox-task");
	var $listTasks = $("#list-tasks");
	var KEY_ENTER = 13;
	var index = 0;

	$buttonAddTask.click(toTriggerAddTask);
	$buttonDeleteTasksChecked.click(toTriggerDeleteTasksChecked);
	$textboxTask.keypress(enterToTriggerButtonAddTask);

	function toTriggerAddTask(){
		if($textboxTask.val() == ""){
	      alert("Please type task on textbox");
	      $textboxTask.focus();
	      return false;
	    }
		var action = {
			description: $textboxTask.val(),
			type_action: 'added task',
			activation_time: new Date()
		};
		
		$listTasks.trigger("task:add", action);
	};

	function toTriggerDeleteTasksChecked(){
		$(".delete").each(function deleteTasksChecked(){
	        if($(this).is(":checked")){
	        	var action = {
	        		description: $(this).parent().find("span").text(),
	        		task: $(this).parent(),
	        		type_action: 'deleted task',
	        		activation_time: new Date()
	        	}
	        	$listTasks.trigger("task:delete", action);
	        }
	    });
	};

	function enterToTriggerButtonAddTask(event){
		var isPressedEnter = event.which == KEY_ENTER;
		if(!isPressedEnter){
			return;
		}
		$buttonAddTask.trigger("click");
	};		

  	// listen event

  	$listTasks.on("task:add", addTaskToList);
  	$listTasks.on("task:delete", deleteTaskFromList);

  	function addTaskToList(event, action){
		index += 1;
	    $(this).prepend(
	    		"<a href='#' class='list-group-item'>"+
					"<input type='checkbox' class='delete'>"+
					"<span>"+action.description+"</span>"+
					"<button class='pull-right btn-default'>X</button>"+
				"</a>"
	    	);

	    var $newItem = $("#list-tasks a:first-child");

	    $newItem.find("button").click(toTriggerDeleteTask);
	    $newItem.find("input").change(doneTask);
	    $textboxTask.val("");
	    $textboxTask.focus();

		postAction(action);
	};

	function toTriggerDeleteTask(){
		var action = {
		description: $(this).parent().find("span").text(),
		task: $(this).parent(),
		type_action: 'deleted task',
		activation_time: new Date()
		}
		$listTasks.trigger("task:delete", action);
	}

	function deleteTask(){
    	$(this).parent().remove();
	};

  	function doneTask(){
  		var $task = $(this).parent().find("span");
  		var action = null;
    	if($(this).is(":checked")) {
    	    $task.addClass("done");
    	    action = {
    	    	description: $task.text(),
    	    	type_action: "checked task",
    	    	activation_time: new Date()
    	    }
    	}else{    		
        	$task.removeClass("done");
    		action = {
    	    	description: $task.text(),
    	    	type_action: "unchecked task",
    	    	activation_time: new Date()
    	    }
    	} 
    	postAction(action);
  	};

	function deleteTaskFromList(event, action){
		action.task.remove();
		var action = {
			description: action.description,
    	    type_action: action.type_action,
    	    activation_time: action.activation_time
		}
		postAction(action);
	};  	

// use Ajax to push request 
	var $getHistory= $("#button-get-history");
	$getHistory.click(getAllAction);
	function getAllAction(){
		console.log("=======>  get all action \n");
		$.ajax({
            url: "http://localhost:3000/api/tasks",
            dataType: "json",
            type: 'GET',
            contentType: 'application/json',
            success: function(result) {
                $.each(result, function(i, value){
                	console.log(i+" : You "+value.type_action + " *"+ value.description +"* at "+value.activation_time);
                });
            }
        });
	}
	
	function postAction(action){
		console.log("=======> post action ")
		$.ajax({
			url: "http://localhost:3000/api/tasks",
			dataType: "json",
			type:'post',
			contentType: 'application/json',
			data: JSON.stringify(action),
			success: function(data,  textStatus, jQxhr){
				console.log(data);
			},
			error: function( jqXhr, textStatus, errorThrown ){
		        console.log( errorThrown );
		    }
		});
	}

} //toDoFeature