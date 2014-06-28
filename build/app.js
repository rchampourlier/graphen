angular.module('graphen', ['ngRoute', 'ui.bootstrap', 'react-list-input', 'graphen-home', 'graphen-entities', 'templates']).config(function($routeProvider) {
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

angular.module('react-list-input', []).directive('reactListInput', function() {
  return {
    restrict: 'E',
    scope: {
      items: '=items',
      defaultItem: "=defaultItem"
    },
    link: function($scope, element, attrs) {
      debugger;
      return React.renderComponent(ReactComponents.ListInput({
        items: ['First item', 'Second item'],
        placeholder: 'New item'
      }), element[0]);
    }
  };
});

window.ReactComponents = [];

ReactComponents.ListInput = React.createClass({
  displayName: 'ListInput',
  key: -1,
  getKey: function() {
    return this.key += 1;
  },
  buildItemsFromProps: function() {
    var itemTexts, items;
    itemTexts = this.props.items;
    items = [];
    _.each(itemTexts, (function(_this) {
      return function(itemText, index) {
        return items[index] = {
          key: _this.getKey(),
          text: itemText
        };
      };
    })(this));
    items.push(this.defaultItem(items.length));
    return items;
  },
  defaultItem: function() {
    return {
      key: this.getKey(),
      text: ''
    };
  },
  updateItemForKey: function(items, key, newText) {
    _.each(items, function(item) {
      if (item.key === key) {
        return item.text = newText;
      }
    });
    return this.updateForEmptyness(items);
  },
  updateForEmptyness: function(items) {
    var newItems;
    newItems = [];
    _.each(items, function(item, index) {
      var onLastItem;
      onLastItem = index === items.length - 1;
      if (item.text.length !== 0 || onLastItem) {
        return newItems.push(item);
      }
    });
    if ((newItems.length > 0 && _.last(newItems).text.length !== 0) || newItems.length === 0) {
      newItems.push(this.defaultItem());
    }
    return newItems;
  },
  getInitialState: function() {
    return {
      items: this.buildItemsFromProps()
    };
  },
  updateStateItem: function(key, newText) {
    return this.setState({
      items: this.updateItemForKey(this.state.items, key, newText)
    });
  },
  onChange: function(key, event) {
    this.focusedRef = 'item-' + key;
    return this.updateStateItem(key, event.currentTarget.value);
  },
  componentDidMount: function() {
    return this.focusLastItemIfNeeded();
  },
  focusLastItemIfNeeded: function() {
    var refs;
    refs = _.keys(this.refs);
    if (!_.contains(this.focusedRef, refs)) {
      this.focusedRef = _.last(refs);
      return this.refs[this.focusedRef].getDOMNode().focus();
    }
  },
  render: function() {
    var component;
    component = React.DOM.div(null, React.DOM.h3(null, 'LIST INPUT'), this.state.items.map((function(_this) {
      return function(item) {
        return React.DOM.input({
          key: item.key,
          ref: 'item-' + item.key,
          value: item.text,
          placeholder: _this.props.placeholder,
          onChange: _this.onChange.bind(_this, item.key)
        });
      };
    })(this)));
    if (this.isMounted()) {
      this.focusLastItemIfNeeded();
    }
    return component;
  }
});
