angular.module 'graphen-entities'

  .config ($routeProvider) ->
    $routeProvider

      .when '/entities/new',
        templateUrl: 'entities/new.html',
        controller: 'EntitiesController'

      .when '/entities/edit',
        templateUrl: 'entities/edit.html',
        controller: 'EntitiesController'

      .when '/entities',
        templateUrl: 'entities/index.html',
        controller: 'EntitiesController'

  .controller 'EntitiesController', ['$scope', '$location', 'Entities', ($scope, $location, Entities) ->

    $scope.defaultEntity = Entities.default
    $scope.entities = Entities.all()

    if $scope.entities.length is 0 and $location.path() is '/entities'
      $location.path '/entities/new'

    $scope.gotoNew = ->
      $scope.newEntity = {}
      $location.path '/entities/new'

    $scope.createEntity = ->
      Entities.create $scope.newEntity.name
      $location.path '/'
  ]
