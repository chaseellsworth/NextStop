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
  //places schema
  return db.schema.hasTable('places').then(function (exists) {
    if (!exists) {
      return db.schema.createTable('places', function (place) {
          place.increments('id').primary();
          place.string('places_name', 255);
          place.timestamps();
        })
        .then(function () {
          console.log('created table: places');
        })
        .catch(function (error) {
          console.log('error creating places: ', error);
        });
    }
  });
}).then(function () {
  //activities schema
  return db.schema.hasTable('activities').then(function (exists) {
    if (!exists) {
      return db.schema.createTable('activities', function (activity) {
          activity.increments('id').primary();
          // activity.integer('user_id').unsigned().references('id').inTable('users');
          activity.string('activity_name', 255);
          // activity.string('git_repo_url', 255);
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
}).then(function () {
  //posts schema
  return db.schema.hasTable('posts').then(function (exists) {
    if (!exists) {
      return db.schema.createTable('posts', function (posts) {
          posts.increments('id').primary();
          posts.integer('user_id').unsigned().references('id').inTable('users');
          posts.timestamps();
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
  //creates join table for places and users 
  return db.schema.hasTable('places_users').then(function (exists) {
    if (!exists) {
      return db.schema.createTable('places_users', function (placesUsers) {
          placesUsers.increments('id').primary();
          placesUsers.integer('user_id').unsigned().references('id').inTable('users');
          placesUsers.string('activity_name', 255);
          placesUsers.timestamps();
        })
        .then(function () {
          console.log('created table: places_users');
        })
        .catch(function (error) {
          console.log('error creating places_users: ', error);
        });
    }
  });
}).then(function () {
  //creates join table for activities and users 
  return db.schema.hasTable('activities_users').then(function (exists) {
    if (!exists) {
      return db.schema.createTable('activities_users', function (activitiesUsers) {
          activitiesUsers.increments('id').primary();
          activitiesUsers.integer('user_id').unsigned().references('id').inTable('users');
          // activitiesUsers.string('activity_name', 255);
          activitiesUsers.timestamps();
        })
        .then(function () {
          console.log('created table: activities_users');
        })
        .catch(function (error) {
          console.log('error creating activities_users: ', error);
        });
    }
  });
}).then(function () {
  //creates join table for activities and places 
  return db.schema.hasTable('activities_places').then(function (exists) {
    if (!exists) {
      return db.schema.createTable('activities_places', function (activitiesPlaces) {
          activitiesPlaces.increments('id').primary();
          activitiesPlaces.integer('user_id').unsigned().references('id').inTable('users');
          activitiesPlaces.string('activity_name', 255);
          activitiesPlaces.timestamps();
        })
        .then(function () {
          console.log('created table: activities_places');
        })
        .catch(function (error) {
          console.log('error creating activities_places: ', error);
        });
    }
  });
}).then(function () {
  //creates join table for users and users 
  return db.schema.hasTable('users_users').then(function (exists) {
    if (!exists) {
      return db.schema.createTable('users_users', function (usersUsers) {
          usersUsers.increments('id').primary();
          usersUsers.integer('user_id').unsigned().references('id').inTable('users');
          usersUsers.integer('project_id').unsigned().references('id').inTable('projects');
          usersUsers.timestamps();
        })
        .then(function () {
          console.log('created table: users_users');
        })
        .catch(function (error) {
          console.log('error creating users_users: ', error);
        });
    }
  });
}).catch(function (err) {
  console.log('Error Creating Tables: ', err);
});

module.exports = db;