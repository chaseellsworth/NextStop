/*global angular:true, moment:true, _:true */
(function () {
  'use strict';

  angular.module('travelFilter.services', [])
    .factory('authFactory', authFactory);

  authFactory.$inject = ['$http', '$state', '$q'];

  function authFactory($http, $state, $q) {

    var factory = {
      userId: null,
      userName: null,
      fbProfilePic: null,
      isLoggedIn: isLoggedIn,
      getUserName: getUserName
    };

    return factory;

    function isLoggedIn(redirectToLogin) {
      return $http.get('/auth/user')
        .then(function (res) {
          factory.userId = res.data.userId;
          factory.userName = res.data.userName;
          factory.fbProfilePic = res.data.fbProfilePic;
          if (res.data.userId === null) {
            if (redirectToLogin !== false) {
              return $state.go('login');
            }
            return false;
          }
          return {
            'userName': factory.userName,
            'userId': factory.userId,
            'fbProfilePic': factory.fbProfilePic,
          };
        });
    }

    function getUserName() {
      if (factory.userName === undefined) {
        return factory.isLoggedIn();
      } else {
        return $q.when({
          'userName': factory.userName,
          'userId': factory.userId,
          'fbProfilePic': factory.fbProfilePic
        });
      }
    }

  }

})();