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
	collection.insert(newAction)
	.then(function(result){
		return callback(false,result);
	}).catch(function(err){
		return callback(true,null);
	})
}

ActionManagement.prototype.getActions = function(callback){
	var collection = this.connection.collection('action');
	var actions = collection.find().toArray()
		.then(function(result){
			return callback(false, result);
		})
		.catch(function(err){
			return callback(err, null);
		});
};

module.exports = ActionManagement;