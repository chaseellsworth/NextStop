'use strict';
var Promise = require('bluebird');
var config = require('config');

//PostgreSQL
var knex = require('knex');

//creates database
var db = knex({
  client: 'mysql',
  connection: config.get('mysql')
});

//users schema
db.createAllTables = db.schema.hasTable('users').then(function (exists) {
  if (!exists) {
    return db.schema.createTable('users', function (user) {
        user.increments('id').primary();
        user.string('username', 255);
        user.string('email', 255);
        user.string('password', 255);
        // user.string('github_id', 255);
        // user.string('github_name', 255);
        // user.string('github_email', 255);
        // user.string('github_location', 255);
        // user.string('github_access_token', 255);
        // user.string('github_avatar_url', 255);
        user.timestamps();
      })
      .then(function () {
        console.log('created table: users');
      })
      .catch(function (error) {
        console.log('error creating users: ', error);
      });
  }
}).then(function () {
  //activities schema
  return db.schema.hasTable('activities').then(function (exists) {
    if (!exists) {
      return db.schema.createTable('activities', function (activity) {
          activity.increments('id').primary();
          activity.string('activity_name', 255);
          activity.timestamps();
        })
        .then(function () {
          console.log('created table: activities');
        })
        .catch(function (error) {
          console.log('error creating activities: ', error);
        });
    }
  });
}).then(function () {
  //regions schema
  return db.schema.hasTable('regions').then(function (exists) {
    if (!exists) {
      return db.schema.createTable('regions', function (place) {
          place.increments('id').primary();
          place.string('regions_name', 255);
          place.timestamps();
        })
        .then(function () {
          console.log('created table: regions');
        })
        .catch(function (error) {
          console.log('error creating regions: ', error);
        });
    }
  });
}).then(function () {
  //countries schema
  return db.schema.hasTable('countries').then(function (exists) {
    if (!exists) {
      return db.schema.createTable('countries', function (place) {
          place.increments('id').primary();
          place.string('countries_name', 255);
          place.timestamps();
        })
        .then(function () {
          console.log('created table: countries');
        })
        .catch(function (error) {
          console.log('error creating countries: ', error);
        });
    }
  });
}).then(function () {
  //local_places schema
  return db.schema.hasTable('local_places').then(function (exists) {
    if (!exists) {
      return db.schema.createTable('local_places', function (place) {
          place.increments('id').primary();
          place.string('local_places_name', 255);
          //longitude
          //latitude
          place.timestamps();
        })
        .then(function () {
          console.log('created table: local_places');
        })
        .catch(function (error) {
          console.log('error creating local_places: ', error);
        });
    }
  });
}).then(function () {
  //creates join table for activities and places 
  return db.schema.hasTable('posts').then(function (exists) {
    if (!exists) {
      return db.schema.createTable('posts_join', function (postsJoin) {
          postsJoin.increments('id').primary();
          // postsJoin.string('comments', 255);
          postsJoin.integer('user_id').unsigned().references('id').inTable('users');
          postsJoin.integer('activity_id').unsigned().references('id').inTable('activities');
          postsJoin.integer('region_id').unsigned().references('id').inTable('regions');
          postsJoin.integer('country_id').unsigned().references('id').inTable('countries');
          postsJoin.integer('local_place_id').unsigned().references('id').inTable('local_places');
          postsJoin.timestamps();
        })
        .then(function () {
          console.log('created table: posts_join');
        })
        .catch(function (error) {
          console.log('error creating posts_join: ', error);
        });
    }
  });
}).then(function () {
  //photos schema
  return db.schema.hasTable('photos').then(function (exists) {
    if (!exists) {
      return db.schema.createTable('photos', function (photo) {
          photo.increments('id').primary();
          photo.integer('user_id').unsigned().references('id').inTable('users');
          photo.string('activity_name', 255);
          // photo.string('git_repo_url', 255);
          photo.timestamps();
        })
        .then(function () {
          console.log('created table: photos');
        })
        .catch(function (error) {
          console.log('error creating photos: ', error);
        });
    }
  });
}).catch(function (err) {
  console.log('Error Creating Tables: ', err);
});

module.exports = db;