#!/usr/bin/env node

/*jshint node:true */
'use strict';

//External dependencies
var Promise = require('bluebird');

//Internal dependencies
var config = require('../config/default');
var db = require('./db');

process.stdin.resume();

var deleteAllDatabases = function () {
  return db.createAllTables
    .then(function () {
      return db.schema.hasTable('photos')
        .then(function (exists) {
          if (exists) {
            return db.schema.dropTable('photos');
          }
          return true;
        });
    })
    .then(function () {
      return db.schema.hasTable('posts')
        .then(function (exists) {
          if (exists) {
            return db.schema.dropTable('posts');
          }
          return true;
        });
    })
    .then(function () {
      return Promise.all([
        db.schema.hasTable('users').then(function (exists) {
          if (exists) {
            return db.schema.dropTable('users');
          }
          return true;
        }),
        db.schema.hasTable('activities').then(function (exists) {
          if (exists) {
            return db.schema.dropTable('activities');
          }
          return true;
        }),
        db.schema.hasTable('regions').then(function (exists) {
          if (exists) {
            return db.schema.dropTable('regions');
          }
          return true;
        }),
        db.schema.hasTable('countries').then(function (exists) {
          if (exists) {
            return db.schema.dropTable('countries');
          }
          return true;
        }),
        db.schema.hasTable('local_places').then(function (exists) {
          if (exists) {
            return db.schema.dropTable('local_places');
          }
          return true;
        }),
      ]);
    })
    .then(function () {
      console.log('Deleting All Postgres Tables');
      return true;
    })
    .then(function () {
      console.log('Deleting Database Done');
    });
};

if (require.main === module) {
  deleteAllDatabases()
    .then(function () {
      process.exit();
    });
}

//export
module.exports = deleteAllDatabases;