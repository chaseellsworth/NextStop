/*global angular:true */
(function () {
  'use strict';
  angular.module('travelFilter', [
      'ui.router',
      'angularFileUpload',
      'travelFilter.map',
      'travelFilter.newsfeed',
      'travelFilter.post',
      'travelFilter.profile'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
      // var authenticated = ['$q', 'AuthFactory', function ($q, AuthFactory) {
      //   var deferred = $q.defer();
      //   AuthFactory.isLoggedIn(false)
      //     .then(function (isLoggedIn) {
      //       if (isLoggedIn) {
      //         deferred.resolve();
      //       } else {
      //         deferred.reject('Not logged in');
      //       }
      //     });
      //   return deferred.promise;
      // }];
      $stateProvider
        .state('landing', {
          url: '/',
          templateUrl: '/app/landing/landing.html'
        })
        .state('login', {
          url: '/login',
          templateUrl: 'app/login/login.html'
        })
        .state('newsfeed', {
          url: '/newsfeed',
          templateUrl: 'app/newsfeed/newsfeed.html'
        })
        .state('map', {
          url: '/map',
          templateUrl: 'app/map/map.html'
        })
        .state('profile', {
          url: '/profile',
          templateUrl: 'app/profile/profile.html'
        })
        .state('post', {
          url: '/post',
          templateUrl: 'app/post/post.html'
        });
      // .state('home', {
      //   url: '/home',
      //   views: {
      //     '': {
      //       templateUrl: '/app/home/home.html'
      //     },
      //     'projects@home': {
      //       templateUrl: '/app/home/projects/projects.html',
      //     }
      //   },
      //   // resolve: {
      //   //   authenticated: authenticated
      //   // }
      // })
      // .state('project', {
      //   url: '/project/:projectId/:projectName/',
      //   views: {
      //     '': {
      //       templateUrl: '/app/project/project.html',
      //     },
      //     'fileStructure@project': {
      //       templateUrl: '/app/project/fileStructure/fileStructure.html',
      //     },
      //     'chat@project': {
      //       templateUrl: '/app/project/chat/chat.html',
      //     },
      //     'toolbar@project': {
      //       templateUrl: '/app/project/toolbar/toolbar.html',
      //     },
      //     'video@project': {
      //       templateUrl: '/app/project/chat/video/video.html',
      //     }
      //   },
      //   // resolve: {
      //   //   authenticated: authenticated
      //   // }
      // })
      // .state('document', {
      //   parent: 'project',
      //   url: 'document/:documentPath',
      //   templateUrl: '/app/project/document/document.html',
      //   controller: 'DocumentController',
      //   // resolve: {
      //   //   authenticated: authenticated
      //   // }
      // });
    })
    .run(function ($rootScope, $state) {
      $rootScope.$on('$stateChangeError', function (err, req) {
        $state.go('login');
      });
    });
})();