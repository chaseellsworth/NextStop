'use strict';

var express = require('express');
//INSERT DEPENDENCIES BELOW
var authController = require('./authController');

//new instance of express router
var authRouter = express.Router();
//INSERT ROUTES BELOW

// authRouter.get('/', authController....);
// authRouter.post('/', authController....);
// authRouter.put('/', authController....);
// authRouter.delete('/', authController....);


module.exports = authRouter;