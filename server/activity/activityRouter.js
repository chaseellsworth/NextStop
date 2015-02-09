'use strict';

var express = require('express');
//INSERT DEPENDENCIES BELOW
var activityController = require('./activityController');

//new instance of express router
var activityRouter = express.Router();
//INSERT ROUTES BELOW

// activityRouter.get('/', activityController....);
// activityRouter.post('/', activityController....);
// activityRouter.put('/', activityController....);
// activityRouter.delete('/', activityController....);

module.exports = activityRouter;