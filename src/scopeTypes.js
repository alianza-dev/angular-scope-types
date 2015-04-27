import angular from 'angular-fix';
import apiCheckFactory from 'api-check';
import checkerFactories from './checkers';


export default scopeTypesFactory;

function scopeTypesFactory({disabled = false} = {disabled: false}) {
  const scopeTypes = apiCheckFactory({
    output: {prefix: 'api-check-angular'},
    disabled
  });
  // manually adding checkers so we have an instance of scopeTypes to pass them.
  angular.forEach(checkerFactories, (factory, name) => {
    scopeTypes[name] = factory({scopeTypes, disabled});
  });

  scopeTypes.directive = validateDirective;

  return scopeTypes;

  function validateDirective(ddo) {
    scopeTypes.warn(scopeTypes.ddo, ddo, {prefix: 'creating directive'});
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
        scopeTypes.warn(checker, context[name], {prefix: `${ddo.name}Directive`});
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
