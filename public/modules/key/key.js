angular.module('app').controller('KeyController', KeyController);

function KeyController($scope, $stateParams, KeyFactory, ProjectFactory) {
  ProjectFactory
    .get($stateParams._projectId)
    .then(function (response) {
      $scope.project = response.data;
    }, function (response) {
      console.log(response);
    })
  KeyFactory
    .get($stateParams._projectId, $stateParams._keyId)
    .then(function(response){
      $scope.key = response.data;
    }, function(response){
      console.log(response);
    });


}
