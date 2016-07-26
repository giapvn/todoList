var Task = require('../models/task.js');
var database = require('../db/mongo.service.js');
var TaskManagement = require('../models/taskmanagement.js');
var connection = database.getConnection();	
var taskManagement = new TaskManagement(connection);
var task = new Task();

exports.postingTask = function(req,res){

	var description = req.body.description || '';
	task = req.body;
	if(task === ''){
		return res.sendStatus(400);
	}
	
	taskManagement.insertTask(task,function(err,result){
		if(err){
			return res.status(500).send();
		}
		return res.status(201).send(result);
	});
}
