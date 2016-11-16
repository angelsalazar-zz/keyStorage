angular
  .module('app.testing',[
    'ui.router'
  ])
  .config(TestingConfig)
  .controller('TestingController', TestingController);

function TestingConfig($stateProvider){
  $stateProvider
    .state('testing',{
      url : '/testing',
      controller : 'TestingController',
      templateUrl : "modules/testing/testing.html",
      data : {
        auth : true
      }
    })
};
function TestingController(){
  console.log("testing");
};
