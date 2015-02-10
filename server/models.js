'use strict';

var db = require('./db.js');
var bookshelf = require('bookshelf')(db);
var moment = require('moment');
var bcrypt = require('bcrypt-nodejs');
var bluebird = require('bluebird');
var _ = require('lodash');
_.str = require('underscore.string');

//define models
var models = {};

models._parse = function (attrs) {
  return _.reduce(attrs, function (memo, val, key) {
    memo[_.str.camelize(key)] = val;
    return memo;
  }, {});
};

models._format = function (attrs) {
  return _.reduce(attrs, function (memo, val, key) {
    memo[_.str.underscored(key)] = val;
    return memo;
  }, {});
};

models.User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  initialize: function () {
    this.on('creating', this.addPassword.bind(this));
  },
  post: function () {
    return this.belongsToMany(models.Post);
  },
  parse: models._parse,
  format: models._format,
  addPassword: function (model) {
    var cipher = bluebird.promisify(bcrypt.hash);
    return cipher(model.attributes.password, null, null)
      .then(function (hash) {
        delete model.attributes.password;
        delete this.password;
        model.attributes.password = hash;
        this.password = hash;
      }.bind(this));
  },
  checkPassword: function (password) {
    var compare = bluebird.promisify(bcrypt.compare);
    return compare(password, this.get('password'))
      .then(function (isMatch) {
        return isMatch;
      });
  },
});

models.Activity = bookshelf.Model.extend({
  tableName: 'activities',
  hasTimestamps: true,
  user: function () {
    return this.belongsTo(models.User);
  },
  parse: models._parse,
  format: models._format
});

models.Region = bookshelf.Model.extend({
  tableName: 'regions',
  hasTimestamps: true,
  user: function () {
    return this.belongsTo(models.User);
  },
  parse: models._parse,
  format: models._format
});

models.Country = bookshelf.Model.extend({
  tableName: 'countries',
  hasTimestamps: true,
  user: function () {
    return this.belongsTo(models.User);
  },
  parse: models._parse,
  format: models._format
});

models.LocalPlace = bookshelf.Model.extend({
  tableName: 'local_places',
  hasTimestamps: true,
  user: function () {
    return this.belongsTo(models.User);
  },
  parse: models._parse,
  format: models._format
});

models.Post = bookshelf.Model.extend({
  tableName: 'posts',
  hasTimestamps: true,
  user: function () {
    return this.belongsTo(models.User);
  },
  parse: models._parse,
  format: models._format
});

//define collections
var collections = {};

collections.UserCollection = bookshelf.Collection.extend({
  model: models.User
});
collections.ActivityCollection = bookshelf.Collection.extend({
  model: models.Activity
});
collections.PlaceCollection = bookshelf.Collection.extend({
  model: models.Place
});
collections.PostCollection = bookshelf.Collection.extend({
  model: models.Post
});
collections.PhotoCollection = bookshelf.Collection.extend({
  model: models.Photo
});

exports.models = models;
exports.collections = collections;