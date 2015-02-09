'use strict';
var Promise = require('bluebird');
var config = require('config');

//PostgreSQL
var knex = require('knex');

//creates database
var db = knex({
  client: 'pg',
  connection: config.get('pg')
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
      return db.schema.createTable('places', function (project) {
          project.increments('id').primary();
          project.string('places_name', 255);
          project.timestamps();
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
      return db.schema.createTable('activities', function (template) {
          template.increments('id').primary();
          template.integer('user_id').unsigned().references('id').inTable('users');
          template.string('activity_name', 255);
          template.string('git_repo_url', 255);
          template.timestamps();
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
  //activities schema
  return db.schema.hasTable('photos').then(function (exists) {
    if (!exists) {
      return db.schema.createTable('activities', function (template) {
          template.increments('id').primary();
          template.integer('user_id').unsigned().references('id').inTable('users');
          template.string('activity_name', 255);
          template.string('git_repo_url', 255);
          template.timestamps();
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
  //activities schema
  return db.schema.hasTable('posts').then(function (exists) {
    if (!exists) {
      return db.schema.createTable('activities', function (template) {
          template.increments('id').primary();
          template.integer('user_id').unsigned().references('id').inTable('users');
          template.string('activity_name', 255);
          template.string('git_repo_url', 255);
          template.timestamps();
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
  //activities schema
  return db.schema.hasTable('places_users').then(function (exists) {
    if (!exists) {
      return db.schema.createTable('activities', function (template) {
          template.increments('id').primary();
          template.integer('user_id').unsigned().references('id').inTable('users');
          template.string('activity_name', 255);
          template.string('git_repo_url', 255);
          template.timestamps();
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
  //activities schema
  return db.schema.hasTable('activities_users').then(function (exists) {
    if (!exists) {
      return db.schema.createTable('activities', function (template) {
          template.increments('id').primary();
          template.integer('user_id').unsigned().references('id').inTable('users');
          template.string('activity_name', 255);
          template.string('git_repo_url', 255);
          template.timestamps();
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
  //activities schema
  return db.schema.hasTable('activities_places').then(function (exists) {
    if (!exists) {
      return db.schema.createTable('activities', function (template) {
          template.increments('id').primary();
          template.integer('user_id').unsigned().references('id').inTable('users');
          template.string('activity_name', 255);
          template.string('git_repo_url', 255);
          template.timestamps();
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
  //creates join table for users and users 
  return db.schema.hasTable('users_users').then(function (exists) {
    if (!exists) {
      return db.schema.createTable('projects_users', function (projectsUsers) {
          projectsUsers.increments('id').primary();
          projectsUsers.integer('user_id').unsigned().references('id').inTable('users');
          projectsUsers.integer('project_id').unsigned().references('id').inTable('projects');
          projectsUsers.timestamps();
        })
        .then(function () {
          console.log('created table: projects_users');
        })
        .catch(function (error) {
          console.log('error creating projects_users: ', error);
        });
    }
  });
}).catch(function (err) {
  console.log('Error Creating Tables: ', err);
});

module.exports = db;