'use strict';

var express = require('express');
//INSERT DEPENDENCIES BELOW
var postController = require('./postController');

//new instance of express router
var postRouter = express.Router();
//INSERT ROUTES BELOW

// postRouter.get('/', postController....);
// postRouter.post('/', postController....);
// postRouter.put('/', postController....);
// postRouter.delete('/', postController....);

module.exports = postRouter;