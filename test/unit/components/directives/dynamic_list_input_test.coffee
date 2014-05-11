describe 'components/directives/dynamic_list_input', ->

  $compile = $rootScope = undefined

  beforeEach module('graphen')
  beforeEach inject ['$compile','$rootScope', ($c, $r) ->
    $compile = $c
    $rootScope = $r
  ]

  it 'should compile properly if the scope and links are correctly set', ->
    $rootScope.defaultEntity = {name: "Default Name"}
    $rootScope.entities = []
    template = '<dynamic-list-input items="entities" default-item="defaultEntity" item-property="name"></dynamic-list-input>'
    element = $compile(template)($rootScope)
    expect(element.html()).toMatch /ngRepeat: item in items/