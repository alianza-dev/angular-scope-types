import {expectPass, expectFail, link, controllers} from '../test.utils';
import scopeTypesFactory from '../scopeTypes';

import ddoFactory from './ddo';

describe(`ddo checker`, () => {

  describe(`basic checker`, () => {
    let checker, scopeTypes;
    beforeEach(() => {
      scopeTypes = scopeTypesFactory();
      checker = ddoFactory({scopeTypes});
    });

    it(`should pass with a link function`, () => {
      expectPass(checker(link));
    });

    it(`should fail when the DDO has extra stuff`, () => {
      expectFail(checker({
        whatever: 'foo'
      }));
    });

    it(`should pass when given a valid DDO`, () => {
      expectPass(checker({
        template: 'Hello!',
        link,
        controllerAs: 'vm',
        controller: controllers.$inject,
        bindToController: true,
        /* istanbul ignore next */
        scopeTypes: st => ({foo: st.shape({})})
      }));
    });
  });

  describe(`disabled`, () => {
    let checker, scopeTypes;
    beforeEach(() => {
      scopeTypes = scopeTypesFactory();
      checker = ddoFactory({scopeTypes, disabled: true});
    });

    it(`should pass regardless of anything`, () => {
      expectPass(checker());
      expectPass(checker('foo'));
      expectPass(checker(link));
      expectPass(checker([]));
    });
  });
});
