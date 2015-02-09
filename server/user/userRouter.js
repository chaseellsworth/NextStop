'use strict';

var express = require('express');
//INSERT DEPENDENCIES BELOW
var userController = require('./userController');

//new instance of express router
var userRouter = express.Router();
//INSERT ROUTES BELOW

// userRouter.get('/', userController....);
// userRouter.post('/', userController....);
// userRouter.put('/', userController....);
// userRouter.delete('/', userController....);

module.exports = userRouter;