angular.module('app.signup',[
  'angular-storage',
  'ui.router'
])
.config(function($stateProvider) {
  $stateProvider
    .state('signup',{
      url : '/signup',
      controller : 'SignupCtrl',
      templateUrl : 'modules/signup/signup.html'
    })
})
.controller('SignupCtrl',function($scope, store, $window, $http, $state) {
  var API = $window.location.origin + '/api';
  $scope.signUp = function(){
    var userData = {
      name : $scope.user.name,
      lastname : $scope.user.lastname,
      email : $scope.user.email,
      password : $scope.user.password
    }
    $http
      .post(API + '/signup', userData)
      .then(function(response){
        console.log(response);
        store.set('token', response.data.token);
        $state.go('home');
      },function(response){
        console.log(response);
      })


  }
})
