angular.module('graphen', ['ngRoute', 'ui.bootstrap', 'graphen-home', 'graphen-entities', 'templates']).config(function($routeProvider) {
  return $routeProvider.otherwise({
    redirectTo: '/'
  });
});

angular.module('graphen-entities', ['ngRoute']);

angular.module('graphen-entities').config(function($routeProvider) {
  return $routeProvider.when('/entities/edit', {
    templateUrl: 'entities/edit.html',
    controller: 'EntitiesCtrl'
  }).when('/entities', {
    templateUrl: 'entities/index.html',
    controller: 'EntitiesCtrl'
  });
}).controller('EntitiesCtrl', [
  '$scope', '$location', 'Entities', function($scope, $location, Entities) {
    $scope.defaultEntity = Entities["default"];
    $scope.entities = Entities.all;
    if ($scope.entities.length === 0 && $location.path() === '/entities') {
      $location.path('/entities/new');
    }
    $scope.editEntities = function() {
      return $location.path('/entities/edit');
    };
    return $scope.saveEntities = function() {
      return $location.path('/entities');
    };
  }
]);

angular.module('graphen-entities').factory('Entities', function() {
  return {
    "default": {
      name: ""
    },
    all: [
      {
        name: "User Story"
      }, {
        name: "Scenario"
      }, {
        name: "Model"
      }
    ]
  };
});

angular.module('graphen-home', ['ngRoute']).config(function($routeProvider) {
  return $routeProvider.when('/', {
    templateUrl: 'home/home.html',
    controller: 'HomeController'
  });
}).controller('HomeController', function($scope) {
  return $scope.title = "Home!";
});
