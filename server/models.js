'use strict';

var db = require('./db.js').DB;
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

models.User = db.Model.extend({
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

models.Activity = db.Model.extend({
  tableName: 'activities',
  hasTimestamps: true,
  post: function () {
    return this.belongsToMany(models.Post);
  },
  parse: models._parse,
  format: models._format
});

models.Region = db.Model.extend({
  tableName: 'regions',
  hasTimestamps: true,
  post: function () {
    return this.belongsToMany(models.Post);
  },
  parse: models._parse,
  format: models._format
});

models.Country = db.Model.extend({
  tableName: 'countries',
  hasTimestamps: true,
  post: function () {
    return this.belongsToMany(models.Post);
  },
  parse: models._parse,
  format: models._format
});

models.Location = db.Model.extend({
  tableName: 'locations',
  hasTimestamps: true,
  post: function () {
    return this.belongsToMany(models.Post);
  },
  parse: models._parse,
  format: models._format
});

models.Post = db.Model.extend({
  tableName: 'posts',
  hasTimestamps: true,
  user: function () {
    return this.belongsTo(models.User);
  },
  activity: function () {
    return this.belongsTo(models.Activity);
  },
  region: function () {
    return this.belongsTo(models.Region);
  },
  country: function () {
    return this.belongsTo(models.Country);
  },
  location: function () {
    return this.belongsTo(models.Location);
  },
  parse: models._parse,
  format: models._format
});

models.Photo = db.Model.extend({
  tableName: 'photos',
  hasTimestamps: true,
  post: function () {
    return this.belongsTo(models.Post);
  },
  parse: models._parse,
  format: models._format
});

//define collections
var collections = {};

collections.UserCollection = db.Collection.extend({
  model: models.User
});
collections.ActivityCollection = db.Collection.extend({
  model: models.Activity
});
collections.RegionCollection = db.Collection.extend({
  model: models.Region
});
collections.CountryCollection = db.Collection.extend({
  model: models.Country
});
collections.LocationCollection = db.Collection.extend({
  model: models.Location
});
collections.PostCollection = db.Collection.extend({
  model: models.Post
});
collections.PhotoCollection = db.Collection.extend({
  model: models.Photo
});

//export models and collections
exports.models = models;
exports.collections = collections;