angular.module('app', [
  'angular-jwt',
  'angular-storage',
  'ui.router'
])
.config(AppConfig)
.run(AppRun)

function AppConfig($stateProvider, $urlRouterProvider, jwtOptionsProvider, $httpProvider){
  jwtOptionsProvider.config({
    authHeader : 'x-access-token',
    authPrefix : '',
    tokenGetter: ['store', function(store) {
        return store.get('token');
      }]
  });
  $httpProvider.interceptors.push('jwtInterceptor');
  $stateProvider
    .state('home', {
      url : '/',
      templateUrl : 'modules/home/home.html',
      controller : HomeController,
      data : {
        auth : true
      }
    })
    .state('login', {
      url : '/login',
      templateUrl : 'modules/login/login.html',
      controller : LoginController,
      data : {
        auth : false
      }
    })
    .state('signup', {
      url : '/signup',
      templateUrl : 'modules/signup/signup.html',
      controller : SignupController,
      data : {
        auth : false
      }
    })
    .state('home.projects', {
      url : 'projects',
      templateUrl : 'modules/projects/projects.html',
      controller : ProjectsController,
      data : {
        auth : true
      }
    })
    .state('home.project', {
      url : 'projects/:_id',
      templateUrl : 'modules/project/project.html',
      controller : ProjectController,
      data : {
        auth : true
      }
    })
    .state('home.key', {
      url : 'projects/:_projectId/keys/:_keyId',
      templateUrl : 'modules/key/key.html',
      controller : KeyController,
      data : {
        auth : true
      }
    })
    .state('home.profile', {
      url : 'profile',
      templateUrl : 'modules/profile/profile.html',
      controller :  ProfileController,
      data : {
        auth : true
      }
    })
    // .state('home.keys', {
    //   url : 'keys',
    //   templateUrl : 'modules/keys/keys.html',
    //   controller : KeysController
    // })
  $urlRouterProvider.otherwise('/');
}

function AppRun($rootScope, store, $state, jwtHelper){
  $rootScope.$on('$stateChangeStart', function(e, to){
    // if where I attend to go has data and does not need auth
    // if(to.data && !to.data.auth){
    //   // check if
    //   if(store.get('token') && !jwtHelper.isTokenExpired(store.get('token'))){
    //     console.log("second check")
    //     e.preventDefault();
    //     $state.go('home');
    //   }
    // }
    // if where I attend to go has data and needs auth,
    if(to.data && to.data.auth){
      //then if user has token and it is not expired
      if(!store.get('token') || jwtHelper.isTokenExpired(store.get('token'))){
        // if so, then prevent transition and redirect to login
        e.preventDefault();
        $state.go('login');
      }
    }
  });
}
