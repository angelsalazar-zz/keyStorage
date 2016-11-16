angular.module('app').controller('HomeController', HomeController);


function HomeController($scope, store, $state, $window){
  $scope.logOut = function(){
    store.remove('token');
    $state.go('login');
  };

  // $scope.isTabActive = function(tabName){
  //   console.log($window.location)
  //   console.log(tabName)
  // }
  $scope.authUser = function(){
    return jwtHelper.decodeToken(store.get('token'));
  };
}
