angular.module('app').service('VerifyService', VerifyService);

function VerifyService($http, $window) {
  var API = $window.location.origin + '/api';
  this.authenticateUserPassword = function (userPassword, projectId, keyId) {
    var user = {
      password : userPassword
    };
    return $http.post(API + '/projects/' + projectId + '/keys/' + keyId + '/showpassword', user);
  };
}
