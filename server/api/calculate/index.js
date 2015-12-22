'use strict';

var express = require('express');
var controller = require('./calculate.controller');

var router = express.Router();

router.post('/', controller.calculate);

module.exports = router;
