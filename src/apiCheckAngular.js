import angular from 'angular-fix';
import apiCheckFactory from 'api-check';
import checkerFactories from './checkers';


export default apiCheckAngularFactory;

function apiCheckAngularFactory(disabled) {
  const checkers = {};
  angular.forEach(checkerFactories, (factory, name) => {
    checkers[name] = factory({disabled});
  });
  const apiCheckAngular = apiCheckFactory({
    output: {prefix: 'api-check-angular'},
    disabled
  }, checkers);

  apiCheckAngular.directive = validateDirective;

  const directiveApi = getDirectiveApi(apiCheckAngular);

  return apiCheckAngular;

  function validateDirective(ddo) {
    apiCheckAngular.warn(directiveApi, ddo, {prefix: 'creating directive'});
    // Would really love to not have to extend the ddo's controller
    // like this. Suggestions welcome!
    ddo.controller = extendController(ddo.controller, scopeTypesController);

    scopeTypesController.$inject = ['$scope'];
    function scopeTypesController($scope) {
      var context = $scope;
      if (ddo.bindToController) {
        context = context[ddo.controllerAs];
      }
      angular.forEach(ddo.scopeTypes, function(check, name) {
        if (!angular.isDefined(context[name])) {
          let prefix = ddo.controllerAs ? ddo.controllerAs + '.' : '';
          const stopWatching = $scope.$watch(`${prefix}${name}`, function(value, oldValue) {
            if (value !== oldValue) {
              stopWatching();
              checkOption(check, name);
            }
          });
        } else {
          checkOption(check, name);
        }
      });


      function checkOption(checker, name) {
        apiCheckAngular.warn(checker, context[name], {prefix: `${ddo.name}Directive`});
      }

    }

    return ddo;


    function extendController(originalController, newController) {
      if (!angular.isDefined(originalController)) {
        return newController;
      }
      function wrappedController($scope, $controller, $element, $attrs, $transclude) {
        const context = {$scope, $element, $attrs, $transclude};
        angular.extend(this, $controller(newController, context));
        angular.extend(this, $controller(originalController, context));
      }

      wrappedController.$inject = ['$scope', '$controller', '$element', '$attrs', '$transclude'];
      return wrappedController;
    }
  }
}

function getDirectiveApi(check) {
  const stringOrFunc = check.oneOfType([check.string, check.func]);
  const ddo = check.shape({
    priority: check.number.optional,
    template: check.shape.ifNot('templateUrl', stringOrFunc).optional,
    templateUrl: check.shape.ifNot('template', check.string).optional,
    transclude: check.bool.optional,
    restrict: check.oneOf(['A', 'E', 'AE', 'EA']).optional, // <-- TODO, more combinations
    templateNamespace: check.string.optional, // TODO, docs provided value: 'html',
    scope: check.oneOfType([check.bool, check.object]).optional, // TODO, make a scope checker
    controller: check.injectableFunction.optional,
    controllerAs: check.string.optional,
    bindToController: check.oneOfType([check.bool, check.object]).optional,
    // TODO, tell the version of angular and use a scope checker for +1.4
    require: check.string.optional, // TODO make a pattern checker.
    // 'siblingDirectiveName', // or // ['^parentDirectiveName', '?optionalDirectiveName', '?^optionalParent'],
    compile: check.func.optional,
    link: check.oneOfType([
      check.func,
      check.shape({
        pre: check.func.optional,
        post: check.func.optional
      }).strict
    ]).optional,
    scopeTypes: check.objectOf(check.func).optional
  }).strict;

  return check.oneOfType([check.func, ddo]);
}
