function ActionManagement(connection){
	this.connection = connection;
};

ActionManagement.prototype.insertAction = function(action, callback){

	var collection = this.connection.collection('action');
	var newAction = {
		description: action.getDescription(),
		action_type: action.getActionType(),
		activation_time: action.getActivationTime(),
	};
	var insertActionSuccess = function(result){
		return callback(false,result);
	};
	var insertActionFalse = function(err){
		return callback(true,null);
	}
	collection.insert(newAction).then(insertSuccess).catch(insertFalse);
}


ActionManagement.prototype.getActions = function(callback){
	var collection = this.connection.collection('action');
	var actions = collection.find().toArray(function(err, result){
		// var result = "Successful!";
		if(!err){
			return callback(false, result);
		}
		return callback(true, null);
	});
};


module.exports = ActionManagement;