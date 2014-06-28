ReactComponents.ListInput = React.createClass
  displayName: 'ListInput'
  key: -1

  getKey: -> (@key += 1)

  buildItemsFromProps: ->
    itemTexts = @props.items
    items = []
    _.each itemTexts, (itemText, index) => 
      items[index] = {key: @getKey(), text: itemText}
    items.push @defaultItem items.length
    items

  defaultItem: -> {key: @getKey(), text: ''}

  updateItemForKey: (items, key, newText) ->
    _.each items, (item) ->
      item.text = newText if item.key is key
    @updateForEmptyness items

  updateForEmptyness: (items) ->
    newItems = []
    _.each items, (item, index) ->
      onLastItem = index is items.length - 1
      if item.text.length isnt 0 or onLastItem
        newItems.push item
    if (newItems.length > 0 and _.last(newItems).text.length isnt 0) or newItems.length is 0
      newItems.push @defaultItem()
    newItems

  getInitialState: ->
    items: @buildItemsFromProps()

  updateStateItem: (key, newText) ->
    @setState
      items: @updateItemForKey(@state.items, key, newText)

  onChange: (key, event) ->
    @focusedRef = 'item-' + key
    @updateStateItem key, event.currentTarget.value

  componentDidMount: ->
    @focusLastItemIfNeeded()

  focusLastItemIfNeeded: ->
    refs = _.keys @refs
    unless _.contains @focusedRef, refs
      @focusedRef = _.last(refs)
      @refs[@focusedRef].getDOMNode().focus()

  render: ->
    component = React.DOM.div(null,
      React.DOM.h3(null, 'LIST INPUT'),
      @state.items.map (item) =>
        React.DOM.input(
          key: item.key
          ref: 'item-' + item.key
          value: item.text
          placeholder: @props.placeholder
          onChange: @onChange.bind @, item.key
        )
    )
    @focusLastItemIfNeeded() if @isMounted()
    component