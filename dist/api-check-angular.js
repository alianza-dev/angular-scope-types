// angular-scope-types version 1.0.0-beta.0 built with ♥ by Kent C. Dodds <kent@doddsfamily.us> (http://kent.doddsfamily.us) (ó ì_í)=óò=(ì_í ò)

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("api-check"), require("angular"));
	else if(typeof define === 'function' && define.amd)
		define(["api-check", "angular"], factory);
	else if(typeof exports === 'object')
		exports["apiCheckAngular"] = factory(require("api-check"), require("angular"));
	else
		root["apiCheckAngular"] = factory(root["apiCheck"], root["angular"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_7__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };
	
	var _defaults = function (obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; };
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _checkers = __webpack_require__(2);
	
	_defaults(exports, _interopRequireWildcard(_checkers));
	
	var _scopeTypes = __webpack_require__(1);
	
	_defaults(exports, _interopRequireWildcard(_scopeTypes));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _angular = __webpack_require__(4);
	
	var _angular2 = _interopRequireDefault(_angular);
	
	var _apiCheckFactory = __webpack_require__(3);
	
	var _apiCheckFactory2 = _interopRequireDefault(_apiCheckFactory);
	
	var _checkerFactories = __webpack_require__(2);
	
	var _checkerFactories2 = _interopRequireDefault(_checkerFactories);
	
	exports['default'] = scopeTypesFactory;
	
	function scopeTypesFactory() {
	  var _ref = arguments[0] === undefined ? { disabled: false } : arguments[0];
	
	  var _ref$disabled = _ref.disabled;
	  var disabled = _ref$disabled === undefined ? false : _ref$disabled;
	
	  var scopeTypes = _apiCheckFactory2['default']({
	    output: { prefix: 'api-check-angular' },
	    disabled: disabled
	  });
	  // manually adding checkers so we have an instance of scopeTypes to pass them.
	  _angular2['default'].forEach(_checkerFactories2['default'], function (factory, name) {
	    scopeTypes[name] = factory({ scopeTypes: scopeTypes, disabled: disabled });
	  });
	
	  scopeTypes.directive = validateDirective;
	
	  return scopeTypes;
	
	  function validateDirective(ddo) {
	    scopeTypes.warn(scopeTypes.ddo, ddo, { prefix: 'creating directive' });
	    // Would really love to not have to extend the ddo's controller
	    // like this. Suggestions welcome!
	    ddo.controller = extendController(ddo.controller, scopeTypesController);
	
	    scopeTypesController.$inject = ['$scope'];
	    function scopeTypesController($scope) {
	      var context = $scope;
	      if (ddo.bindToController) {
	        context = context[ddo.controllerAs];
	      }
	      _angular2['default'].forEach(ddo.scopeTypes, function (check, name) {
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
	        scopeTypes.warn(checker, context[name], { prefix: '' + ddo.name + 'Directive' });
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

	'use strict';
	
	var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _injectableFunction = __webpack_require__(5);
	
	var _injectableFunction2 = _interopRequireDefault(_injectableFunction);
	
	var _ddo = __webpack_require__(6);
	
	var _ddo2 = _interopRequireDefault(_ddo);
	
	exports['default'] = {
	  injectableFunction: _injectableFunction2['default'], ddo: _ddo2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	// some versions of angular don't export the angular module properly,
	// so we get it from window in this case.
	var angular = __webpack_require__(7);
	/* istanbul ignore next */
	if (!angular.version) {
	  angular = window.angular;
	}
	exports['default'] = angular;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = injectableFunction;
	
	var _apiCheck = __webpack_require__(3);
	
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
/* 6 */
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
	    restrict: check.oneOf(['A', 'E', 'AE', 'EA']).optional, // <-- TODO, more combinations
	    templateNamespace: check.string.optional, // TODO, docs provided value: 'html',
	    scope: check.oneOfType([check.bool, check.object]).optional, // TODO, make a scope checker
	    controller: check.injectableFunction.optional,
	    controllerAs: check.string.optional,
	    bindToController: check.oneOfType([check.bool, check.object]).optional,
	    // TODO, tell the version of angular and use a scope checker for +1.4
	    require: check.string.optional, // TODO make a pattern checker.
	    //'siblingDirectiveName', // or // ['^parentDirectiveName', '?optionalDirectiveName', '?^optionalParent'],
	    compile: check.func.optional,
	    link: check.oneOfType([check.func, check.shape({
	      pre: check.func.optional,
	      post: check.func.optional
	    }).strict]).optional,
	    scopeTypes: check.objectOf(check.func).optional
	  }).strict;
	
	  return check.oneOfType([check.func, ddoShape]);
	}
	
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAzZjk0MTI3ZmE1ZWY0NmIzYjBhNyIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zY29wZVR5cGVzLmpzIiwid2VicGFjazovLy8uL2NoZWNrZXJzL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJhcGlDaGVja1wiLFwiYW1kXCI6XCJhcGktY2hlY2tcIixcImNvbW1vbmpzMlwiOlwiYXBpLWNoZWNrXCIsXCJjb21tb25qc1wiOlwiYXBpLWNoZWNrXCJ9Iiwid2VicGFjazovLy8uL2FuZ3VsYXItZml4L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NoZWNrZXJzL2luamVjdGFibGVGdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9jaGVja2Vycy9kZG8uanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYW5ndWxhclwiIiwid2VicGFjazovLy8uL2NoZWNrZXJzL2NoZWNrZXJVdGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7cUNDdENjLENBQVk7Ozs7dUNBQ1osQ0FBYzs7Ozs7Ozs7Ozs7Ozs7OztvQ0NEUixDQUFhOzs7OzRDQUNMLENBQVc7Ozs7NkNBQ1YsQ0FBWTs7OztzQkFHMUIsaUJBQWlCOztBQUVoQyxVQUFTLGlCQUFpQixHQUF5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bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiYXBpLWNoZWNrXCIpLCByZXF1aXJlKFwiYW5ndWxhclwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJhcGktY2hlY2tcIiwgXCJhbmd1bGFyXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImFwaUNoZWNrQW5ndWxhclwiXSA9IGZhY3RvcnkocmVxdWlyZShcImFwaS1jaGVja1wiKSwgcmVxdWlyZShcImFuZ3VsYXJcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImFwaUNoZWNrQW5ndWxhclwiXSA9IGZhY3Rvcnkocm9vdFtcImFwaUNoZWNrXCJdLCByb290W1wiYW5ndWxhclwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzNfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV83X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDNmOTQxMjdmYTVlZjQ2YjNiMGE3XG4gKiovIiwiZXhwb3J0ICogZnJvbSAnLi9jaGVja2Vycyc7XG5leHBvcnQgKiBmcm9tICcuL3Njb3BlVHlwZXMnO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9lc2xpbnQtbG9hZGVyIS4vaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyLWZpeCc7XG5pbXBvcnQgYXBpQ2hlY2tGYWN0b3J5IGZyb20gJ2FwaS1jaGVjayc7XG5pbXBvcnQgY2hlY2tlckZhY3RvcmllcyBmcm9tICcuL2NoZWNrZXJzJztcblxuXG5leHBvcnQgZGVmYXVsdCBzY29wZVR5cGVzRmFjdG9yeTtcblxuZnVuY3Rpb24gc2NvcGVUeXBlc0ZhY3Rvcnkoe2Rpc2FibGVkID0gZmFsc2V9ID0ge2Rpc2FibGVkOiBmYWxzZX0pIHtcbiAgY29uc3Qgc2NvcGVUeXBlcyA9IGFwaUNoZWNrRmFjdG9yeSh7XG4gICAgb3V0cHV0OiB7cHJlZml4OiAnYXBpLWNoZWNrLWFuZ3VsYXInfSxcbiAgICBkaXNhYmxlZFxuICB9KTtcbiAgLy8gbWFudWFsbHkgYWRkaW5nIGNoZWNrZXJzIHNvIHdlIGhhdmUgYW4gaW5zdGFuY2Ugb2Ygc2NvcGVUeXBlcyB0byBwYXNzIHRoZW0uXG4gIGFuZ3VsYXIuZm9yRWFjaChjaGVja2VyRmFjdG9yaWVzLCAoZmFjdG9yeSwgbmFtZSkgPT4ge1xuICAgIHNjb3BlVHlwZXNbbmFtZV0gPSBmYWN0b3J5KHtzY29wZVR5cGVzLCBkaXNhYmxlZH0pO1xuICB9KTtcblxuICBzY29wZVR5cGVzLmRpcmVjdGl2ZSA9IHZhbGlkYXRlRGlyZWN0aXZlO1xuXG4gIHJldHVybiBzY29wZVR5cGVzO1xuXG4gIGZ1bmN0aW9uIHZhbGlkYXRlRGlyZWN0aXZlKGRkbykge1xuICAgIHNjb3BlVHlwZXMud2FybihzY29wZVR5cGVzLmRkbywgZGRvLCB7cHJlZml4OiAnY3JlYXRpbmcgZGlyZWN0aXZlJ30pO1xuICAgIC8vIFdvdWxkIHJlYWxseSBsb3ZlIHRvIG5vdCBoYXZlIHRvIGV4dGVuZCB0aGUgZGRvJ3MgY29udHJvbGxlclxuICAgIC8vIGxpa2UgdGhpcy4gU3VnZ2VzdGlvbnMgd2VsY29tZSFcbiAgICBkZG8uY29udHJvbGxlciA9IGV4dGVuZENvbnRyb2xsZXIoZGRvLmNvbnRyb2xsZXIsIHNjb3BlVHlwZXNDb250cm9sbGVyKTtcblxuICAgIHNjb3BlVHlwZXNDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZSddO1xuICAgIGZ1bmN0aW9uIHNjb3BlVHlwZXNDb250cm9sbGVyKCRzY29wZSkge1xuICAgICAgdmFyIGNvbnRleHQgPSAkc2NvcGU7XG4gICAgICBpZiAoZGRvLmJpbmRUb0NvbnRyb2xsZXIpIHtcbiAgICAgICAgY29udGV4dCA9IGNvbnRleHRbZGRvLmNvbnRyb2xsZXJBc107XG4gICAgICB9XG4gICAgICBhbmd1bGFyLmZvckVhY2goZGRvLnNjb3BlVHlwZXMsIGZ1bmN0aW9uKGNoZWNrLCBuYW1lKSB7XG4gICAgICAgIGlmICghYW5ndWxhci5pc0RlZmluZWQoY29udGV4dFtuYW1lXSkpIHtcbiAgICAgICAgICBsZXQgcHJlZml4ID0gZGRvLmNvbnRyb2xsZXJBcyA/IGRkby5jb250cm9sbGVyQXMgKyAnLicgOiAnJztcbiAgICAgICAgICBjb25zdCBzdG9wV2F0Y2hpbmcgPSAkc2NvcGUuJHdhdGNoKGAke3ByZWZpeH0ke25hbWV9YCwgZnVuY3Rpb24odmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUgIT09IG9sZFZhbHVlKSB7XG4gICAgICAgICAgICAgIHN0b3BXYXRjaGluZygpO1xuICAgICAgICAgICAgICBjaGVja09wdGlvbihjaGVjaywgbmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2hlY2tPcHRpb24oY2hlY2ssIG5hbWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuXG4gICAgICBmdW5jdGlvbiBjaGVja09wdGlvbihjaGVja2VyLCBuYW1lKSB7XG4gICAgICAgIHNjb3BlVHlwZXMud2FybihjaGVja2VyLCBjb250ZXh0W25hbWVdLCB7cHJlZml4OiBgJHtkZG8ubmFtZX1EaXJlY3RpdmVgfSk7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gZGRvO1xuXG5cbiAgICBmdW5jdGlvbiBleHRlbmRDb250cm9sbGVyKG9yaWdpbmFsQ29udHJvbGxlciwgbmV3Q29udHJvbGxlcikge1xuICAgICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZChvcmlnaW5hbENvbnRyb2xsZXIpKSB7XG4gICAgICAgIHJldHVybiBuZXdDb250cm9sbGVyO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gd3JhcHBlZENvbnRyb2xsZXIoJHNjb3BlLCAkY29udHJvbGxlciwgJGVsZW1lbnQsICRhdHRycywgJHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHskc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICR0cmFuc2NsdWRlfTtcbiAgICAgICAgYW5ndWxhci5leHRlbmQodGhpcywgJGNvbnRyb2xsZXIobmV3Q29udHJvbGxlciwgY29udGV4dCkpO1xuICAgICAgICBhbmd1bGFyLmV4dGVuZCh0aGlzLCAkY29udHJvbGxlcihvcmlnaW5hbENvbnRyb2xsZXIsIGNvbnRleHQpKTtcbiAgICAgIH1cblxuICAgICAgd3JhcHBlZENvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRjb250cm9sbGVyJywgJyRlbGVtZW50JywgJyRhdHRycycsICckdHJhbnNjbHVkZSddO1xuICAgICAgcmV0dXJuIHdyYXBwZWRDb250cm9sbGVyO1xuICAgIH1cbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9lc2xpbnQtbG9hZGVyIS4vc2NvcGVUeXBlcy5qc1xuICoqLyIsImltcG9ydCBpbmplY3RhYmxlRnVuY3Rpb24gZnJvbSAnLi9pbmplY3RhYmxlRnVuY3Rpb24nO1xuaW1wb3J0IGRkbyBmcm9tICcuL2Rkbyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5qZWN0YWJsZUZ1bmN0aW9uLCBkZG9cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2VzbGludC1sb2FkZXIhLi9jaGVja2Vycy9pbmRleC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8zX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJhcGlDaGVja1wiLFwiYW1kXCI6XCJhcGktY2hlY2tcIixcImNvbW1vbmpzMlwiOlwiYXBpLWNoZWNrXCIsXCJjb21tb25qc1wiOlwiYXBpLWNoZWNrXCJ9XG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gc29tZSB2ZXJzaW9ucyBvZiBhbmd1bGFyIGRvbid0IGV4cG9ydCB0aGUgYW5ndWxhciBtb2R1bGUgcHJvcGVybHksXG4vLyBzbyB3ZSBnZXQgaXQgZnJvbSB3aW5kb3cgaW4gdGhpcyBjYXNlLlxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuaWYgKCFhbmd1bGFyLnZlcnNpb24pIHtcbiAgYW5ndWxhciA9IHdpbmRvdy5hbmd1bGFyO1xufVxuZXhwb3J0IGRlZmF1bHQgYW5ndWxhcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vZXNsaW50LWxvYWRlciEuL2FuZ3VsYXItZml4L2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IGFwaUNoZWNrIGZyb20gJ2FwaS1jaGVjayc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluamVjdGFibGVGdW5jdGlvbih7c3RyaWN0RGkgPSBmYWxzZSwgZGlzYWJsZWQgPSBmYWxzZX0gPSB7c3RyaWN0RGk6IGZhbHNlLCBkaXNhYmxlZDogZmFsc2V9KSB7XG4gIGNvbnN0ICRpbmplY3RQcm9wZXJ0eSA9IGFwaUNoZWNrLmZ1bmMud2l0aFByb3BlcnRpZXMoe1xuICAgICRpbmplY3Q6IGFwaUNoZWNrLmFycmF5T2YoYXBpQ2hlY2suc3RyaW5nKVxuICB9KTtcblxuICBjb25zdCBhcnJheVN5bnRheCA9IGFwaUNoZWNrLnV0aWxzLmNoZWNrZXJIZWxwZXJzLnNldHVwQ2hlY2tlcihmdW5jdGlvbiBhcnJheVN5bnRheCh2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICAgIHJldHVybiBhcGlDaGVjay51dGlscy5nZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgYXBpQ2hlY2suYXJyYXkudHlwZSk7XG4gICAgfVxuICAgIGxldCBjb3B5ID0gdmFsLnNsaWNlKCk7XG4gICAgY29uc3QgZm4gPSBjb3B5LnBvcCgpO1xuICAgIGNvbnN0IGFycmF5T2ZTdHJpbmdzQ2hlY2tlciA9IGFwaUNoZWNrLmFycmF5T2YoYXBpQ2hlY2suc3RyaW5nKTtcbiAgICBjb25zdCBub3RBcnJheU9mU3RyaW5ncyA9IGFycmF5T2ZTdHJpbmdzQ2hlY2tlcihjb3B5KTtcbiAgICBpZiAoYXBpQ2hlY2sudXRpbHMuaXNFcnJvcihub3RBcnJheU9mU3RyaW5ncykpIHtcbiAgICAgIHJldHVybiBhcGlDaGVjay51dGlscy5nZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgYXJyYXlPZlN0cmluZ3NDaGVja2VyLnR5cGUpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gYXBpQ2hlY2sudXRpbHMuZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIGFwaUNoZWNrLmZ1bmMudHlwZSk7XG4gICAgfVxuICB9LCB7dHlwZTogJ2FuZ3VsYXIgaW5qZWN0YWJsZSBmdW5jdGlvbiAoYXJyYXkgc3ludGF4KSd9LCBkaXNhYmxlZCk7XG5cbiAgY29uc3QgdHlwZXMgPSBbJGluamVjdFByb3BlcnR5LCBhcnJheVN5bnRheF07XG5cbiAgaWYgKCFzdHJpY3REaSkge1xuICAgIHR5cGVzLnB1c2goYXBpQ2hlY2suZnVuYyk7XG4gIH1cblxuICByZXR1cm4gYXBpQ2hlY2sub25lT2ZUeXBlKHR5cGVzKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vZXNsaW50LWxvYWRlciEuL2NoZWNrZXJzL2luamVjdGFibGVGdW5jdGlvbi5qc1xuICoqLyIsImltcG9ydCBjaGVja2VyVXRpbHMgZnJvbSAnLi9jaGVja2VyVXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZG8oe1xuICBzY29wZVR5cGVzLCBzdHJpY3REaSA9IGZhbHNlLCBkaXNhYmxlZCA9IGZhbHNlXG4gIH0gPSB7XG4gIHN0cmljdERpOiBmYWxzZSwgZGlzYWJsZWQ6IGZhbHNlXG59KSB7XG4gIGlmIChkaXNhYmxlZCkge1xuICAgIHJldHVybiBjaGVja2VyVXRpbHMubm9vcENoZWNrZXI7XG4gIH1cblxuICBjb25zdCBjaGVjayA9IHNjb3BlVHlwZXM7XG4gIGlmICghY2hlY2spIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ011c3QgcHJvdmlkZSBhbiBpbnN0YW5jZSBvZiBzY29wZVR5cGVzJyk7XG4gIH1cbiAgY29uc3Qgc3RyaW5nT3JGdW5jID0gc2NvcGVUeXBlcy5vbmVPZlR5cGUoW2NoZWNrLnN0cmluZywgY2hlY2suZnVuY10pO1xuICBjb25zdCBkZG9TaGFwZSA9IGNoZWNrLnNoYXBlKHtcbiAgICBwcmlvcml0eTogY2hlY2subnVtYmVyLm9wdGlvbmFsLFxuICAgIHRlbXBsYXRlOiBjaGVjay5zaGFwZS5pZk5vdCgndGVtcGxhdGVVcmwnLCBzdHJpbmdPckZ1bmMpLm9wdGlvbmFsLFxuICAgIHRlbXBsYXRlVXJsOiBjaGVjay5zaGFwZS5pZk5vdCgndGVtcGxhdGUnLCBjaGVjay5zdHJpbmcpLm9wdGlvbmFsLFxuICAgIHRyYW5zY2x1ZGU6IGNoZWNrLmJvb2wub3B0aW9uYWwsXG4gICAgcmVzdHJpY3Q6IGNoZWNrLm9uZU9mKFsnQScsICdFJywgJ0FFJywgJ0VBJ10pLm9wdGlvbmFsLCAvLyA8LS0gVE9ETywgbW9yZSBjb21iaW5hdGlvbnNcbiAgICB0ZW1wbGF0ZU5hbWVzcGFjZTogY2hlY2suc3RyaW5nLm9wdGlvbmFsLCAvLyBUT0RPLCBkb2NzIHByb3ZpZGVkIHZhbHVlOiAnaHRtbCcsXG4gICAgc2NvcGU6IGNoZWNrLm9uZU9mVHlwZShbY2hlY2suYm9vbCwgY2hlY2sub2JqZWN0XSkub3B0aW9uYWwsIC8vIFRPRE8sIG1ha2UgYSBzY29wZSBjaGVja2VyXG4gICAgY29udHJvbGxlcjogY2hlY2suaW5qZWN0YWJsZUZ1bmN0aW9uLm9wdGlvbmFsLFxuICAgIGNvbnRyb2xsZXJBczogY2hlY2suc3RyaW5nLm9wdGlvbmFsLFxuICAgIGJpbmRUb0NvbnRyb2xsZXI6IGNoZWNrLm9uZU9mVHlwZShbY2hlY2suYm9vbCwgY2hlY2sub2JqZWN0XSkub3B0aW9uYWwsXG4gICAgLy8gVE9ETywgdGVsbCB0aGUgdmVyc2lvbiBvZiBhbmd1bGFyIGFuZCB1c2UgYSBzY29wZSBjaGVja2VyIGZvciArMS40XG4gICAgcmVxdWlyZTogY2hlY2suc3RyaW5nLm9wdGlvbmFsLCAvLyBUT0RPIG1ha2UgYSBwYXR0ZXJuIGNoZWNrZXIuXG4gICAgLy8nc2libGluZ0RpcmVjdGl2ZU5hbWUnLCAvLyBvciAvLyBbJ15wYXJlbnREaXJlY3RpdmVOYW1lJywgJz9vcHRpb25hbERpcmVjdGl2ZU5hbWUnLCAnP15vcHRpb25hbFBhcmVudCddLFxuICAgIGNvbXBpbGU6IGNoZWNrLmZ1bmMub3B0aW9uYWwsXG4gICAgbGluazogY2hlY2sub25lT2ZUeXBlKFtcbiAgICAgIGNoZWNrLmZ1bmMsXG4gICAgICBjaGVjay5zaGFwZSh7XG4gICAgICAgIHByZTogY2hlY2suZnVuYy5vcHRpb25hbCxcbiAgICAgICAgcG9zdDogY2hlY2suZnVuYy5vcHRpb25hbFxuICAgICAgfSkuc3RyaWN0XG4gICAgXSkub3B0aW9uYWwsXG4gICAgc2NvcGVUeXBlczogY2hlY2sub2JqZWN0T2YoY2hlY2suZnVuYykub3B0aW9uYWxcbiAgfSkuc3RyaWN0O1xuXG4gIHJldHVybiBjaGVjay5vbmVPZlR5cGUoW2NoZWNrLmZ1bmMsIGRkb1NoYXBlXSk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2VzbGludC1sb2FkZXIhLi9jaGVja2Vycy9kZG8uanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfN19fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJhbmd1bGFyXCJcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJmdW5jdGlvbiBub29wQ2hlY2tlcigpIHtcbn1cbm5vb3BDaGVja2VyLm51bGxhYmxlID0gbm9vcENoZWNrZXI7XG5ub29wQ2hlY2tlci5udWxsYWJsZS5vcHRpb25hbCA9IG5vb3BDaGVja2VyO1xuXG5leHBvcnQgZGVmYXVsdCB7bm9vcENoZWNrZXJ9O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9lc2xpbnQtbG9hZGVyIS4vY2hlY2tlcnMvY2hlY2tlclV0aWxzLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==