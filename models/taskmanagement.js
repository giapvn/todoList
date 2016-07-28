function TaskManagement(connection){
	this.connection = connection;
};

TaskManagement.prototype.insertTask = function(task, callback){

	var collection = this.connection.collection('task');
		
	collection.insert(task,function(err,result){
		return callback(err, result);
	});
}


TaskManagement.prototype.getTasks = function(callback){
	var collection = this.connection.collection('task');
	collection.find().toArray(function(err, tasks){
		return callback(err, tasks);
	});
};

TaskManagement.prototype.editTask = function(selector, doc, callback){
	var collection = this.connection.collection('task');
	collection.updateOne(selector, {$set: doc},function(err, result){
		return callback(err, result);
	});
};

module.exports = TaskManagement;