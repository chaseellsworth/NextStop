/*global describe:true, before: true, after: true */
'use strict';

//External dependencies

//Internal dependencies
var db = require('./db/db.tests');
var deleteAllDatabases = require('../deleteAllDatabases');

describe('Travel Filters', function () {

  before(function (done) {
    // createAllTables is promise
    db.createAllTables.then(function () {
      done();
    });
  });


  //db tests
  require('./db/db.tests.js');

  //integration tests
  require('./integration/login.test');
  require('./integration/user.test');

  //unit tests

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