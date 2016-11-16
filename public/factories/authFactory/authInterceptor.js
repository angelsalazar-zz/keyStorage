// angular.module('app').factory('AuthInterceptor', AuthInterceptor);
//
// function AuthInterceptor(store){
//   var AuthInterceptor = {};
//
//   AuthInterceptor.request = function(config){
//     // Check if config object has headers property
//     // if so, use them, otherwise pass an empty object
//     config.headers = config.headers || {};
//     // check if we have a token, if so, send it as header
//     var token =  store.get('token');
//     if(token){
//       config.headers['x-access-token'] = token;
//     }
//     return config;
//   }
//   return {
//     request : request,
//     response : response,
//     responseError : responseError
//   }
//
//   function request(config){
//     // Check if config object has headers property
//     // if so, use them, otherwise pass an empty object
//     config.headers = config.headers || {};
//     if(store.get('token')){
//       config.headers.
//     }
//   }
// }
