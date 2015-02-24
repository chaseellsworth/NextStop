'use strict';
// var config = require('config');

//passport dependencies
var config = require('../../config/default');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;

//internal dependencies
var UserCollection = require('../models').collections.UserCollection;

//passport methods
passport.serializeUser(function (user, done) {
	return done(null, user.get('id'));
});

passport.deserializeUser(function (id, done) {
	new UserCollection()
		.query('where', 'id', '=', id)
		.fetchOne()
		.then(function (model) {
			return done(null, model);
		});
});

passport.use(new FacebookStrategy({
		clientID: config.facebook.clientID,
		clientSecret: config.facebook.clientSecret,
		callbackURL: 'http://' + config.url + ':' + config.ports.http + '/auth/login/callback',
		profileFields: ['id', 'name', 'photos', 'gender'],
	},
	function (accessToken, refreshToken, profile, done) {
		console.log('accessToken: ', accessToken);
		// console.log('profile._json: ', profile._json);
		// console.log('refreshToken: ', refreshToken);
		var prof = profile._json;
		if (accessToken !== null) {
			new UserCollection()
				.query('where', 'facebook_access_token', '=', accessToken)
				.fetchOne()
				.then(function (user) {
					if (!user) throw new Error('No User Found');
					done(null, user);
					return user;
				})
				.catch(function () {
					return new UserCollection()
						.create({
							'fb_id': prof.id,
							'fb_first_name': prof.first_name,
							'fb_last_name': prof.last_name,
							'fb_gender': prof.gender,
							'fb_access_token': accessToken,
							'fb_profile_pic': prof.picture.data.url
						})
						.then(function (user) {
							console.log('user: ', user);
							if (!user) throw new Error('No User Found');
							return done(null, user);
						});
				})
				.catch(function (err) {
					console.log('Error Authenticating User:', err);
					return done(null, false);
				});
		}
	}
));


//THIS CAN PROB STAY THE SAME
passport.checkIfLoggedIn = function (req, res, next) {
	if (req.user) {
		return next();
	}
	return res.status(401).send('You\'re not logged in');
};

//export
module.exports = passport;