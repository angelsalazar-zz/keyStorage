angular.module('app').controller('ProfileController', ProfileController);

function ProfileController($scope, UserFactory, jwtHelper, store){
  UserFactory
    .get(jwtHelper.decodeToken(store.get('token'))._id)
    .then(function (response) {
      $scope.user = response.data;
    }, function (response) {
      console.log(response);
    });

  $scope._hasLastName = function (lastname){
    return lastname ? lastname : 'no lastname';
  };
  $scope.cleanForm = function () {
    $scope.userForm = {};
  };
};
