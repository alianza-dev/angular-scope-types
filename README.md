# angular-scope-types

[![npm version](https://img.shields.io/npm/v/angular-scope-types.svg?style=flat-square)](https://www.npmjs.org/package/angular-scope-types)
[![npm downloads](https://img.shields.io/npm/dm/angular-scope-types.svg?style=flat-square)](http://npm-stat.com/charts.html?package=angular-scope-types)
[![Build Status](https://snap-ci.com/alianza-dev/angular-scope-types/branch/master/build_image)](https://snap-ci.com/alianza-dev/angular-scope-types/branch/master)
[![Code Coverage](https://img.shields.io/codecov/c/github/alianza-dev/angular-scope-types.svg?style=flat-square)](https://codecov.io/github/alianza-dev/angular-scope-types)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/alianza-dev/angular-scope-types?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## [Demo](https://jsbin.com/kuqeye/edit?html,js,output)

This is still in the early stages. This is currently available as a beta on `npm`. Basically this is intended
to bring a concept like
[React `propTypes`](https://facebook.github.io/react/docs/reusable-components.html#prop-validation) to Angular.

This is based on trying to support [this issue](https://github.com/angular/angular.js/issues/11657) with as clean an api
as possible.


## Usage

angular-scope-types uses [api-check](https://github.com/kentcdodds/api-check) to do api checking. api-check is basically
React propTypes without React. So you'll need to install `api-check` into your project and include the script first. It
is available on `npm` via `npm install --save api-check`

You will then create your own instance of `apiCheck` and use that to create your own instance of `angular-scope-types`.
(Note, you don't have to create your own instance, but it is recommended).

Both `api-check` and `angular-scope-types` are exported as UMD modules meaning you can use them with CommonJS, AMD, or
as globals (`apiCheck` and `angularScopeTypes` respectively).

Here's a quick example for recommended usage (uses globals):

```javascript

// create your apiCheckInstance
var myApiCheck = apiCheck({
  output: {
    prefix: 'Global prefix',
    suffix: 'global suffix',
    docsBaseUrl: 'https://example.com/errors-and-warnings#'
  },
  disabled: SOME_VARIABLE_THAT_SAYS_YOU_ARE_ON_PRODUCTION
}, {
  /* custom checkers if you wanna */
});


// create your angularScopeTypesInstance
var myScopeTypes = angularScopeTypes({
  disabled: SOME_VARIABLE_THAT_SAYS_YOU_ARE_ON_PRODUCTION,
  apiCheckInstance: myApiCheck
});

// get your angular module
var yourModule = angular.module('yourModule');

// add your instance's `directive` function to your module to make it injectable
yourModule.constant('myScopeTypesDirective', myScopeTypes.directive);


// later in your code for a directive:
yourModule.directive('myDirective', function(myScopeTypesDirective) {
  return myScopeTypesDirective({
    templateUrl: '/my-directive.html',
    scope: {foo: '=', bar: '@'},
    scopeTypes: getScopeTypes
  });

  function getScopeTypes(check) {
    return {
      foo: check.shape({
        isFoo: check.bool,
        isBar: check.bool,
        someNum: check.number,
        someOptional: check.object.optional
      }).strict.optional,
      bar: check.oneOf(['fooString', 'barString'])
    };
  }
});
```

See and play with [the demo](https://jsbin.com/kuqeye/edit?html,js,output) for a live example.

## LICENSE MIT
