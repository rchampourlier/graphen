angular.module('graphen', ['ngRoute', 'ui.bootstrap', 'graphen-dashboard', 'graphen-entities', 'templates']).config(function($routeProvider) {
  return $routeProvider.otherwise({
    redirectTo: '/'
  });
});

angular.module('graphen-dashboard', ['ngRoute']);

angular.module('graphen-dashboard').config(function($routeProvider) {
  return $routeProvider.when('/', {
    templateUrl: 'dashboard/show.html',
    controller: 'DashboardController'
  });
}).controller('DashboardController', [
  '$scope', '$location', 'Entities', function($scope, $location, Entities) {
    $scope.entities = Entities.all();
    $scope.gotoNewEntity = function() {
      return $location.path('/entities/new');
    };
    return $scope.clickEntityInstance = function(instance) {
      return console.log(instance);
    };
  }
]);

angular.module('graphen-entities', ['ngRoute']);

angular.module('graphen-entities').config(function($routeProvider) {
  return $routeProvider.when('/entities/new', {
    templateUrl: 'entities/new.html',
    controller: 'EntitiesController'
  }).when('/entities/edit', {
    templateUrl: 'entities/edit.html',
    controller: 'EntitiesController'
  }).when('/entities', {
    templateUrl: 'entities/index.html',
    controller: 'EntitiesController'
  });
}).controller('EntitiesController', [
  '$scope', '$location', 'Entities', function($scope, $location, Entities) {
    $scope.defaultEntity = Entities["default"];
    $scope.entities = Entities.all();
    if ($scope.entities.length === 0 && $location.path() === '/entities') {
      $location.path('/entities/new');
    }
    $scope.gotoNew = function() {
      $scope.newEntity = {};
      return $location.path('/entities/new');
    };
    return $scope.createEntity = function() {
      Entities.create($scope.newEntity.name);
      return $location.path('/');
    };
  }
]);

angular.module('graphen-entities').factory('Entities', function() {
  return {
    data: [
      {
        name: "User Story",
        instances: [
          {
            name: "User Story 1",
            description: "User Story 1 Description"
          }, {
            name: "User Story 2",
            description: "User Story 2 Description"
          }
        ]
      }, {
        name: "Scenario",
        instances: [
          {
            name: "Scenario 1",
            description: "Scenario 1 Description"
          }, {
            name: "Scenario 2",
            description: "Scenario 2 Description"
          }
        ]
      }, {
        name: "Model",
        instances: [
          {
            name: "Model 1",
            description: "Model 1 Description"
          }, {
            name: "Model 2",
            description: "Model 2 Description"
          }
        ]
      }
    ],
    "default": {
      name: ""
    },
    all: function() {
      return this.data;
    },
    create: function(name) {
      return this.data.push({
        name: name
      });
    }
  };
});
