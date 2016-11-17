angular.module('app').controller('KeyController', KeyController);

function KeyController($scope, $stateParams, KeyFactory, ProjectFactory, VerifyService, $timeout) {
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

  $scope.showPassword = function(){
    VerifyService
      .authenticateUserPassword($scope.user.password, $scope.project._id, $scope.key._id)
      .then(function(response){
        $scope.keyPassword = response.data.password;
        $scope.action = 'fa-copy';
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
    var kP = document.getElementById('keyPassword');
    // Create range object
    var range = document.createRange();
    // set the node to select the range
    range.selectNode(kP);
    // add the Range to the set of window selections
    window.getSelection().addRange(range);
    try{
      var isCopied = document.execCommand('copy');
      if(isCopied)
        $scope.action = 'fa-paste';
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
