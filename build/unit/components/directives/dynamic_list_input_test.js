describe('components/directives/dynamic_list_input', function() {
  var $compile, $rootScope;
  $compile = $rootScope = void 0;
  beforeEach(module('dynamic-list-input'));
  beforeEach(inject([
    '$compile', '$rootScope', function($c, $r) {
      $compile = $c;
      return $rootScope = $r;
    }
  ]));
  return it('should compile properly if the scope and links are correctly set', function() {
    var element, template;
    $rootScope.defaultEntity = {
      name: "Default Name"
    };
    $rootScope.entities = [];
    template = '<dynamic-list-input items="entities" default-item="defaultEntity" item-property="name"></dynamic-list-input>';
    element = $compile(template)($rootScope);
    return expect(element.html()).toMatch(/ngRepeat: item in items/);
  });
});
