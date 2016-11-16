angular.module('app').directive('autoComplete', autoComplete);

function autoComplete(){
  return {
    restrict : 'E',
    templateUrl : 'directives/auto-complete/auto-complete.js',
    controller : function($scope, socialFactory){
      $scope.providers = socialFactory.get();
    }
  };
};
// <!DOCTYPE html>
// <html ng-app="app" ng-controller="AppController">
// <head>
//   <meta charset="utf-8">
//   <meta name="viewport" content="width=device-width">
//   <title>JS Bin</title>
// </head>
// <body>
// <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>
// <script>

  //@ variable,
  //= object,
  //& function
    // .directive('autoComplete',function(){
    //   return {
    //     restrict : 'E',
    //     template : '<br>' +
    //       '<ul ng-if="provider && provider.length > 0">'+
    //         '<li ng-click="select(item)" ng-repeat="item in providerList | filter:provider">{{item.name}}</li></ul>',
    //     scope : {
    //       provider : '@',
    //       providerList : '='
    //     },
    //     link : function(scope, element, attrs){
    //       scope.select = function(item){
    //         scope.apply(function () {
    //            this.provider = item.name;
    //         });
    //       }
    //     }
    //   }
    // })
// </script>
// </body>
//   <input type="text" ng-model="test">
//   <br>
//   <auto-complete provider="{{test}}" provider-list="providers"></auto-complete>
//   <!-- <ul>
//     <li ng-repeat="item in providerList">{{item.name}}</li>
//   </ul> -->
// </html>
