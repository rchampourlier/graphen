# dashboard/dashboard_controller
#
# Handled routes:
#   - / => redirects to /entities
#
angular.module 'graphen-dashboard'

  .config ($routeProvider) ->
    $routeProvider
      .when '/',
        templateUrl: 'dashboard/show.html',
        controller: 'DashboardController'

  .controller 'DashboardController', ['$scope', '$location', 'Entities', ($scope, $location, Entities) ->

    $scope.entities = Entities.all()

    $scope.gotoNewEntity = ->
      $location.path '/entities/new'

    $scope.clickEntityInstance = (instance) ->
      console.log instance
  ]
