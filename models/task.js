'use strict'

function Task(){

};

Task.prototype.setDescription = function(description){
	this.description = description;
};

Task.prototype.setActivationTime =function(activation_time){
	this.activation_time = activation_time;
};
Task.prototype.setActionType =function(action_type){
	this.action_type = action_type;
};

Task.prototype.getDescription = function(){
	return this.description;
};

Task.prototype.getActivationTime = function(){
	return this.activation_time;
};
Task.prototype.getActionType = function(){
	return this.action_type;
};

module.exports = Task;

