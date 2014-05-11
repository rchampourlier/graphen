angular.module 'dynamic-list-input', []
  .directive 'dynamicListInput', ['$timeout', ($timeout) ->
    restrict: 'E'
    scope:
      items: '=items'
      defaultItem: "=defaultItem"
    transclude: true

    template: '<div ng-repeat="item in items" ng-transclude>' +
              '</div>'

    link: ($scope, element, attrs) ->

      observedProperty = attrs.itemProperty

      processItemsChanges = (newItems, oldItems) ->
        _.each newItems, (newItem, index) ->
          oldItem = oldItems[index]
          if newItem? and oldItem?
            newItemProperty = newItem[observedProperty]
            oldItemProperty = oldItem[observedProperty]
            if newItemProperty.length is 0 and oldItemProperty.length > 0
              dropItemAtIndex(index)
            else if oldItemProperty.length is 0 and newItemProperty.length > 0
              createNewItem()

      createNewItem = ->
        newEntry = _.extend({}, $scope.defaultItem)
        $scope.items.push newEntry
        # $watch ... with true to ensure it looks at values
        # in the array

      dropItemAtIndex = (index) ->
        item = $scope.items[index]
        $scope.items = _.without($scope.items, item)
        $timeout ->
          # We put this in a $timeout call with invokeApply=false
          # so that we won't get a $apply in $apply exception.
          # Not fully understanding why yet, but it works...
          focusOnDropAtIndex index
        , 0.1, false

      focusOnDropAtIndex = (index) ->
        children = element[0].children
        if children.length is 1
          focusedChild = children[0].children[0]
        else
          focusedIndex = if index is 0 then 1 else (index - 1)
          focusedChild = children[focusedIndex].children[0]
        focusedChild.focus()

      $scope.$watch 'items', processItemsChanges, true
      createNewItem()
  ]