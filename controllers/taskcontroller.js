
var Task = require('../models/task.js');
var database = require('../db/mongo.service.js');
var TaskManagement = require('../models/taskmanagement.js');
var connection = database.getConnection();	
var taskManagement = new TaskManagement(connection);
var task = new Task();

module.exports.insertTask = function(req,res){

	var description = req.body.description || '';

	task.setDescription(description);
	
	console.log("*******");
	console.log(task);
	console.log("*******");
	console.log("*******");
	console.log(task.getDesciption);
	if(description === ''){
		return res.sendStatus(400);
	}
	
	taskManagement.insertTask(task,function(err,result){
		if(err){
			return res.status(500).send();
		}
		return res.status(201).send(result);
	});
}


module.exports.sendResult = function(req, res){
	// for(task in taskManagement){
	// 	console.log(task);
	// 	console.log('--------------');
	// 	return res.status(200).send();
	// }
	taskManagement.getTasks(function(err,result){
		if(true){
			console.log(result);
			return null;
		}
		return res.status(404).send();
	});
};

