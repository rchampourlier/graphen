angular.module 'react-list-input', []
  .directive 'reactListInput', ->
    restrict: 'E'
    scope:
      items: '=items'
      defaultItem: "=defaultItem"
    #transclude: true

    link: ($scope, element, attrs) ->
      debugger
      React.renderComponent ReactComponents.ListInput(
        items: ['First item', 'Second item']
        placeholder: 'New item'
      ), element[0]