angular.module 'graphen', [
  'ngRoute',
  'ui.bootstrap',
  'dynamic-list-input',
  'graphen-home',
  'graphen-entities',
  'templates'
]
  .config ($routeProvider) ->
    $routeProvider
      .otherwise
        redirectTo: '/'