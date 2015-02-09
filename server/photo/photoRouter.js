'use strict';

var express = require('express');
//INSERT DEPENDENCIES BELOW
var photoController = require('./photoController');

//new instance of express router
var photoRouter = express.Router();
//INSERT ROUTES BELOW

// photoRouter.get('/', photoController....);
// photoRouter.post('/', photoController....);
// photoRouter.put('/', photoController....);
// photoRouter.delete('/', photoController....);

module.exports = photoRouter;