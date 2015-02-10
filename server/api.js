'use strict';

//declare routers
var activityRouter = require('./activity/activityRouter');
var authRouter = require('./auth/authRouter');
var photoRouter = require('./photo/photoRouter');
var placeRouter = require('./place/placeRouter');
var postRouter = require('./post/postRouter');
var userRouter = require('./user/userRouter');

var express = require('express');

var apiRouter = express.Router();

apiRouter.use('/activity', activityRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/photo', photoRouter);
apiRouter.use('/place', placeRouter);
apiRouter.use('/post', postRouter);
apiRouter.use('/user', userRouter);

//export
module.exports = apiRouter;