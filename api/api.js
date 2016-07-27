var express = require('express');
var taskController = require('../controllers/taskcontroller.js');
var router = express.Router();

router.post('/tasks', taskController.postingTask);

module.exports = router;