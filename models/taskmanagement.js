function TaskManagement(connection){
	this.connection = connection;
};

TaskManagement.prototype.insertTask = function(description, callback){
	
	var collection = this.connection.collection('task');
	var tasks = {
		description: description
	};
	console.log(tasks);
	collection.insert(tasks,function(err,result){
		return callback(err, result);
	});
}


TaskManagement.prototype.getTasks = function(callback){
	var collection = this.connection.collection('task');
	var tasks = collection.find().toArray(function(err, result){
		// var result = "Successful!";
		if(!err){
			return callback(false, result);
		}
		return callback(true, null);
	});
};


module.exports = TaskManagement