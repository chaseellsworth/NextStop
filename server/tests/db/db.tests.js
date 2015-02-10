/*global describe:true, it:true */
'use strict';

//External dependencies
var Promise = require('bluebird');
var Q = require('q');
var expect = require('chai').expect;
var should = require('should');
var _ = require('lodash');

//Internal dependencies
var UserCollection = require('../models.js').collections.UserCollection;
var ActivityCollection = require('../models.js').collections.ActivityCollection;
var RegionCollection = require('../models.js').collections.RegionCollection;
var CountryCollection = require('../models.js').collections.CountryCollection;
var LocalPlaceCollection = require('../models.js').collections.LocalPlaceCollection;
var PostCollection = require('../models.js').collections.PostCollection;
var PhotoCollection = require('../models.js').collections.PhotoCollection;

//ADJUST FOR NEW SCHEMA

describe('Database', function () {

  //tests adding a new user and creating a collection
  describe('User', function () {
    it('should create a new user', function (done) {
      new UserCollection()
        .create({
          'username': 'door'
        })
        .then(function () {
          return UserCollection
            .query('where', 'username', '=', 'door')
            .fetch();
        })
        .then(function (coll) {
          var _username = _.last(coll.toJSON()).username;
          expect(_username).to.equal('door');
          done();
        })
        .catch(function () {
          throw new Error('User not created correctly');
        });
    });
  });

  //tests adding a new activity and creating a collection
  describe('Activity', function () {
    it('should create a new activity', function (done) {
      new ActivityCollection()
        .create({
          'activity_name': 'walking'
        })
        .then(function () {
          return ActivityCollection
            .query('where', 'activity_name', '=', 'walking')
            .fetch();
        })
        .then(function (coll) {
          var _activity_name = _.last(coll.toJSON()).activity_name;
          expect(_activity_name).to.equal('walking');
          done();
        })
        .catch(function () {
          throw new Error('Activity not created correctly');
        });
    });
  });

  //tests adding a new region and creating a collection
  describe('Region', function () {
    it('should create a new region', function (done) {
      new RegionCollection()
        .create({
          'region_name': 'Western Europe'
        })
        .then(function () {
          return RegionCollection
            .query('where', 'region_name', '=', 'Western Europe')
            .fetch();
        })
        .then(function (coll) {
          var _region_name = _.last(coll.toJSON()).region_name;
          expect(_region_name).to.equal('Western Europe');
          done();
        })
        .catch(function () {
          throw new Error('Region not created correctly');
        });
    });
  });

  //tests adding a new country and creating a collection
  describe('Country', function () {
    it('should create a new country', function (done) {
      new CountryCollection()
        .create({
          'country_name': 'France'
        })
        .then(function () {
          return RegionCollection
            .query('where', 'country_name', '=', 'France')
            .fetch();
        })
        .then(function (coll) {
          var _country_name = _.last(coll.toJSON()).country_name;
          expect(_country_name).to.equal('France');
          done();
        })
        .catch(function () {
          throw new Error('Country not created correctly');
        });
    });
  });

  //tests adding a new local_place and creating a collection
  describe('LocalPlace', function () {
    it('should create a new local_place', function (done) {
      new LocalPlaceCollection()
        .create({
          'local_place': 'Paris'
        })
        .then(function () {
          return RegionCollection
            .query('where', 'local_place', '=', 'Paris')
            .fetch();
        })
        .then(function (coll) {
          var _local_place = _.last(coll.toJSON()).local_place;
          expect(_local_name).to.equal('Paris');
          done();
        })
        .catch(function () {
          throw new Error('LocalPlace not created correctly');
        });
    });
  });


  //tests adding a new post with associations and creating a collection
  describe('Post', function () {
    it('should attach user to a project', function (done) {
      var post;
      var user;
      var activity;
      var region;
      var country;
      var localPlace;
      new PostCollection()
        .create()
        .fetch()
        .then(function (_post) {
          var post = _post;
          return new UserCollection()
            .query('where', 'username', '=', 'door').fetchOne();
        })
        .then(function (_user) {
          user = _user;
        })
        .then(function () {
          return new ActivityCollection()
            .query('where', 'activity_name', '=', 'walking').fetchOne();
        })
        .then(function (_activity) {
          activity = _activity;
        })
        .then(function () {
          return new RegionCollection()
            .query('where', 'region_name', '=', 'Western Europe').fetchOne();
        })
        .then(function (_region) {
          region = _region;
        })
        .then(function () {
          return new CountryCollection()
            .query('where', 'country_name', '=', 'France').fetchOne();
        })
        .then(function (_country) {
          country = _country;
        })
        .then(function () {
          return new LocalPlaceCollection()
            .query('where', 'local_place', '=', 'Paris').fetchOne();
        })
        .then(function (_localPlace) {
          localPlace = _localPlace;
        })
        .then(function () {
          return Promise.all([
            post.related('user').attach(user),
            user.related('post').attach(post),
            post.related('activity').attach(activity),
            activity.related('post').attach(post),
            post.related('region').attach(region),
            region.related('post').attach(post),
            post.related('country').attach(country),
            country.related('post').attach(post),
            post.related('local_place').attach(localPlace),
            localPlace.related('post').attach(post),
          ]);
        })
        .then(function () {
          return UserCollection.query('where', 'username', '=', 'door').fetchOne({
            withRelated: ['post']
          });
        })
        .then(function (_user) {
          expect(_user.toJSON().post[0].activity_name).to.equal('walking');
          expect(_user.toJSON().post[0].region_name).to.equal('Western Europe');
          expect(_user.toJSON().post[0].country_name).to.equal('France');
          expect(_user.toJSON().post[0].local_place).to.equal('Paris');
          done();
        })
        .catch(function () {
          expect(false).to.equal(true);
        });
    });
  });


  //create model for user with tied project
  //tests adding a new project and creating a collection
  // describe('User/Project', function () {
  //   it('should attach user to a project', function (done) {
  //     var project, user;
  //     new ProjectCollection()
  //       .query('where', 'project_name', '=', 'car')
  //       .fetchOne()
  //       .then(function (_project) {
  //         project = _project;
  //         return new UserCollection().query('where', 'username', '=', 'door').fetchOne();
  //       })
  //       .then(function (_user) {
  //         user = _user;
  //         return Promise.all([
  //           project.related('user').attach(user),
  //           user.related('project').attach(project)
  //         ]);
  //       })
  //       .then(function () {
  //         return UserCollection.query('where', 'username', '=', 'door').fetchOne({
  //           withRelated: ['project']
  //         });
  //       })
  //       .then(function (_user) {
  //         expect(_user.toJSON().project[0].projectName).to.equal('car');
  //         done();
  //       })
  //       .catch(function () {
  //         expect(false).to.equal(true);
  //       });
  //   });
  // });

});