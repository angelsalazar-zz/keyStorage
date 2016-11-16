angular.module('app').controller('LoginController', LoginController);

function LoginController($scope, store, AuthFactory, $state, $timeout){
  // Login handler
  $scope.logIn = function(){
    AuthFactory
      .logIn($scope.user.email, $scope.user.password)
      .then(function(response){
        store.set('token', response.data.token);
        $state.go('home')
      }, function(response){
        console.log(response);
        $scope.error = response;
        $timeout(function(){
          $scope.error = null;
        }, 8000);
      })
  };
}
