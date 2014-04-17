angular.module('graphen', ['ngRoute', 'dynamic-list-input', 'graphen-home', 'graphen-entities', 'templates']).config(function($routeProvider) {
  return $routeProvider.otherwise({
    redirectTo: '/'
  });
});



angular.module('graphen-entities', ['ngRoute']).config(function($routeProvider) {
  return $routeProvider.when('/entities/new', {
    templateUrl: 'entities/new.html',
    controller: 'EntitiesController'
  });
}).controller('EntitiesController', function($scope) {
  $scope.defaultEntity = {
    name: ""
  };
  return $scope.entities = [];
});

angular.module('graphen-home', ['ngRoute']).config(function($routeProvider) {
  return $routeProvider.when('/', {
    templateUrl: 'home/home.html',
    controller: 'HomeController'
  });
}).controller('HomeController', function($scope) {
  return $scope.title = "Home!";
});

angular.module('dynamic-list-input', []).directive('dynamicListInput', function() {
  return {
    restrict: 'E',
    scope: {
      items: '=items',
      defaultItem: "=defaultItem"
    },
    template: '<div ng-repeat="item in items">' + '<input type="text" name="itemName" ng-model="item.name" value="{{item.name}}" placeholder="Entity Name (e.g. Product, Feature, User Story, Data...)"></input>' + '</div>',
    link: function(scope, element, attrs) {
      var cleanupEmptyEntries, createNewEntry, observer, removeLastItemWatcher, watchers;
      watchers = [];
      observer = function(newValue, oldValue, scope) {
        if ((newValue != null) && (oldValue != null)) {
          if (newValue.length > 0 && oldValue.length === 0) {
            return createNewEntry();
          } else if (newValue.length === 0 && oldValue.length > 0) {
            return cleanupEmptyEntries();
          }
        }
      };
      createNewEntry = function() {
        var index, newEntry, observedPath;
        newEntry = _.extend({}, scope.defaultItem);
        scope.items.push(newEntry);
        index = scope.items.length - 1;
        observedPath = 'items[' + index + '].name';
        return watchers[index] = scope.$watch(observedPath, observer);
      };
      cleanupEmptyEntries = function() {
        return _.each(scope.items, function(element, index, list) {
          if (element.name.length === 0 && index < (list.length - 1)) {
            scope.items = _.without(scope.items, element);
            return removeLastItemWatcher();
          }
        });
      };
      removeLastItemWatcher = function() {
        var lastIndex;
        lastIndex = scope.items.length - 1;
        watchers[lastIndex]();
        return watchers = watchers.slice(0, +(lastIndex - 1) + 1 || 9e9);
      };
      return createNewEntry();
    }
  };
});
