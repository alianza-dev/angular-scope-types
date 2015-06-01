/* eslint no-console:0 */
/* eslint max-nested-callbacks:0 */
import {expect} from 'chai';
import angular from 'angular-fix';
import sinon from 'sinon';

import scopeTypesFactory from './scopeTypes';

describe(`scopeTypes`, () => {
  let scopeTypes, originalWarn, warnings;
  beforeEach(() => {
    warnings = [];
    originalWarn = console.warn;
    console.warn = fakeWarn;
    scopeTypes = scopeTypesFactory();
  });

  describe(`directive`, () => {
    it(`should fail when the DDO has extra stuff`, () => {
      scopeTypes.directive({
        whatever: 'foo'
      });
      expectWarning(/whatever(.|\n)*?foo/);
    });

    describe(`creating directives`, () => {
      let scope, el;

      const basicTemplate = '<scope-type-dir foo="foo" bar="barString"></scope-type-dir>';

      it(`should allow me to create a type checked directive`, () => {
        createDirective();
        compileAndDigest({
          foo: {isFoo: true, isBar: false, someNum: 23}
        });
        expectNoWarning();
      });

      it(`should warn me when I pass something wrong to the directive`, () => {
        createDirective();
        compileAndDigest({
          foo: {isFoo: 'not a boolean', isBar: false, someNum: 23}
        });
        expectWarning(/not a boolean/);
      });

      it(`should be able to be disabled`, () => {
        const myDisabledScopeTypes = scopeTypesFactory({disabled: true});
        const myDirName = 'dirName';
        const controller = sinon.spy();
        const scopeTypesSpy = sinon.spy(getScopeTypes);
        createDirective(myDirName, {controller}, myDisabledScopeTypes);

        compileAndDigest({}, '<dir-name></dir-name>');

        angular.mock.inject(['$injector', $injector => {
          const ddo = $injector.get(`${myDirName}Directive`);

          expect(ddo[0].controller).to.eq(controller);
          expect(controller).to.have.been.called;
          expect(scopeTypesSpy).to.not.have.been.called;
          expectNoWarning();
        }]);
      });

      function createDirective(name, definition, scopeTypesInstance = scopeTypes) {
        angular.mock.module(['$provide', '$compileProvider', function($provide, $compileProvider) {
          $provide.constant('myScopeTypes', scopeTypesInstance);
          $compileProvider.directive(name || 'scopeTypeDir', ['myScopeTypes', function(myScopeTypes) {
            return myScopeTypes.directive(angular.extend({
              template: 'foo',
              scope: {foo: '=', bar: '@'},
              scopeTypes: getScopeTypes
            }, definition));
          }]);
        }]);
      }


      function compileAndDigest(extraProps = {}, template = basicTemplate) {
        angular.mock.inject(['$compile', '$rootScope', ($compile, $rootScope) => {
          scope = $rootScope.$new();
          angular.extend(scope, extraProps);
          el = $compile(template)(scope);
          scope.$digest();
        }]);
        return el;
      }

      function getScopeTypes(st) {
        return {
          foo: st.shape({
            isFoo: st.bool,
            isBar: st.bool,
            someNum: st.number,
            someOptional: st.object.optional
          }).strict,
          bar: st.oneOf(['fooString', 'barString']).optional
        };
      }
    });
  });

  afterEach(() => {
    console.warn = originalWarn;
  });

  function fakeWarn() {
    warnings.push(arguments);
  }

  function expectWarning(warning) {
    expect(warnings).to.have.length(1);
    expect(warnings[0]).to.have.length(1);
    expect(warnings[0][0]).to.match(warning);
  }

  function expectNoWarning() {
    expect(warnings).to.have.length(0);
  }

});
