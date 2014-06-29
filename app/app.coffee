angular.module 'graphen', [
  'ngRoute',
  'ui.bootstrap',
  'graphen-home',
  'graphen-entities',
  'templates'
]
  .config ($routeProvider) ->
    $routeProvider
      .otherwise
        redirectTo: '/'