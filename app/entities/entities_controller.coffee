angular.module 'graphen-entities', ['ngRoute']
  
  .config ($routeProvider) ->
    $routeProvider
      .when '/entities/new',
        templateUrl: 'entities/new.html',
        controller: 'EntitiesController'

  .controller 'EntitiesController', ($scope) ->
    $scope.defaultEntity = {name: ""}
    $scope.entities = []
