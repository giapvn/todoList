'use strict'
var express = require('express');
var bodyParser = require('body-parser');
var api = require('./api/api');
var dbConfig = require('./config/database.config.json');
var mongoService = require('./db/mongo.service');

var connectionString = "mongodb://"+dbConfig.mongodb.host+":"+dbConfig.mongodb.port+"/"+dbConfig.mongodb.dbname;


var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

// set api
app.use('/api', api);
// set route link to home.html
app.get('/home', function(req, res){
	res.sendFile(__dirname + "/views/home.html");
});

// start connection mongodb and starting app

mongoService.connect(connectionString, function(err){
	console.log('connection string:\n' + connectionString);
	if(err){
		console.log('Unable to connect Mongo DB');
		process.exit(1);
	} else{
		console.log(mongoService.getConnection());
		app.listen(app.get('port'), function(){
			console.log("application started on http://localhost:"+app.get('port')+";\n please press Ctrl+C to terminate");
		});
	}
});
	