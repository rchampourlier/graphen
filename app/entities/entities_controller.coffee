angular.module 'graphen-entities'
  
  .config ($routeProvider) ->
    $routeProvider
      
      .when '/entities/edit',
        templateUrl: 'entities/edit.html',
        controller: 'EntitiesCtrl'
      
      .when '/entities',
        templateUrl: 'entities/index.html',
        controller: 'EntitiesCtrl'

  .controller 'EntitiesCtrl', ['$scope', '$location', 'Entities', ($scope, $location, Entities) ->

    $scope.defaultEntity = Entities.default
    $scope.entities = Entities.all
    
    if $scope.entities.length is 0 and $location.path() is '/entities'
      $location.path '/entities/new'

    $scope.editEntities = ->
      $location.path '/entities/edit'

    $scope.saveEntities = ->
      $location.path '/entities'
  ]