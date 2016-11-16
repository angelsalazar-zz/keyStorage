angular.module('app').factory('AuthFactory', AuthFactory);


function AuthFactory($http, $window){
  var API = $window.location.origin + '/api';
  var AuthFactory = {};
  /**
  * @param email String
  * @param password String
  * @return Promise
  */
  AuthFactory.logIn = function(email, password){
    // user credentials
    var user = {
      email :  email,
      password : password
    };
    //send request
    return $http.post(API + '/login', user);
  };

  AuthFactory.signUp = function(name, lastname, email, password){
    // new User data
    var newUser = {
      name : name,
      lastname : lastname,
      email : email,
      password : password
    };
    // send request
    return $http.post(API  + '/signup', newUser);
  };

  return AuthFactory;
}
