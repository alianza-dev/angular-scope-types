var app = angular.module('app', []);

app.controller('MainCtrl', function MainCtrl($timeout) {
  var vm = this;

  vm.goodFoo = {
    isFoo: true,
    isBar: false,
    someNum: 32
  };

  $timeout(function() {
    vm.badFoo = '';
  }, 1500);
});


app.constant('scopeTypesDirective', angularScopeTypes().directive);

app.directive('scopeTypedDir', function(scopeTypesDirective) {
  return scopeTypesDirective({
    template: `
      <div>
        This was scope type checked!
        <div>Passed: {{$scopeTypesResults.__passed}}</div>
        <div>Failed: {{$scopeTypesResults.__failed}}</div>
      </div>
    `,
    scope: {foo: '=', bar: '@'},
    scopeTypes: getScopeTypes
  });

  function getScopeTypes(st) {
    return {
      foo: st.shape({
        isFoo: st.bool,
        isBar: st.bool,
        someNum: st.number,
        someOptional: st.object.optional
      }).strict.optional,
      bar: st.oneOf(['fooString', 'barString'])
    };
  }

});
