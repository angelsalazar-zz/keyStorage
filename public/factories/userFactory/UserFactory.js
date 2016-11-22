angular.module('app').factory('UserFactory', UserFactory);

function UserFactory($http, $window) {
  // API BASE URL
  var API = $window.location.origin  + '/api';
  var UserFactory = {};

  UserFactory.get = function (id) {
    return $http.get(API + '/users/' + id);
  }

  return UserFactory;
};
