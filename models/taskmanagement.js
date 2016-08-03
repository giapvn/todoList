function TaskManagement(connection){
	this.connection = connection;
};

TaskManagement.prototype.insertTask = function(task, callback){

	var collection = this.connection.collection('task');
		
	collection.insert(task,function(err,result){
		return callback(err, result);
	});
};

var notifyConvertToArraySuccess = function(tasks){
	if(tasks.length == 0){
		console.log("cannot found");
	}else{
		console.log(tasks);
	}
	return callback(false, tasks);
};

var notifyConvertToArrayFail = function(err){
	return callback(true, null);
}

TaskManagement.prototype.getTasks = function(queryString,callback){
	var collection = this.connection.collection('task');
	collection.find(queryString).toArray()
		.then(notifyConvertToArraySuccess)
		.catch(notifyConvertToArrayFail);
};

TaskManagement.prototype.editTask = function(selector, doc, callback){
	var collection = this.connection.collection('task');
	collection.updateOne(selector, {$set: doc},function(err, result){
		return callback(err, result);
	});
};

module.exports = TaskManagement;