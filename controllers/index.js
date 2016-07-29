var express = require('express');

var taskController = require('../controllers/taskcontroller.js');
var actionController = require('../controllers/actioncontroller.js');
var router = express.Router();

router.get('/home',taskController.loadHomePage);

module.exports = router;