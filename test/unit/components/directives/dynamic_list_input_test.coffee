describe 'components/directives/dynamic_list_input', ->

  $compile = $rootScope = undefined

  beforeEach module('react-list-input')
  beforeEach inject ['$compile','$rootScope', ($c, $r) ->
    $compile = $c
    $rootScope = $r
  ]

  it 'should compile properly if the scope and links are correctly set', ->
    $rootScope.defaultEntity = {name: "Default Name"}
    $rootScope.entities = []
    template = '<react-list-input items="entities" default-item="defaultEntity" item-property="name"></react-list-input>'
    element = $compile(template)($rootScope)
    expect(element.html()).toMatch /ngRepeat: item in items/