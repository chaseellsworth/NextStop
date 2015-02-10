/*global describe:true, before: true, after: true */
'use strict';

var db = require('../db');
var deleteAllDatabases = require('../deleteAllDatabases');

describe('Travel Filters', function () {

  before(function (done) {
    // createAllTables is promise
    db.createAllTables.then(function () {
      done();
    });
  });

  require('./db.tests.js'); /////FIX FOR HAVING DB IN A DB FOLDER
  require('./db');
  require('./integration');
  require('./unit');

  // Delete All Test Tables
  after(function (done) {
    deleteAllDatabases()
      .then(function () {
        done();
      })
      .catch(function (err) {
        console.log('Didn\'t delete tables:', err);
      });
  });

});