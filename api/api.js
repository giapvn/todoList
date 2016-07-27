var express = require('express');

var getTask = require('../controllers/taskcontroller');

var router = express.Router();

router.get('/tasks', getTask.sendResult);


module.exports = router;