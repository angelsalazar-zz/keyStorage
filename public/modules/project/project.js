angular.module('app').controller('ProjectController',  ProjectController);


function ProjectController($scope, $stateParams, ProjectFactory, SocialFactory, KeyFactory){

  ProjectFactory
    .get($stateParams._id)
    .then(function(response){
      $scope.project = response.data;
      $scope.providersList = SocialFactory.get()
    }, function(response){
      console.log(response);
    });

  $scope.createKey = function(){
    KeyFactory
      .create($scope.project._id, $scope.key.provider, $scope.key.email, $scope.key.password)
      .then(function(response){
        $scope.project.keys.push(response.data);
      }, function(response){
        console.log(response)
      })
      $scope._resetForm();
  }

  $scope.deleteKey = function(keyId, index){
    KeyFactory
      .delete($scope.project._id, keyId)
      .then(function(response){
        $scope.project.keys.splice(index, 1);
      }, function(response){
        console.log(response);
      })
  }

  $scope._resetForm = function(){
    $scope.key = {}
  }
}
