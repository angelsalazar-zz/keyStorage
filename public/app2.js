angular.module('app',[
  'app.login',
  'app.signup',
  'app.home',
  'app.testing',
  'angular-jwt',
  'angular-storage',
  'ui.router'
])
.config(function($urlRouterProvider, jwtOptionsProvider, $httpProvider){
  $urlRouterProvider.otherwise('/');

  jwtOptionsProvider.config({
    authHeader : 'x-access-token',
    authPrefix : '',
    tokenGetter: ['store', function(store) {
        return store.get('token');
      }]
  });
  $httpProvider.interceptors.push('jwtInterceptor');
})
.run(function($rootScope, $state, store, jwtHelper){
  // $stateChangeStart comes from ui.router
  // RootScope watching for that event
  $rootScope.$on('$stateChangeStart',function(e, to){
    // If where user intends to go has data and data is auth
    if(to.data && to.data.auth){
      // then check if user has a token and if token is not expired
      if(!store.get('token') || jwtHelper.isTokenExpired(store.get('token'))){
        // if so, then prevent the change and redirect to login
        e.preventDefault();
        $state.go('login');
      }
    }
  })
})
