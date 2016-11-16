angular.module('app').factory('KeyFactory', KeyFactory);

function KeyFactory($window, $http){
  var API = $window.location.origin + '/api';
  var KeyFactory = {};

  KeyFactory.all = function(projectId){
    return $http.get(API + '/projects/' + projectId + '/keys');
  };

  KeyFactory.create = function(projectId, provider, email, password){
    var newKey = {
      provider : provider,
      email : email,
      password : password
    };
    return $http.post(API + '/projects/' + projectId + '/keys', newKey);
  };

  KeyFactory.get = function(projectId ,keyId){
    return $http.get(API + '/projects/' + projectId + '/keys/' + keyId);
  }
  KeyFactory.delete = function(projectId, keyId){
    return $http.delete(API + '/projects/' + projectId + '/keys/' + keyId);
  }
  return KeyFactory;

};
