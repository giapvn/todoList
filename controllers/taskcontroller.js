
var Task = require('../models/task.js');
var database = require('../db/mongo.service.js');
var TaskManagement = require('../models/taskmanagement.js');
var connection = database.getConnection();	
var taskManagement = new TaskManagement(connection);
var task = new Task();

module.exports.insertTask = function(req,res){

	var description = req.body.description || '';
	// task.setDesciption(description);

	// console.log(task.getDescription);
	console.log(description);
	if(description === ''){
		return res.sendStatus(400);
	}
	
	taskManagement.insertTask(description,function(err,result){
		if(err){
			return res.status(500).send();
		}
		return res.status(201).send(result);
	});
}


module.exports.sendResult = function(req, res){
	
	taskManagement.getTasks(function(err,result){
		if(err){
			res.status(500).send("Error on server");
		}else{
			res.status(200).send(result);
		}
	});
};

