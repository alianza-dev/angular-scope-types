/* eslint no-console:0 */
import {expect} from 'chai';
import apiCheckAngularFactory from './apiCheckAngular';

describe(`apiCheckAngular`, () => {
  let scopeTypes, originalWarn, warnings;
  beforeEach(() => {
    warnings = [];
    originalWarn = console.warn;
    console.warn = fakeWarn;
    scopeTypes = apiCheckAngularFactory();
  });

  describe(`directive`, () => {
    it(`should fail when the DDO has extra stuff`, () => {
      scopeTypes.directive({
        whatever: 'foo'
      });
      expectWarning(/whatever(.|\n)*?foo/);
    });

    it(`should pass when given a function`, () => {
      scopeTypes.directive(function link(scope, el, attrs) {
      });
      expectWarning(0);
    });

    it(`should pass when given a valid DDO`, () => {
      scopeTypes.directive({
        template: 'Hello!',
        link() {
        },
        controllerAs: 'vm',
        controller,
        bindToController: true,
        scopeTypes: {
          foo: scopeTypes.shape({})
        }
      });

      controller.$inject = ['hey!'];
      function controller() {
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
    switch (typeof warning) {
      case 'number':
        expect(warnings).to.have.length(warning);
        break;
      case 'string':
        expect(warnings).to.have.length(1);
        expect(warnings[0]).to.have.length(1);
        expect(warnings[0][0]).to.include(warning);
        break;
      case 'object':
        expect(warnings).to.have.length(1);
        expect(warnings[0]).to.have.length(1);
        expect(warnings[0][0]).to.match(warning);
        break;
    }
  }

});
