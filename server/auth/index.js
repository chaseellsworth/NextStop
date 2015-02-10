'use strict';
//How it was last time below, didn't work for me
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

//THIS CAN PROB STAY THE SAME AS LONG AS I CREATE USERCOLLECTION THE SAME WAY
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
		callbackURL: 'http://' + config.url + ':' + config.ports.http + '/auth/login/callback'
	},
	function (accessToken, refreshToken, profile, done) {
		// I'm not exactly sure when we use an accessToken and a refreshToken
		if (accessToken !== null) {
			new UserCollection()
				.query('where', 'github_access_token', '=', accessToken)
				.fetchOne()
				.then(function (user) {
					if (!user) throw new Error('No User Found');
					done(null, user);
					return user;
				})
				.catch(function () {
					return new UserCollection()
						.create({
							username: profile._json.login,
							facebookId: profile._json.id,
							facebookName: profile._json.name,
							facebookEmail: profile._json.email,
							facebookLocation: profile._json.location,
							facebookAccessToken: accessToken,
							facebookAvatarUrl: profile._json.avatar_url
						})
						.then(function (user) {
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

//THIS CAN PROB STAY THE SAME AS LONG AS I MAKE SURE I HAVE THE CHECKPASSWORD FUNCTION
passport.use(new LocalStrategy({
		usernameField: 'email',
	},
	function (email, password, done) {
		UserCollection
			.query('where', 'email', '=', email)
			.fetchOne()
			.then(function (user) {
				return user.checkPassword(password)
					.then(function (isMatch) {
						if (!isMatch) {
							return done(null, false);
						}
						return done(null, user);
					});
			})
			.catch(function () {
				return done(null, false);
			});
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