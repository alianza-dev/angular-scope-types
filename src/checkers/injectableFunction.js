import apiCheck from 'api-check';

export default function injectableFunction({strictDi = false, disabled = false} = {strictDi: false, disabled: false}) {
  const $injectProperty = apiCheck.func.withProperties({
    $inject: apiCheck.arrayOf(apiCheck.string)
  });

  const arraySyntax = apiCheck.utils.checkerHelpers.setupChecker(function arraySyntax(val, name, location) {
    if (!Array.isArray(val)) {
      return apiCheck.utils.getError(name, location, apiCheck.array.type);
    }
    let copy = val.slice();
    const fn = copy.pop();
    const arrayOfStringsChecker = apiCheck.arrayOf(apiCheck.string);
    const notArrayOfStrings = arrayOfStringsChecker(copy);
    if (apiCheck.utils.isError(notArrayOfStrings)) {
      return apiCheck.utils.getError(name, location, arrayOfStringsChecker.type);
    }
    if (typeof fn !== 'function') {
      return apiCheck.utils.getError(name, location, apiCheck.func.type);
    }
  }, {type: 'angular injectable function (array syntax)'}, disabled);

  const types = [$injectProperty, arraySyntax];

  if (!strictDi) {
    types.push(apiCheck.func);
  }

  return apiCheck.oneOfType(types);
}
