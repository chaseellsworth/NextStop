'use strict';

//External dependencies
////none

//Internal dependencies
// var UserCollection = require('../models').collections.UserCollection;
var models = require('../models');

//Controller logic
var authController = {};

//CHANGE FOR FACEBOOK AUTH
authController.getUser = function (req, res) {
	models.User
		.query('where', 'username', '=', req.params.username)
		.fetch({
			withRelated: ['post']
		})
		.then(function (coll) {
			res.send(coll);
		});
};

// authController.logout = function (req, res) {
// 	req.logout();
// 	res.redirect('/');
// };

authController.login = function (req, res) {
	res.redirect('/#/profile');
};

//export
module.exports = authController;