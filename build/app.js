angular.module('graphen', ['ngRoute', 'graphen-home', 'templates']).config(function($routeProvider) {
  return $routeProvider.otherwise({
    redirectTo: '/'
  });
});



angular.module('graphen-home', ['ngRoute']).config(function($routeProvider) {
  return $routeProvider.when('/', {
    templateUrl: 'home/home.html',
    controller: 'HomeController'
  });
}).controller('HomeController', function($scope) {
  return $scope.title = "Home!";
});
