'use strict'

function getTasksFromDb(connection){
	this.connection = connection;
} 

getTasksFromDb.prototype.getTasks = function(callback){
	var collection = this.connection.collection('task');
	var tasks = collection.find().toArray(function(err, result){
		var result = "Successful!";
		if(!err){
			return callback(true, result);
		}
		return callback(false, null);
	});
};

module.exports = getTasksFromDb;