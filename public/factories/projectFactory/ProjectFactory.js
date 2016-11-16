angular.module('app').factory('ProjectFactory', ProjectFactory);

function ProjectFactory($window, $http, jwtHelper){
  // API BASE URL
  var API = $window.location.origin + '/api';
  var ProjectFactory = {};

  ProjectFactory.all = function(){
    return $http.get(API + '/projects');
  };

  ProjectFactory.create = function(projectName, projectDescription){
    var newProject = {
      name : projectName,
      description : projectDescription
    };

    return $http.post(API + '/projects', newProject);
  };

  ProjectFactory.get = function(id){
    return $http.get(API + '/projects/' + id);
  };

  ProjectFactory.edit = function(projectName, projectDescription){
    var newProjectData = {
      name : projectName,
      description : projectDescription
    };
    return $http.put(API + '/projects', newProject);
  };

  ProjectFactory.delete = function(id){
    return $http.delete(API + '/projects/' + id);
  };

  return ProjectFactory;
};
