import checkerUtils from './checkerUtils';

export default function ddo({
  scopeTypes, strictDi = false, disabled = false
  } = {
  strictDi: false, disabled: false
}) {
  if (disabled) {
    return checkerUtils.noopChecker;
  }

  const check = scopeTypes;
  if (!check) {
    throw new Error('Must provide an instance of scopeTypes');
  }
  const stringOrFunc = scopeTypes.oneOfType([check.string, check.func]);
  const ddoShape = check.shape({
    priority: check.number.optional,
    template: check.shape.ifNot('templateUrl', stringOrFunc).optional,
    templateUrl: check.shape.ifNot('template', check.string).optional,
    transclude: check.bool.optional,
    restrict: check.oneOf(['A', 'E', 'C', 'AE', 'EA', 'AEC', 'AC', 'EC']).optional,
    templateNamespace: check.oneOf(['html', 'svg', 'math']).optional,
    scope: check.oneOfType([check.bool, check.objectOf(check.string)]).optional, // TODO, make an advanced scope checker
    controller: check.injectableFunction.optional,
    controllerAs: check.string.optional,
    bindToController: check.oneOfType([check.bool, check.objectOf(check.string)]).optional,
    // TODO, tell the version of angular and use a scope checker for +1.4
    require: check.typeOrArrayOf(check.string).optional, // TODO make a pattern checker.
    // 'siblingDirectiveName', // or // ['^parentDirectiveName', '?optionalDirectiveName', '?^optionalParent'],
    compile: check.func.optional,
    link: check.oneOfType([
      check.func,
      check.shape({
        pre: check.func.optional,
        post: check.func.optional
      }).strict
    ]).optional,
    scopeTypes: check.func,
    scopeTypesFunction: check.oneOf(['warn', 'throw']).optional,
    data: check.object.optional
  }).strict;

  return check.oneOfType([check.func, ddoShape]);
}
