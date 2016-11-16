angular.module('app.login',[
  'ui.router',
  'angular-storage',
  'ui.router'
])
.config(function($stateProvider) {
  $stateProvider
    .state('login',{
      url : '/login',
      controller : 'LoginCtrl',
      templateUrl : 'modules/login/login.html'
    })
})
.controller('LoginCtrl',function($scope, $http, $window, store, $state) {
  var API = $window.location.origin + '/api';
  $scope.logIn = function(){
    var credentials =  {
      email : $scope.user.email,
      password : $scope.user.password
    }
    $http
      .post(API + '/login',credentials)
      .then(function(response){
        console.log(response);
        store.set('token', response.data.token);
        $state.go('home');
      },function(response){
        console.log(response);
      })
  }
})
