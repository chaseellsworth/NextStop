'use strict';
//External dependencies
var Promise = require('bluebird');

//Internal dependencies
var config = require('../config/default.js');

var knex = require('knex')({
  client: 'pg',
  connection: config.pg
})
var Bookshelf = require('bookshelf')(knex);


//users schema
knex.createAllTables = knex.schema.hasTable('users').then(function (exists) {
  if (!exists) {
    return knex.schema.createTable('users', function (user) {
        user.increments('id').primary();
        user.string('username', 255);
        user.string('email', 255);
        user.string('password', 255);
        user.string('fb_id', 255);
        user.string('fb_full_name', 255);
        user.string('fb_first_name', 255);
        user.string('fb_last_name', 255);
        user.string('fb_gender', 255);
        user.string('fb_access_token', 255);
        // user.string('fb_avatar_url', 255);
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
  return knex.schema.hasTable('activities').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable('activities', function (activity) {
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
  return knex.schema.hasTable('regions').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable('regions', function (place) {
          place.increments('id').primary();
          place.string('region_name', 255);
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
  return knex.schema.hasTable('countries').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable('countries', function (country) {
          country.increments('id').primary();
          country.string('country_name', 255);
          country.timestamps();
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
  return knex.schema.hasTable('locations').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable('locations', function (place) {
          place.increments('id').primary();
          place.string('location_name', 255);
          // place.integer('longitude');
          // place.integer('latitude');
          place.timestamps();
        })
        .then(function () {
          console.log('created table: locations');
        })
        .catch(function (error) {
          console.log('error creating locations: ', error);
        });
    }
  });
}).then(function () {
  //creates table for posts and each posts' content
  return knex.schema.hasTable('posts').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable('posts', function (post) {
          post.increments('id').primary();
          post.text('comment');
          post.integer('user_id').unsigned().references('id').inTable('users');
          post.integer('activity_id').unsigned().references('id').inTable('activities');
          post.integer('region_id').unsigned().references('id').inTable('regions');
          post.integer('country_id').unsigned().references('id').inTable('countries');
          post.integer('location_id').unsigned().references('id').inTable('locations');
          post.timestamps();
        })
        .then(function () {
          console.log('created table: posts');
        })
        .catch(function (error) {
          console.log('error creating posts: ', error);
        });
    }
  });
}).then(function () {
  //photos schema
  return knex.schema.hasTable('photos').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable('photos', function (photo) {
          photo.increments('id').primary();
          photo.text('comment');
          photo.integer('post_id').unsigned().references('id').inTable('posts');

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

module.exports = knex;
module.exports.DB = Bookshelf;