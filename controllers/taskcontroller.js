var getTasksFromDb = require('../models/task');
var MongoData = require('../db/mongo.service');

var connection = MongoData.getConnection();
var tasks = new getTasksFromDb(connection);

var sendResult = function(req, res){
	for(task in tasks){
		console.log(task);
		console.log('--------------');
		return res.status(200).send();
	}
	tasks.getTasks(function(){
		if(true){
			console.log(result);
			return null;
		}
		return res.status(404).send();
	});
};

exports.sendResult = sendResult;