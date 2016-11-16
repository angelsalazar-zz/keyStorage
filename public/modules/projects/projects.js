angular.module('app').controller('ProjectsController', ProjectsController);


function ProjectsController($scope, ProjectFactory){
  ProjectFactory
    .all()
    .then(function(response){
      $scope.projects = response.data;
    }, function(response){
      console.log(response);
    })

  $scope.createProject = function(){
    ProjectFactory
      .create($scope.project.name, $scope.project.description)
      .then(function(response){
        console.log(response)
        $scope.projects.push(response.data);
      }, function(response){
        console.log(response);
      })
      $scope.closeModal();
  };

  $scope.deleteProject = function(projectId, index){
    ProjectFactory
      .delete(projectId)
      .then(function(response){
        $scope.projects.splice(index, 1);
      }, function(response){
        console.log(response)
      })
  };

  $scope.openModal = function(){
    document.getElementById('modal').style.display='block';
  };

  $scope.closeModal = function(){
    document.getElementById('modal').style.display='none'
  }
}
