'use strict';

//External dependencies
var express = require('express');

//Internal dependencies
var authController = require('./authController');

//New instance of express router
var auth = require('./index');
var authRouter = express.Router();

//Routes
authRouter.use('/login/callback', auth.authenticate('github'), function (req, res) {
	res.redirect('/#/home');
});
authRouter.post('/login', auth.authenticate('local'), authController.login);
authRouter.get('/login', auth.authenticate('github'));
authRouter.post('/signup', authController.signup);
authRouter.use('/user', authController.getUser);
authRouter.use('/logout', authController.logout);

//export
module.exports = authRouter;