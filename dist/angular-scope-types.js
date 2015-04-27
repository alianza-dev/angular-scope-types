// angular-scope-types version 1.0.0-beta.0 built with ♥ by Kent C. Dodds <kent@doddsfamily.us> (http://kent.doddsfamily.us) (ó ì_í)=óò=(ì_í ò)

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("api-check"), require("angular"));
	else if(typeof define === 'function' && define.amd)
		define(["api-check", "angular"], factory);
	else if(typeof exports === 'object')
		exports["angularScopeTypes"] = factory(require("api-check"), require("angular"));
	else
		root["angularScopeTypes"] = factory(root["apiCheck"], root["angular"]);
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
	exports.scopeTypesFactory = scopeTypesFactory;
	
	var _angular = __webpack_require__(4);
	
	var _angular2 = _interopRequireDefault(_angular);
	
	var _apiCheckFactory = __webpack_require__(3);
	
	var _apiCheckFactory2 = _interopRequireDefault(_apiCheckFactory);
	
	var _checkerFactories = __webpack_require__(2);
	
	var _checkerFactories2 = _interopRequireDefault(_checkerFactories);
	
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAwM2QzN2VlNzQzZTAyODUzNGI5ZiIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zY29wZVR5cGVzLmpzIiwid2VicGFjazovLy8uL2NoZWNrZXJzL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJhcGlDaGVja1wiLFwiYW1kXCI6XCJhcGktY2hlY2tcIixcImNvbW1vbmpzMlwiOlwiYXBpLWNoZWNrXCIsXCJjb21tb25qc1wiOlwiYXBpLWNoZWNrXCJ9Iiwid2VicGFjazovLy8uL2FuZ3VsYXItZml4L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NoZWNrZXJzL2luamVjdGFibGVGdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9jaGVja2Vycy9kZG8uanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYW5ndWxhclwiIiwid2VicGFjazovLy8uL2NoZWNrZXJzL2NoZWNrZXJVdGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7cUNDdENjLENBQVk7Ozs7dUNBQ1osQ0FBYzs7Ozs7Ozs7Ozs7Ozs7O1NDSVosaUJBQWlCLEdBQWpCLGlCQUFpQjs7b0NBTGIsQ0FBYTs7Ozs0Q0FDTCxDQUFXOzs7OzZDQUNWLENBQVk7Ozs7QUFHbEMsVUFBUyxpQkFBaUIsR0FBeUM7MkNBQW5CLEVBQUMsUUFBUSxFQUFFLEtBQUssRUFBQzs7NEJBQXJDLFFBQVE7T0FBUixRQUFRLGlDQUFHLEtBQUs7O0FBQ2pELE9BQU0sVUFBVSxHQUFHLDZCQUFnQjtBQUNqQyxXQUFNLEVBQUUsRUFBQyxNQUFNLEVBQUUsbUJBQW1CLEVBQUM7QUFDckMsYUFBUSxFQUFSLFFBQVE7SUFDVCxDQUFDLENBQUM7O0FBRUgsd0JBQVEsT0FBTyxnQ0FBbUIsVUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFLO0FBQ25ELGVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBQyxVQUFVLEVBQVYsVUFBVSxFQUFFLFFBQVEsRUFBUixRQUFRLEVBQUMsQ0FBQyxDQUFDO0lBQ3BELENBQUMsQ0FBQzs7QUFFSCxhQUFVLENBQUMsU0FBUyxHQUFHLGlCQUFpQixDQUFDOztBQUV6QyxVQUFPLFVBQVUsQ0FBQzs7QUFFbEIsWUFBUyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7QUFDOUIsZUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFDLE1BQU0sRUFBRSxvQkFBb0IsRUFBQyxDQUFDLENBQUM7OztBQUdyRSxRQUFHLENBQUMsVUFBVSxHQUFHLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsb0JBQW9CLENBQUMsQ0FBQzs7QUFFeEUseUJBQW9CLENBQUMsT0FBTyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDMUMsY0FBUyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUU7QUFDcEMsV0FBSSxPQUFPLEdBQUcsTUFBTSxDQUFDO0FBQ3JCLFdBQUksR0FBRyxDQUFDLGdCQUFnQixFQUFFO0FBQ3hCLGdCQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNyQztBQUNELDRCQUFRLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFVBQVMsS0FBSyxFQUFFLElBQUksRUFBRTtBQUNwRCxhQUFJLENBQUMscUJBQVEsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFOztBQUNyQyxpQkFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUMsWUFBWSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFDNUQsaUJBQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxNQUFNLE1BQUksTUFBTSxRQUFHLElBQUksRUFBSSxVQUFTLEtBQUssRUFBRSxRQUFRLEVBQUU7QUFDL0UsbUJBQUksS0FBSyxLQUFLLFFBQVEsRUFBRTtBQUN0Qiw2QkFBWSxFQUFFLENBQUM7QUFDZiw0QkFBVyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDMUI7Y0FDRixDQUFDLENBQUM7O1VBQ0osTUFBTTtBQUNMLHNCQUFXLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1VBQzFCO1FBQ0YsQ0FBQyxDQUFDOztBQUdILGdCQUFTLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFO0FBQ2xDLG1CQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBQyxNQUFNLE9BQUssR0FBRyxDQUFDLElBQUksY0FBVyxFQUFDLENBQUMsQ0FBQztRQUMzRTtNQUVGOztBQUVELFlBQU8sR0FBRyxDQUFDOztBQUdYLGNBQVMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsYUFBYSxFQUFFO0FBQzNELFdBQUksQ0FBQyxxQkFBUSxTQUFTLENBQUMsa0JBQWtCLENBQUMsRUFBRTtBQUMxQyxnQkFBTyxhQUFhLENBQUM7UUFDdEI7QUFDRCxnQkFBUyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFO0FBQzdFLGFBQU0sT0FBTyxHQUFHLEVBQUMsTUFBTSxFQUFOLE1BQU0sRUFBRSxRQUFRLEVBQVIsUUFBUSxFQUFFLE1BQU0sRUFBTixNQUFNLEVBQUUsV0FBVyxFQUFYLFdBQVcsRUFBQyxDQUFDO0FBQ3hELDhCQUFRLE1BQU0sQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQzFELDhCQUFRLE1BQU0sQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLGtCQUFrQixFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDaEU7O0FBRUQsd0JBQWlCLENBQUMsT0FBTyxHQUFHLENBQUMsUUFBUSxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBQzNGLGNBQU8saUJBQWlCLENBQUM7TUFDMUI7SUFDRjs7Ozs7Ozs7Ozs7Ozs7OytDQ3BFNEIsQ0FBc0I7Ozs7Z0NBQ3JDLENBQU87Ozs7c0JBRVI7QUFDYixxQkFBa0IsbUNBQUUsR0FBRztFQUN4Qjs7Ozs7OztBQ0xELGdEOzs7Ozs7Ozs7Ozs7O0FDRUEsS0FBSSxPQUFPLEdBQUcsbUJBQU8sQ0FBQyxDQUFTLENBQUMsQ0FBQzs7QUFFakMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7QUFDcEIsVUFBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7RUFDMUI7c0JBQ2MsT0FBTzs7Ozs7Ozs7Ozs7Ozs7c0JDTEUsa0JBQWtCOztxQ0FGckIsQ0FBVzs7OztBQUVqQixVQUFTLGtCQUFrQixHQUE0RTsyQ0FBcEMsRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUM7OzRCQUF4RSxRQUFRO09BQVIsUUFBUSxpQ0FBRyxLQUFLOzRCQUFFLFFBQVE7T0FBUixRQUFRLGlDQUFHLEtBQUs7O0FBQzVFLE9BQU0sZUFBZSxHQUFHLHNCQUFTLElBQUksQ0FBQyxjQUFjLENBQUM7QUFDbkQsWUFBTyxFQUFFLHNCQUFTLE9BQU8sQ0FBQyxzQkFBUyxNQUFNLENBQUM7SUFDM0MsQ0FBQyxDQUFDOztBQUVILE9BQU0sV0FBVyxHQUFHLHNCQUFTLEtBQUssQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLFNBQVMsV0FBVyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO0FBQ3ZHLFNBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQ3ZCLGNBQU8sc0JBQVMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLHNCQUFTLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztNQUNyRTtBQUNELFNBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUN2QixTQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDdEIsU0FBTSxxQkFBcUIsR0FBRyxzQkFBUyxPQUFPLENBQUMsc0JBQVMsTUFBTSxDQUFDLENBQUM7QUFDaEUsU0FBTSxpQkFBaUIsR0FBRyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0RCxTQUFJLHNCQUFTLEtBQUssQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsRUFBRTtBQUM3QyxjQUFPLHNCQUFTLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztNQUM1RTtBQUNELFNBQUksT0FBTyxFQUFFLEtBQUssVUFBVSxFQUFFO0FBQzVCLGNBQU8sc0JBQVMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLHNCQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztNQUNwRTtJQUNGLEVBQUUsRUFBQyxJQUFJLEVBQUUsNENBQTRDLEVBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQzs7QUFFbkUsT0FBTSxLQUFLLEdBQUcsQ0FBQyxlQUFlLEVBQUUsV0FBVyxDQUFDLENBQUM7O0FBRTdDLE9BQUksQ0FBQyxRQUFRLEVBQUU7QUFDYixVQUFLLENBQUMsSUFBSSxDQUFDLHNCQUFTLElBQUksQ0FBQyxDQUFDO0lBQzNCOztBQUVELFVBQU8sc0JBQVMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBQ2xDOzs7Ozs7Ozs7Ozs7Ozs7c0JDNUJ1QixHQUFHOzt5Q0FGRixDQUFnQjs7OztBQUUxQixVQUFTLEdBQUcsR0FJeEI7MkNBRkc7QUFDSixhQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLO0lBQ2pDOztPQUhDLFVBQVUsUUFBVixVQUFVOzRCQUFFLFFBQVE7T0FBUixRQUFRLGlDQUFHLEtBQUs7NEJBQUUsUUFBUTtPQUFSLFFBQVEsaUNBQUcsS0FBSzs7QUFJOUMsT0FBSSxRQUFRLEVBQUU7QUFDWixZQUFPLDBCQUFhLFdBQVcsQ0FBQztJQUNqQzs7QUFFRCxPQUFNLEtBQUssR0FBRyxVQUFVLENBQUM7QUFDekIsT0FBSSxDQUFDLEtBQUssRUFBRTtBQUNWLFdBQU0sSUFBSSxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQztJQUMzRDtBQUNELE9BQU0sWUFBWSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ3RFLE9BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7QUFDM0IsYUFBUSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUTtBQUMvQixhQUFRLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLFlBQVksQ0FBQyxDQUFDLFFBQVE7QUFDakUsZ0JBQVcsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVE7QUFDakUsZUFBVSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUTtBQUMvQixhQUFRLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUTtBQUN0RCxzQkFBaUIsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVE7QUFDeEMsVUFBSyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVE7QUFDM0QsZUFBVSxFQUFFLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRO0FBQzdDLGlCQUFZLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRO0FBQ25DLHFCQUFnQixFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVE7O0FBRXRFLFlBQU8sRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVE7O0FBRTlCLFlBQU8sRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVE7QUFDNUIsU0FBSSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FDcEIsS0FBSyxDQUFDLElBQUksRUFDVixLQUFLLENBQUMsS0FBSyxDQUFDO0FBQ1YsVUFBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUTtBQUN4QixXQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRO01BQzFCLENBQUMsQ0FBQyxNQUFNLENBQ1YsQ0FBQyxDQUFDLFFBQVE7QUFDWCxlQUFVLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUTtJQUNoRCxDQUFDLENBQUMsTUFBTSxDQUFDOztBQUVWLFVBQU8sS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztFQUNoRDs7Ozs7Ozs7QUMxQ0QsZ0Q7Ozs7Ozs7Ozs7O0FDQUEsVUFBUyxXQUFXLEdBQUcsRUFDdEI7QUFDRCxZQUFXLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQztBQUNuQyxZQUFXLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUM7O3NCQUU3QixFQUFDLFdBQVcsRUFBWCxXQUFXLEVBQUMiLCJmaWxlIjoiYW5ndWxhci1zY29wZS10eXBlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImFwaS1jaGVja1wiKSwgcmVxdWlyZShcImFuZ3VsYXJcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wiYXBpLWNoZWNrXCIsIFwiYW5ndWxhclwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJhbmd1bGFyU2NvcGVUeXBlc1wiXSA9IGZhY3RvcnkocmVxdWlyZShcImFwaS1jaGVja1wiKSwgcmVxdWlyZShcImFuZ3VsYXJcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImFuZ3VsYXJTY29wZVR5cGVzXCJdID0gZmFjdG9yeShyb290W1wiYXBpQ2hlY2tcIl0sIHJvb3RbXCJhbmd1bGFyXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfM19fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzdfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMDNkMzdlZTc0M2UwMjg1MzRiOWZcbiAqKi8iLCJleHBvcnQgKiBmcm9tICcuL2NoZWNrZXJzJztcbmV4cG9ydCAqIGZyb20gJy4vc2NvcGVUeXBlcyc7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2VzbGludC1sb2FkZXIhLi9pbmRleC5qc1xuICoqLyIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXItZml4JztcbmltcG9ydCBhcGlDaGVja0ZhY3RvcnkgZnJvbSAnYXBpLWNoZWNrJztcbmltcG9ydCBjaGVja2VyRmFjdG9yaWVzIGZyb20gJy4vY2hlY2tlcnMnO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBzY29wZVR5cGVzRmFjdG9yeSh7ZGlzYWJsZWQgPSBmYWxzZX0gPSB7ZGlzYWJsZWQ6IGZhbHNlfSkge1xuICBjb25zdCBzY29wZVR5cGVzID0gYXBpQ2hlY2tGYWN0b3J5KHtcbiAgICBvdXRwdXQ6IHtwcmVmaXg6ICdhcGktY2hlY2stYW5ndWxhcid9LFxuICAgIGRpc2FibGVkXG4gIH0pO1xuICAvLyBtYW51YWxseSBhZGRpbmcgY2hlY2tlcnMgc28gd2UgaGF2ZSBhbiBpbnN0YW5jZSBvZiBzY29wZVR5cGVzIHRvIHBhc3MgdGhlbS5cbiAgYW5ndWxhci5mb3JFYWNoKGNoZWNrZXJGYWN0b3JpZXMsIChmYWN0b3J5LCBuYW1lKSA9PiB7XG4gICAgc2NvcGVUeXBlc1tuYW1lXSA9IGZhY3Rvcnkoe3Njb3BlVHlwZXMsIGRpc2FibGVkfSk7XG4gIH0pO1xuXG4gIHNjb3BlVHlwZXMuZGlyZWN0aXZlID0gdmFsaWRhdGVEaXJlY3RpdmU7XG5cbiAgcmV0dXJuIHNjb3BlVHlwZXM7XG5cbiAgZnVuY3Rpb24gdmFsaWRhdGVEaXJlY3RpdmUoZGRvKSB7XG4gICAgc2NvcGVUeXBlcy53YXJuKHNjb3BlVHlwZXMuZGRvLCBkZG8sIHtwcmVmaXg6ICdjcmVhdGluZyBkaXJlY3RpdmUnfSk7XG4gICAgLy8gV291bGQgcmVhbGx5IGxvdmUgdG8gbm90IGhhdmUgdG8gZXh0ZW5kIHRoZSBkZG8ncyBjb250cm9sbGVyXG4gICAgLy8gbGlrZSB0aGlzLiBTdWdnZXN0aW9ucyB3ZWxjb21lIVxuICAgIGRkby5jb250cm9sbGVyID0gZXh0ZW5kQ29udHJvbGxlcihkZG8uY29udHJvbGxlciwgc2NvcGVUeXBlc0NvbnRyb2xsZXIpO1xuXG4gICAgc2NvcGVUeXBlc0NvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJ107XG4gICAgZnVuY3Rpb24gc2NvcGVUeXBlc0NvbnRyb2xsZXIoJHNjb3BlKSB7XG4gICAgICB2YXIgY29udGV4dCA9ICRzY29wZTtcbiAgICAgIGlmIChkZG8uYmluZFRvQ29udHJvbGxlcikge1xuICAgICAgICBjb250ZXh0ID0gY29udGV4dFtkZG8uY29udHJvbGxlckFzXTtcbiAgICAgIH1cbiAgICAgIGFuZ3VsYXIuZm9yRWFjaChkZG8uc2NvcGVUeXBlcywgZnVuY3Rpb24oY2hlY2ssIG5hbWUpIHtcbiAgICAgICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZChjb250ZXh0W25hbWVdKSkge1xuICAgICAgICAgIGxldCBwcmVmaXggPSBkZG8uY29udHJvbGxlckFzID8gZGRvLmNvbnRyb2xsZXJBcyArICcuJyA6ICcnO1xuICAgICAgICAgIGNvbnN0IHN0b3BXYXRjaGluZyA9ICRzY29wZS4kd2F0Y2goYCR7cHJlZml4fSR7bmFtZX1gLCBmdW5jdGlvbih2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gb2xkVmFsdWUpIHtcbiAgICAgICAgICAgICAgc3RvcFdhdGNoaW5nKCk7XG4gICAgICAgICAgICAgIGNoZWNrT3B0aW9uKGNoZWNrLCBuYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjaGVja09wdGlvbihjaGVjaywgbmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG5cbiAgICAgIGZ1bmN0aW9uIGNoZWNrT3B0aW9uKGNoZWNrZXIsIG5hbWUpIHtcbiAgICAgICAgc2NvcGVUeXBlcy53YXJuKGNoZWNrZXIsIGNvbnRleHRbbmFtZV0sIHtwcmVmaXg6IGAke2Rkby5uYW1lfURpcmVjdGl2ZWB9KTtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiBkZG87XG5cblxuICAgIGZ1bmN0aW9uIGV4dGVuZENvbnRyb2xsZXIob3JpZ2luYWxDb250cm9sbGVyLCBuZXdDb250cm9sbGVyKSB7XG4gICAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKG9yaWdpbmFsQ29udHJvbGxlcikpIHtcbiAgICAgICAgcmV0dXJuIG5ld0NvbnRyb2xsZXI7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiB3cmFwcGVkQ29udHJvbGxlcigkc2NvcGUsICRjb250cm9sbGVyLCAkZWxlbWVudCwgJGF0dHJzLCAkdHJhbnNjbHVkZSkge1xuICAgICAgICBjb25zdCBjb250ZXh0ID0geyRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJHRyYW5zY2x1ZGV9O1xuICAgICAgICBhbmd1bGFyLmV4dGVuZCh0aGlzLCAkY29udHJvbGxlcihuZXdDb250cm9sbGVyLCBjb250ZXh0KSk7XG4gICAgICAgIGFuZ3VsYXIuZXh0ZW5kKHRoaXMsICRjb250cm9sbGVyKG9yaWdpbmFsQ29udHJvbGxlciwgY29udGV4dCkpO1xuICAgICAgfVxuXG4gICAgICB3cmFwcGVkQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGNvbnRyb2xsZXInLCAnJGVsZW1lbnQnLCAnJGF0dHJzJywgJyR0cmFuc2NsdWRlJ107XG4gICAgICByZXR1cm4gd3JhcHBlZENvbnRyb2xsZXI7XG4gICAgfVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2VzbGludC1sb2FkZXIhLi9zY29wZVR5cGVzLmpzXG4gKiovIiwiaW1wb3J0IGluamVjdGFibGVGdW5jdGlvbiBmcm9tICcuL2luamVjdGFibGVGdW5jdGlvbic7XG5pbXBvcnQgZGRvIGZyb20gJy4vZGRvJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpbmplY3RhYmxlRnVuY3Rpb24sIGRkb1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vZXNsaW50LWxvYWRlciEuL2NoZWNrZXJzL2luZGV4LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzNfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImFwaUNoZWNrXCIsXCJhbWRcIjpcImFwaS1jaGVja1wiLFwiY29tbW9uanMyXCI6XCJhcGktY2hlY2tcIixcImNvbW1vbmpzXCI6XCJhcGktY2hlY2tcIn1cbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBzb21lIHZlcnNpb25zIG9mIGFuZ3VsYXIgZG9uJ3QgZXhwb3J0IHRoZSBhbmd1bGFyIG1vZHVsZSBwcm9wZXJseSxcbi8vIHNvIHdlIGdldCBpdCBmcm9tIHdpbmRvdyBpbiB0aGlzIGNhc2UuXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5pZiAoIWFuZ3VsYXIudmVyc2lvbikge1xuICBhbmd1bGFyID0gd2luZG93LmFuZ3VsYXI7XG59XG5leHBvcnQgZGVmYXVsdCBhbmd1bGFyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9lc2xpbnQtbG9hZGVyIS4vYW5ndWxhci1maXgvaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgYXBpQ2hlY2sgZnJvbSAnYXBpLWNoZWNrJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5qZWN0YWJsZUZ1bmN0aW9uKHtzdHJpY3REaSA9IGZhbHNlLCBkaXNhYmxlZCA9IGZhbHNlfSA9IHtzdHJpY3REaTogZmFsc2UsIGRpc2FibGVkOiBmYWxzZX0pIHtcbiAgY29uc3QgJGluamVjdFByb3BlcnR5ID0gYXBpQ2hlY2suZnVuYy53aXRoUHJvcGVydGllcyh7XG4gICAgJGluamVjdDogYXBpQ2hlY2suYXJyYXlPZihhcGlDaGVjay5zdHJpbmcpXG4gIH0pO1xuXG4gIGNvbnN0IGFycmF5U3ludGF4ID0gYXBpQ2hlY2sudXRpbHMuY2hlY2tlckhlbHBlcnMuc2V0dXBDaGVja2VyKGZ1bmN0aW9uIGFycmF5U3ludGF4KHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsKSkge1xuICAgICAgcmV0dXJuIGFwaUNoZWNrLnV0aWxzLmdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBhcGlDaGVjay5hcnJheS50eXBlKTtcbiAgICB9XG4gICAgbGV0IGNvcHkgPSB2YWwuc2xpY2UoKTtcbiAgICBjb25zdCBmbiA9IGNvcHkucG9wKCk7XG4gICAgY29uc3QgYXJyYXlPZlN0cmluZ3NDaGVja2VyID0gYXBpQ2hlY2suYXJyYXlPZihhcGlDaGVjay5zdHJpbmcpO1xuICAgIGNvbnN0IG5vdEFycmF5T2ZTdHJpbmdzID0gYXJyYXlPZlN0cmluZ3NDaGVja2VyKGNvcHkpO1xuICAgIGlmIChhcGlDaGVjay51dGlscy5pc0Vycm9yKG5vdEFycmF5T2ZTdHJpbmdzKSkge1xuICAgICAgcmV0dXJuIGFwaUNoZWNrLnV0aWxzLmdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBhcnJheU9mU3RyaW5nc0NoZWNrZXIudHlwZSk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBhcGlDaGVjay51dGlscy5nZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgYXBpQ2hlY2suZnVuYy50eXBlKTtcbiAgICB9XG4gIH0sIHt0eXBlOiAnYW5ndWxhciBpbmplY3RhYmxlIGZ1bmN0aW9uIChhcnJheSBzeW50YXgpJ30sIGRpc2FibGVkKTtcblxuICBjb25zdCB0eXBlcyA9IFskaW5qZWN0UHJvcGVydHksIGFycmF5U3ludGF4XTtcblxuICBpZiAoIXN0cmljdERpKSB7XG4gICAgdHlwZXMucHVzaChhcGlDaGVjay5mdW5jKTtcbiAgfVxuXG4gIHJldHVybiBhcGlDaGVjay5vbmVPZlR5cGUodHlwZXMpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9lc2xpbnQtbG9hZGVyIS4vY2hlY2tlcnMvaW5qZWN0YWJsZUZ1bmN0aW9uLmpzXG4gKiovIiwiaW1wb3J0IGNoZWNrZXJVdGlscyBmcm9tICcuL2NoZWNrZXJVdGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRkbyh7XG4gIHNjb3BlVHlwZXMsIHN0cmljdERpID0gZmFsc2UsIGRpc2FibGVkID0gZmFsc2VcbiAgfSA9IHtcbiAgc3RyaWN0RGk6IGZhbHNlLCBkaXNhYmxlZDogZmFsc2Vcbn0pIHtcbiAgaWYgKGRpc2FibGVkKSB7XG4gICAgcmV0dXJuIGNoZWNrZXJVdGlscy5ub29wQ2hlY2tlcjtcbiAgfVxuXG4gIGNvbnN0IGNoZWNrID0gc2NvcGVUeXBlcztcbiAgaWYgKCFjaGVjaykge1xuICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGFuIGluc3RhbmNlIG9mIHNjb3BlVHlwZXMnKTtcbiAgfVxuICBjb25zdCBzdHJpbmdPckZ1bmMgPSBzY29wZVR5cGVzLm9uZU9mVHlwZShbY2hlY2suc3RyaW5nLCBjaGVjay5mdW5jXSk7XG4gIGNvbnN0IGRkb1NoYXBlID0gY2hlY2suc2hhcGUoe1xuICAgIHByaW9yaXR5OiBjaGVjay5udW1iZXIub3B0aW9uYWwsXG4gICAgdGVtcGxhdGU6IGNoZWNrLnNoYXBlLmlmTm90KCd0ZW1wbGF0ZVVybCcsIHN0cmluZ09yRnVuYykub3B0aW9uYWwsXG4gICAgdGVtcGxhdGVVcmw6IGNoZWNrLnNoYXBlLmlmTm90KCd0ZW1wbGF0ZScsIGNoZWNrLnN0cmluZykub3B0aW9uYWwsXG4gICAgdHJhbnNjbHVkZTogY2hlY2suYm9vbC5vcHRpb25hbCxcbiAgICByZXN0cmljdDogY2hlY2sub25lT2YoWydBJywgJ0UnLCAnQUUnLCAnRUEnXSkub3B0aW9uYWwsIC8vIDwtLSBUT0RPLCBtb3JlIGNvbWJpbmF0aW9uc1xuICAgIHRlbXBsYXRlTmFtZXNwYWNlOiBjaGVjay5zdHJpbmcub3B0aW9uYWwsIC8vIFRPRE8sIGRvY3MgcHJvdmlkZWQgdmFsdWU6ICdodG1sJyxcbiAgICBzY29wZTogY2hlY2sub25lT2ZUeXBlKFtjaGVjay5ib29sLCBjaGVjay5vYmplY3RdKS5vcHRpb25hbCwgLy8gVE9ETywgbWFrZSBhIHNjb3BlIGNoZWNrZXJcbiAgICBjb250cm9sbGVyOiBjaGVjay5pbmplY3RhYmxlRnVuY3Rpb24ub3B0aW9uYWwsXG4gICAgY29udHJvbGxlckFzOiBjaGVjay5zdHJpbmcub3B0aW9uYWwsXG4gICAgYmluZFRvQ29udHJvbGxlcjogY2hlY2sub25lT2ZUeXBlKFtjaGVjay5ib29sLCBjaGVjay5vYmplY3RdKS5vcHRpb25hbCxcbiAgICAvLyBUT0RPLCB0ZWxsIHRoZSB2ZXJzaW9uIG9mIGFuZ3VsYXIgYW5kIHVzZSBhIHNjb3BlIGNoZWNrZXIgZm9yICsxLjRcbiAgICByZXF1aXJlOiBjaGVjay5zdHJpbmcub3B0aW9uYWwsIC8vIFRPRE8gbWFrZSBhIHBhdHRlcm4gY2hlY2tlci5cbiAgICAvLydzaWJsaW5nRGlyZWN0aXZlTmFtZScsIC8vIG9yIC8vIFsnXnBhcmVudERpcmVjdGl2ZU5hbWUnLCAnP29wdGlvbmFsRGlyZWN0aXZlTmFtZScsICc/Xm9wdGlvbmFsUGFyZW50J10sXG4gICAgY29tcGlsZTogY2hlY2suZnVuYy5vcHRpb25hbCxcbiAgICBsaW5rOiBjaGVjay5vbmVPZlR5cGUoW1xuICAgICAgY2hlY2suZnVuYyxcbiAgICAgIGNoZWNrLnNoYXBlKHtcbiAgICAgICAgcHJlOiBjaGVjay5mdW5jLm9wdGlvbmFsLFxuICAgICAgICBwb3N0OiBjaGVjay5mdW5jLm9wdGlvbmFsXG4gICAgICB9KS5zdHJpY3RcbiAgICBdKS5vcHRpb25hbCxcbiAgICBzY29wZVR5cGVzOiBjaGVjay5vYmplY3RPZihjaGVjay5mdW5jKS5vcHRpb25hbFxuICB9KS5zdHJpY3Q7XG5cbiAgcmV0dXJuIGNoZWNrLm9uZU9mVHlwZShbY2hlY2suZnVuYywgZGRvU2hhcGVdKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vZXNsaW50LWxvYWRlciEuL2NoZWNrZXJzL2Rkby5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV83X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImFuZ3VsYXJcIlxuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImZ1bmN0aW9uIG5vb3BDaGVja2VyKCkge1xufVxubm9vcENoZWNrZXIubnVsbGFibGUgPSBub29wQ2hlY2tlcjtcbm5vb3BDaGVja2VyLm51bGxhYmxlLm9wdGlvbmFsID0gbm9vcENoZWNrZXI7XG5cbmV4cG9ydCBkZWZhdWx0IHtub29wQ2hlY2tlcn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2VzbGludC1sb2FkZXIhLi9jaGVja2Vycy9jaGVja2VyVXRpbHMuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9