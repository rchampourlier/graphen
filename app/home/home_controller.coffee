angular.module 'graphen-home', ['ngRoute']
  
  .config ($routeProvider) ->
    $routeProvider
      .when '/',
        templateUrl: 'home/home.html',
        controller: 'HomeController'

  .controller 'HomeController', ($scope) ->

    $scope.title = "Home!"