angular.module('app').controller('KeyController', KeyController);

function KeyController($scope, $stateParams, KeyFactory, ProjectFactory, VerifyService, $timeout) {
  ProjectFactory
    .get($stateParams._projectId)
    .then(function (response) {
      $scope.project = response.data;
      $scope.keyPassword = "asdaa";
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

  $scope.showPassword = function(){
    VerifyService
      .authenticateUserPassword($scope.user.password, $scope.project._id, $scope.key._id)
      .then(function(response){
        $scope.keyPassword = response.data.password;
      }, function(response){
        console.log(response);
        $scope.error = response.data;
        $timeout(function(){
          $scope.error = null;
        }, 8000);
      })

    $scope.closeModal();
  };
  $scope.copyPassword = function(){
    document.getElementById('keyPassword').select();
    try{
      var isCopied = document.execCommand('copy');
      console.log(isCopied)
    } catch (err) {
      console.log("whoops");
    }

  }
  $scope.openModal = function(){
    document.getElementById('modal').style.display='block';
  };

  $scope.closeModal = function(){
    document.getElementById('modal').style.display='none'
  };
}
