angular.module 'graphen', [
  'ngRoute',
  'ui.bootstrap',
  'react-list-input',
  'graphen-home',
  'graphen-entities',
  'templates'
]
  .config ($routeProvider) ->
    $routeProvider
      .otherwise
        redirectTo: '/'