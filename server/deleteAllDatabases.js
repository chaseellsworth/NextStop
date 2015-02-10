#!/usr/bin/env node

/*jshint node:true */
'use strict';

//var Promise = require('bluebird');
var config = require('config');
var db = require('./db');

process.stdin.resume();

//////FIX FOR THE CURRENT SCHEMA

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
      console.log('Deleting All MySQL Tables');
      return true;
    })
    .then(function () {
      return mongoClient.connectAsync(config.get('mongo'))
        .then(function (db) {
          var projectCollection = Promise.promisifyAll(db.collection('project_file_structre'));
          return projectCollection.removeAsync()
            .then(function () {
              var documentsCollection = Promise.promisifyAll(db.collection('documents'));
              return documentsCollection.removeAsync();
            })
            .then(function () {
              var documentsCollection = Promise.promisifyAll(db.collection('documents_ops'));
              return documentsCollection.removeAsync();
            });
        })
        .then(function () {
          console.log('Deleting All Mongo Collections');
          return true;
        })
        .catch(function (err) {
          console.log('Error Deleting Mongo Collection', err);
        });
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

module.exports = deleteAllDatabases;