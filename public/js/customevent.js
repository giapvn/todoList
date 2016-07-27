$(document).ready(toDoFeature);

function toDoFeature(){
	var $buttonAddTask = $("#button-add-task");
	var $buttonDeleteTasksChecked = $("#button-delete-tasks-checked");
	var $textboxTask  = $("#textbox-task");
	var $listTasks = $("#list-tasks");
	var $history = $("#history");
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
		var task = {
			description: $textboxTask.val(),
			type_action: 'Add',
			activation_time: new Date()
		};
		
		$listTasks.trigger("task:add", task);
		$history.trigger("task:add", task);
	};

	function toTriggerDeleteTasksChecked(){
		$(".delete").each(function deleteTasksChecked(){
	        if($(this).is(":checked")){
	        	var taskDeleted = {
	        		description: $(this).parent().find("span").text(),
	        		task: $(this).parent(),
	        		activation_time: new Date()
	        	}
	        	$listTasks.trigger("task:delete", taskDeleted);
	        	$history.trigger("task:delete", taskDeleted);
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
  	$history.on("task:add", addHistoryForAddingTask);
  	$history.on("task:delete", addHistoryForDeletingTask);

  	function addTaskToList(event, task){
		index += 1;
	    $(this).prepend(
	    		"<a href='#' class='list-group-item'>"+
					"<input type='checkbox' class='delete'>"+
					"<span>"+task.description+"</span>"+
					"<button class='pull-right btn-default'>X</button>"+
				"</a>"
	    	);

	    var $newItem = $("#list-tasks a:first-child");
	    console.log($newItem.find("span").text());

	    $newItem.find("button").click(toTriggerDeleteTask);
	    $newItem.find("input").change(doneTask);
	    $textboxTask.val("");
	    $textboxTask.focus();
	};

	function toTriggerDeleteTask(){
		var taskDeleted = {
		description: $(this).parent().find("span").text(),
		task: $(this).parent(),
		activation_time: new Date()
		}
		$listTasks.trigger("task:delete", taskDeleted);
		$history.trigger("task:delete", taskDeleted);
	}

	function deleteTask(){
    	$(this).parent().remove();
	};

  	function doneTask(){
    	if($(this).is(":checked")) {
    	    $(this).parent().find("span").addClass("done");
    	}else{
        	$(this).parent().find("span").removeClass("done");
    	} 
  	};

	function deleteTaskFromList(event, taskDeleted){
		taskDeleted.task.remove();
	};  	

  	function addHistoryForAddingTask(event, task){
		$history.append("<p> + add new task: description: "+task.description+"|| time: "+task.activation_time+"  </p>");
	};

	function addHistoryForDeletingTask(event, taskDeleted){
		$history.append("<p> + delete a task: description: "+taskDeleted.description+"|| time: "+taskDeleted.activation_time+"  </p>");
	};

// test Ajax
	var $testAjax = $("#button-test-ajax");
	$testAjax.click(getAllTasks);
	function getAllTasks(){
		$.ajax({
            url: "http://localhost:3000/api/tasks",
            type: 'GET',
            success: function(result) {
                console.log(result);
            }
        });
	}

} //toDoFeature