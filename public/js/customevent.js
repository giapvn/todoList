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

		var data = {
			action: {
				description: $textboxTask.val(),
				action_type: 'added task',
				activation_time: new Date()
			},
			task: {
				_id: null,
				description: $textboxTask.val(),
				status: {
					checked: false,
					deleted: false
				}
			}
		};
		$listTasks.trigger("task:add", data);
	};

	function toTriggerDeleteTasksChecked(){
		$(".delete").each(function deleteTasksChecked(){
	        if($(this).is(":checked")){
	        	var data = {
	        		action: {
	        			task: $(this).parent(),
	        			description: $(this).parent().find("span").text(),
	        			action_type: 'deleted task',
	        			activation_time: new Date()
	        		},
	        		task: {
	        			_id: $(this).parent().find("label").text(),
	        			description: $(this).parent().find("span").text(),
	        			status: {
	        				checked: true,
	        				deleted: true
	        			}
	        		}
	        	};
	        	$listTasks.trigger("task:delete", data);
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

  	function addTaskToList(event, data){
		index += 1;
	    $(this).prepend(
	    		"<a href='#' class='list-group-item'>"+
					"<input type='checkbox' class='delete'>"+
					"<span>"+data.task.description+"</span>"+
					"<label class='hidden'>"+data.task._id+"</label>"+
					"<button class='pull-right btn-default'>X</button>"+
				"</a>"
	    	);

	    var $newItem = $("#list-tasks a:first-child");

	    $newItem.find("button").click(toTriggerDeleteTask);
	    $newItem.find("input").change(doneTask);
	    $textboxTask.val("");
	    $textboxTask.focus();

		addAction(data.action);
		addTaskToServer(data.task);
	};

	function toTriggerDeleteTask(){
		
		var data = {
    		action: {
    			task: $(this).parent(),
    			description: $(this).parent().find("span").text(),
    			action_type: 'deleted task',
    			activation_time: new Date()
    		},
    		task: {
    			_id: $(this).parent().find("label").text(),
    			description: $(this).parent().find("span").text(),
    			status: {
    				checked: $(this).parent().find("input").is(":checked"),
    				deleted: true
    			}
    		}
    	};
		$listTasks.trigger("task:delete", data);
	}

	// function deleteTask(){
 //    	$(this).parent().remove();
	// };

  	function doneTask(){
  		var $task = $(this).parent();
  		var data = {
    		action: {
    			description: $task.find("span").text(),
    			action_type: null,
    			activation_time: new Date()
    		},
    		task: {
    			_id: $task.find("label").text(),
    			description: $task.find("span").text(),
    			status: {
    				checked: null,
    				deleted: false
    			}
    		}
    	};
    	if($(this).is(":checked")) {
    	    $task.find("span").addClass("done");
    	    data.action.action_type = "checked task";
    	    data.task.status.checked = true;
    	}else{    
    		$task.find("span").removeClass("done");
    	    data.action.action_type = "unchecked task";
    	    data.task.status.checked = false;
    	} 
    	addAction(data.action);
    	editTaskToServer(data.task);
  	};

	function deleteTaskFromList(event, data){
		data.action.task.remove();
		delete data.action.task;
		addAction(data.action);
		editTaskToServer(data.task);
	};  	

// use Ajax to push request 
	var $history = $("#history");
	var $getHistory= $("#button-get-history");
	$getHistory.click(getAllActions);
	function getAllActions(){
		console.log("=======>  get all action \n");
		$.ajax({
            url: "http://localhost:3000/api/actions",
            dataType: "json",
            type: 'GET',
            contentType: 'application/json',
            success: function(result) {
            	$history.find("li").remove();
                $.each(result, function(i, value){
                	console.log(value);
                	$history.append("<li class='list-group-item'>"+i+" : You "+value.action_type + " *"+ value.description +"* at "+value.activation_time+"</li>");
                });
            }
        });
	};
	
	function addAction(action){
		console.log("=======> post action ")
		$.ajax({
			url: "http://localhost:3000/api/actions",
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
	};

	function editTaskToServer(task){
		console.log("=======> edit task ")
		$.ajax({
			url: "http://localhost:3000/api/tasks",
			dataType: "json",
			type:'put',
			contentType: 'application/json',
			data: JSON.stringify(task),
			success: function(data,  textStatus, jQxhr){
				console.log(data);
			},
			error: function( jqXhr, textStatus, errorThrown ){
		        console.log( errorThrown );
		    }
		});
	}

	function addTaskToServer(task){
		console.log("=======> add task ");
		$.ajax({
			url: "http://localhost:3000/api/tasks",
			dataType: "json",
			type:'post',
			contentType: 'application/json',
			data: JSON.stringify(task),
			success: function(data,  textStatus, jQxhr){
				var $newItem = $("#list-tasks a:first-child");
				$newItem.find("label").text(data.insertedIds[0]);
				console.log(data.insertedIds[0]);
			},
			error: function( jqXhr, textStatus, errorThrown ){
		        console.log( errorThrown );
		    }
		});
	}
} //toDoFeature