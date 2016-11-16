angular.module('app.home',[
  'angular-storage',
  'angular-jwt',
  'ui.router'
])
.config(function($stateProvider){
  $stateProvider
    .state('home',{
      url : '/',
      controller : "HomeCtrl",
      templateUrl : "modules/home/home.html",
      data : {
        auth : true
      }
    })
})
.controller('HomeCtrl',function($scope, store, jwtHelper, $http, $window, $state, socialFactory){
  var API = $window.location.origin + '/api';
  $scope.init = function(){
    // https://www.sitepoint.com/creating-a-typeahead-widget-with-angularjs/
    $scope.providersList = [
      { name : 'google' },
      { name : 'twitter' },
      { name : 'facebook' },
      { name : 'youtube' },
      { name : 'windows' },
      { name : 'trello' },
      { name : 'snapchat' },
      { name : 'pinterest' },
      { name : 'paypal' },
      { name : 'linkedin' },
      { name : 'instagram' },
      { name : 'github' },
      { name : 'gitlab' },
      { name : 'flickr' },
      { name : 'dropbox' },
      { name : 'bitbucket' },
      { name : 'amazon' },
      { name : 'android' },
      { name : 'skype' },
      { name : 'slack' },
      { name : 'stack-overflow' },
      { name : 'spotify' }
    ]
  }
  $scope.createKey = function(){
    var keyData = {
      provider : $scope.key.provider,
      email : $scope.key.email,
      password : $scope.key.password
    };
    console.log(keyData);
  };

  $scope.logOut = function(){
    store.remove('token');
    $state.go('login');
  };

  $scope.authUser = function(){
    return jwtHelper.decodeToken(store.get('token'));
  };

})
