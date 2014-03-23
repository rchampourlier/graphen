angular.module 'graphen', [ 'ngRoute', 'graphen-home', 'templates' ]

  .config ($routeProvider) ->

    $routeProvider

      .otherwise
        redirectTo: '/'