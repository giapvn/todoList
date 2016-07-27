
var Task = require('../models/task.js');
var database = require('../db/mongo.service.js');
var TaskManagement = require('../models/taskmanagement.js');
var connection = database.getConnection();	
var taskManagement = new TaskManagement(connection);
var task = new Task();

module.exports.insertTask = function(req,res){

	var description = req.body.description || '';
	var action_type = req.body.action_type || '';
	var activation_time = req.body.activation_time || '';


	task.setDescription(description);
	task.setActionType(action_type);
	task.setActivationTime(activation_time);
	

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


module.exports.sendResult = function(req, res){
	
	taskManagement.getTasks(function(err,result){
		if(err){
			res.status(500).send("Error on server");
		}else{
			res.status(200).send(result);
		}
	});
};

