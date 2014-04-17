angular.module 'graphen', [ 'ngRoute', 'dynamic-list-input', 'graphen-home', 'graphen-entities', 'templates' ]

  .config ($routeProvider) ->

    $routeProvider

      .otherwise
        redirectTo: '/'