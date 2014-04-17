angular.module 'dynamic-list-input', []
  .directive 'dynamicListInput', ->
    restrict: 'E'
    scope:
      items: '=items'
      defaultItem: "=defaultItem"

    template: '<div ng-repeat="item in items">' +
               '<input type="text" name="itemName" ng-model="item.name" value="{{item.name}}" placeholder="Entity Name (e.g. Product, Feature, User Story, Data...)"></input>' +
               '</div>'

    link: (scope, element, attrs) ->

      watchers = []

      observer = (newValue, oldValue, scope) ->
        if newValue? and oldValue?
          if newValue.length > 0 and oldValue.length is 0 # Entered a value
            createNewEntry()
          else if newValue.length is 0 and oldValue.length > 0 # Cleared the value
            cleanupEmptyEntries()

      createNewEntry = ->
        newEntry = _.extend({}, scope.defaultItem)
        scope.items.push newEntry
        index = scope.items.length - 1
        observedPath = 'items[' + index + '].name'
        watchers[index] = scope.$watch observedPath, observer

      # Cleans empty entries (except the last one) up.
      cleanupEmptyEntries = ->
        _.each scope.items, (element, index, list) ->
          if element.name.length is 0 and index < (list.length - 1)
            # Empty element and not the last one
            scope.items = _.without(scope.items, element)
            removeLastItemWatcher()

      # Removes the watcher on the last item (we always only need to remove
      # this one, the other are still useful!).
      removeLastItemWatcher = ->
        lastIndex = scope.items.length - 1
        watchers[lastIndex]()
        watchers = watchers[0..lastIndex-1]

      createNewEntry()