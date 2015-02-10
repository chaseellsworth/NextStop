'use strict';

//External dependencies
var config = require('../config/default');
console.log('config:', config);
var bodyParser = require('body-parser');
var session = require('express-session');
var express = require('express');

//Internal dependencies
var clientConfigParser = require('./clientConfigParser');
var auth = require('./auth');
var authRouter = require('./auth/authRouter');
var apiRouter = require('./api');

//Init app
var app = express();

//Middlewares
app
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .use(bodyParser.json())
  .use(session({
    secret: 'zfnzkwjehgweghw',
    resave: false,
    saveUninitialized: true
  }))
  .use(auth.initialize())
  .use(auth.session());

//Set Routes and start server
app
  .use('/config.js', clientConfigParser)
  .use(express.static(__dirname + '/../client'))
  .use('/auth', authRouter)
  .use('/api', apiRouter)
  .listen(config.ports.http, function () {
    console.log('Server listening on port:', config.ports.http);
  });

//Export
module.exports = app;