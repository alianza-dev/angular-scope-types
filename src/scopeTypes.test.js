/* eslint no-console:0 */
import {expect} from 'chai';

import {scopeTypesFactory} from './scopeTypes';

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

});
