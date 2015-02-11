'use strict';

//External dependencies
var express = require('express');

//Internal dependencies
var authController = require('./authController');

//for facebook login
var auth = require('./index');

//New instance of express router
var authRouter = express.Router();

//Routes
authRouter.use('/login/callback', auth.authenticate('facebook'), function (req, res) {
	res.redirect('/#/index.html');
});
authRouter.post('/login', auth.authenticate('local'), authController.login);
authRouter.get('/login', auth.authenticate('facebook'));
authRouter.post('/signup', authController.signup);
authRouter.use('/user', authController.getUser);
authRouter.use('/logout', authController.logout);

//export
module.exports = authRouter;