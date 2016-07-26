var express = require('express');
var taskController = require('../controllers/taskcontroller.js');
var router = express.Router();

router.post('/postingTask', taskController.postingTask);

module.exports = router;