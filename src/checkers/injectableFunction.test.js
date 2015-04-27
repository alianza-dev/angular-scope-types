import {expect} from 'chai';
import {expectPass, expectFail, controllers} from '../test-utils';
import injectableFunction from './injectableFunction';

describe(`injectableFunction checker`, () => {

  describe(`basic checker info`, () => {
    let checker;
    beforeEach(() => {
      checker = injectableFunction();
    });

    it(`should have optional`, () => {
      expect(checker.optional).to.be.a('function');
    });

    it(`should have nullable with optional`, () => {
      expect(checker.nullable).to.be.a('function');
      expect(checker.nullable.optional).to.be.a('function');
    });

    it(`should pass with $inject property`, () => {
      expectPass(checker(controllers.$inject));
    });

    it(`should pass with Array syntax`, () => {
      expectPass(checker(controllers.array));
    });

    it(`should fail when given an array with non-strings before the function`, () => {
      expectFail(checker(['foo', 23, controllers.regular]));
    });

    it(`should fail when given an array with the function not last`, () => {
      expectFail(checker(['foo', controllers.regular, 'bar']));
    });

    it(`should fail when not given a function`, () => {
      expectFail(checker(['foo', 'baz', 'bar']));
    });
  });

  describe(`strictDi: false`, () => {
    let checker;
    beforeEach(() => {
      checker = injectableFunction();
    });

    it(`should pass with a function`, () => {
      expectPass(checker(controllers.regular));
    });
  });

  describe(`strictDi: true`, () => {
    let checker;
    beforeEach(() => {
      checker = injectableFunction({strictDi: true});
    });

    it(`should fail with a function`, () => {
      expectFail(checker(controllers.regular));
    });
  });

  describe(`disabled: true`, () => {
    let checker;
    beforeEach(() => {
      checker = injectableFunction({disabled: true});
    });

    it(`should succeed in any case`, () => {
      expectPass(checker('foo'));
      expectPass(checker(controllers.regular));
    });
  });

});


