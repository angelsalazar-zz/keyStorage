angular.module('app').controller('SignupController', SignupController);

function SignupController($scope, $state, store, AuthFactory, $timeout){
  $scope.signUp = function(){
    AuthFactory
      .signUp($scope.user.name, $scope.user.lastname, $scope.user.email, $scope.user.password)
      .then(function(response){
        store.set('token', response.data.token);
        $state.go('home');
      }, function(response){
        $scope.error = response.data;
        $timeout(function(){
          $scope.error = null;
        }, 8000)
      });
  };
}
