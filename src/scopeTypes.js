import angular from 'angular-fix';
import apiCheckFactory from 'api-check';
import checkerFactories from './checkers';

const defaultOutput = {prefix: 'api-check-angular'};

export default scopeTypesFactory;

function scopeTypesFactory({
  disabled = false,
  output = defaultOutput
  } = {
  disabled: false,
  output: defaultOutput
}) {
  const scopeTypes = apiCheckFactory({
    output: output,
    disabled
  });
  // manually adding checkers so we have an instance of scopeTypes to pass them.
  angular.forEach(checkerFactories, (factory, name) => {
    scopeTypes[name] = factory({scopeTypes, disabled});
  });

  scopeTypes.directive = validateDirective;

  return scopeTypes;

  function validateDirective(ddo) {
    if (scopeTypes.config.disabled) {
      return ddo;
    }
    scopeTypes.warn(scopeTypes.ddo, ddo, {prefix: 'creating directive with scopeTypes'});
    // Would really love to not have to extend the ddo's controller
    // like this. Suggestions welcome!
    ddo.controller = extendController(ddo.controller, scopeTypesController);

    scopeTypesController.$inject = ['$scope'];
    function scopeTypesController($scope) {
      var context = $scope;
      if (ddo.bindToController) {
        context = context[ddo.controllerAs];
      }

      let typeDefinitions = ddo.scopeTypes(scopeTypes);
      scopeTypes.warn(
        scopeTypes.objectOf(scopeTypes.func), typeDefinitions, {prefix: `getting scope types for ${ddo.name}`}
      );

      $scope.$scopeTypesResults = {__passed: 0, __failed: 0};

      angular.forEach(typeDefinitions, (check, name) => {
        if (!angular.isDefined(context[name])) {
          let prefix = ddo.controllerAs ? ddo.controllerAs + '.' : '';
          const stopWatching = $scope.$watch(`${prefix}${name}`, (value, oldValue) => {
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
        $scope.$scopeTypesResults[name] = scopeTypes.warn(
          checker, context[name], {prefix: `${ddo.name}Directive for "${name}"`}
        );
        updateData();
      }

      function updateData() {
        let passedCount = 0;
        let failedCount = 0;
        const ignore = ['__passed', '__failed'];
        angular.forEach($scope.$scopeTypesResults, (result, name) => {
          if (ignore.indexOf(name) === -1) {
            if (result.passed) {
              passedCount++;
            } else {
              failedCount++;
            }
          }
        });
        $scope.$scopeTypesResults.__passed = passedCount;
        $scope.$scopeTypesResults.__failed = failedCount;
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
