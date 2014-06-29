angular.module 'graphen', [
  'ngRoute',
  'ui.bootstrap',
  'graphen-dashboard',
  'graphen-entities',
  'templates'
]
  .config ($routeProvider) ->
    $routeProvider
      .otherwise
        redirectTo: '/' # handled by dashboard/dashboard_controller
