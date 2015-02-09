'use strict';

var express = require('express');
//INSERT DEPENDENCIES BELOW
var placeController = require('./placeController');

//new instance of express router
var placeRouter = express.Router();
//INSERT ROUTES BELOW

// placeRouter.get('/', placeController....);
// placeRouter.post('/', placeController....);
// placeRouter.put('/', placeController....);
// placeRouter.delete('/', placeController....);

module.exports = placeRouter;