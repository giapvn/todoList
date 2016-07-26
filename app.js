'use strict'
var express = require('express');
var bodyParser = require('body-parser');
var api = require('./api/api');
var databaseService = require('./db/database.service');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

// set route link to home.html
app.get('/home', function(req, res){
	res.sendFile(__dirname + "/views/home.html");
});

// starting app
app.listen(app.get('port'), function(){
	console.log("application started on http://localhost:"+app.get('port')+";\n please press Ctrl+C to terminate");
}) 