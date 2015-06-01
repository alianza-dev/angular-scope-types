// angular-scope-types version 1.0.0-beta.1 built with ♥ by Kent C. Dodds <kent@doddsfamily.us> (http://kent.doddsfamily.us) (ó ì_í)=óò=(ì_í ò)

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("api-check"), require("angular"));
	else if(typeof define === 'function' && define.amd)
		define(["api-check", "angular"], factory);
	else if(typeof exports === 'object')
		exports["angularScopeTypes"] = factory(require("api-check"), require("angular"));
	else
		root["angularScopeTypes"] = factory(root["apiCheck"], root["angular"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _scopeTypes = __webpack_require__(1);

	var _scopeTypes2 = _interopRequireDefault(_scopeTypes);

	exports['default'] = _scopeTypes2['default'];
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _angular = __webpack_require__(3);

	var _angular2 = _interopRequireDefault(_angular);

	var _apiCheckFactory = __webpack_require__(2);

	var _apiCheckFactory2 = _interopRequireDefault(_apiCheckFactory);

	var _checkerFactories = __webpack_require__(4);

	var _checkerFactories2 = _interopRequireDefault(_checkerFactories);

	var defaultOutput = { prefix: 'api-check-angular' };

	exports['default'] = scopeTypesFactory;

	function scopeTypesFactory() {
	  var _ref = arguments[0] === undefined ? {
	    disabled: false,
	    output: defaultOutput
	  } : arguments[0];

	  var _ref$disabled = _ref.disabled;
	  var disabled = _ref$disabled === undefined ? false : _ref$disabled;
	  var _ref$output = _ref.output;
	  var output = _ref$output === undefined ? defaultOutput : _ref$output;

	  var scopeTypes = _apiCheckFactory2['default']({
	    output: output,
	    disabled: disabled
	  });
	  // manually adding checkers so we have an instance of scopeTypes to pass them.
	  _angular2['default'].forEach(_checkerFactories2['default'], function (factory, name) {
	    scopeTypes[name] = factory({ scopeTypes: scopeTypes, disabled: disabled });
	  });

	  scopeTypes.directive = validateDirective;

	  return scopeTypes;

	  function validateDirective(ddo) {
	    if (scopeTypes.config.disabled) {
	      return ddo;
	    }
	    scopeTypes.warn(scopeTypes.ddo, ddo, { prefix: 'creating directive with scopeTypes' });
	    // Would really love to not have to extend the ddo's controller
	    // like this. Suggestions welcome!
	    ddo.controller = extendController(ddo.controller, scopeTypesController);

	    scopeTypesController.$inject = ['$scope'];
	    function scopeTypesController($scope) {
	      var context = $scope;
	      if (ddo.bindToController) {
	        context = context[ddo.controllerAs];
	      }

	      var typeDefinitions = ddo.scopeTypes(scopeTypes);
	      scopeTypes.warn(scopeTypes.objectOf(scopeTypes.func), typeDefinitions, { prefix: 'getting scope types for ' + ddo.name });

	      $scope.$scopeTypesResults = { __passed: 0, __failed: 0 };

	      _angular2['default'].forEach(typeDefinitions, function (check, name) {
	        if (!_angular2['default'].isDefined(context[name])) {
	          (function () {
	            var prefix = ddo.controllerAs ? ddo.controllerAs + '.' : '';
	            var stopWatching = $scope.$watch('' + prefix + '' + name, function (value, oldValue) {
	              if (value !== oldValue) {
	                stopWatching();
	                checkOption(check, name);
	              }
	            });
	          })();
	        } else {
	          checkOption(check, name);
	        }
	      });

	      function checkOption(checker, name) {
	        $scope.$scopeTypesResults[name] = scopeTypes.warn(checker, context[name], { prefix: '' + ddo.name + 'Directive for "' + name + '"' });
	        updateData();
	      }

	      function updateData() {
	        var passedCount = 0;
	        var failedCount = 0;
	        var ignore = ['__passed', '__failed'];
	        _angular2['default'].forEach($scope.$scopeTypesResults, function (result, name) {
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
	      if (!_angular2['default'].isDefined(originalController)) {
	        return newController;
	      }
	      function wrappedController($scope, $controller, $element, $attrs, $transclude) {
	        var context = { $scope: $scope, $element: $element, $attrs: $attrs, $transclude: $transclude };
	        _angular2['default'].extend(this, $controller(newController, context));
	        _angular2['default'].extend(this, $controller(originalController, context));
	      }

	      wrappedController.$inject = ['$scope', '$controller', '$element', '$attrs', '$transclude'];
	      return wrappedController;
	    }
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	// some versions of angular don't export the angular module properly,
	// so we get it from window in this case.
	var angular = __webpack_require__(5);
	/* istanbul ignore next */
	if (!angular.version) {
	  angular = window.angular;
	}
	exports['default'] = angular;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _injectableFunction = __webpack_require__(6);

	var _injectableFunction2 = _interopRequireDefault(_injectableFunction);

	var _ddo = __webpack_require__(7);

	var _ddo2 = _interopRequireDefault(_ddo);

	exports['default'] = {
	  injectableFunction: _injectableFunction2['default'], ddo: _ddo2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = injectableFunction;

	var _apiCheck = __webpack_require__(2);

	var _apiCheck2 = _interopRequireDefault(_apiCheck);

	function injectableFunction() {
	  var _ref = arguments[0] === undefined ? { strictDi: false, disabled: false } : arguments[0];

	  var _ref$strictDi = _ref.strictDi;
	  var strictDi = _ref$strictDi === undefined ? false : _ref$strictDi;
	  var _ref$disabled = _ref.disabled;
	  var disabled = _ref$disabled === undefined ? false : _ref$disabled;

	  var $injectProperty = _apiCheck2['default'].func.withProperties({
	    $inject: _apiCheck2['default'].arrayOf(_apiCheck2['default'].string)
	  });

	  var arraySyntax = _apiCheck2['default'].utils.checkerHelpers.setupChecker(function arraySyntax(val, name, location) {
	    if (!Array.isArray(val)) {
	      return _apiCheck2['default'].utils.getError(name, location, _apiCheck2['default'].array.type);
	    }
	    var copy = val.slice();
	    var fn = copy.pop();
	    var arrayOfStringsChecker = _apiCheck2['default'].arrayOf(_apiCheck2['default'].string);
	    var notArrayOfStrings = arrayOfStringsChecker(copy);
	    if (_apiCheck2['default'].utils.isError(notArrayOfStrings)) {
	      return _apiCheck2['default'].utils.getError(name, location, arrayOfStringsChecker.type);
	    }
	    if (typeof fn !== 'function') {
	      return _apiCheck2['default'].utils.getError(name, location, _apiCheck2['default'].func.type);
	    }
	  }, { type: 'angular injectable function (array syntax)' }, disabled);

	  var types = [$injectProperty, arraySyntax];

	  if (!strictDi) {
	    types.push(_apiCheck2['default'].func);
	  }

	  return _apiCheck2['default'].oneOfType(types);
	}

	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = ddo;

	var _checkerUtils = __webpack_require__(8);

	var _checkerUtils2 = _interopRequireDefault(_checkerUtils);

	function ddo() {
	  var _ref = arguments[0] === undefined ? {
	    strictDi: false, disabled: false
	  } : arguments[0];

	  var scopeTypes = _ref.scopeTypes;
	  var _ref$strictDi = _ref.strictDi;
	  var strictDi = _ref$strictDi === undefined ? false : _ref$strictDi;
	  var _ref$disabled = _ref.disabled;
	  var disabled = _ref$disabled === undefined ? false : _ref$disabled;

	  if (disabled) {
	    return _checkerUtils2['default'].noopChecker;
	  }

	  var check = scopeTypes;
	  if (!check) {
	    throw new Error('Must provide an instance of scopeTypes');
	  }
	  var stringOrFunc = scopeTypes.oneOfType([check.string, check.func]);
	  var ddoShape = check.shape({
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
	    //'siblingDirectiveName', // or // ['^parentDirectiveName', '?optionalDirectiveName', '?^optionalParent'],
	    compile: check.func.optional,
	    link: check.oneOfType([check.func, check.shape({
	      pre: check.func.optional,
	      post: check.func.optional
	    }).strict]).optional,
	    scopeTypes: check.func,
	    data: check.object.optional
	  }).strict;

	  return check.oneOfType([check.func, ddoShape]);
	}

	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function noopChecker() {}
	noopChecker.nullable = noopChecker;
	noopChecker.nullable.optional = noopChecker;

	exports["default"] = { noopChecker: noopChecker };
	module.exports = exports["default"];

/***/ }
/******/ ])
});
;