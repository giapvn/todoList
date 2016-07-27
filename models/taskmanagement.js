function TaskManagement(connection){
	this.connection = connection;
};

TaskManagement.prototype.insertTask = function(task, callback){

	var collection = this.connection.collection('task');
	var tasks = {
		description: task.getDescription(),
		action_type: task.getActionType(),
		activation_time: task.getActivationTime(),
	};
	
	collection.insert(tasks,function(err,result){
		if(err) {
			return callback(true, null);
		}
		return callback(false, result);
	});
}


TaskManagement.prototype.getTasks = function(callback){
	var collection = this.connection.collection('task');
	var tasks = collection.find().toArray(function(err, result){
		// var result = "Successful!";
		if(!err){
			return callback(true, result);
		}
		return callback(false, null);
	});
};


module.exports = TaskManagement