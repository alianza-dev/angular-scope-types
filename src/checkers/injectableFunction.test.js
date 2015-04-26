import {expect} from 'chai';
import injectableFunction from './injectableFunction';

function RegularFunction() {
}

function $Inject() {
}
$Inject.$inject = ['hey'];

const ArrayFunction = ['hey', function ArrayFunction(hey) {
}];

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
      expectPass(checker($Inject));
    });

    it(`should pass with Array syntax`, () => {
      expectPass(checker(ArrayFunction));
    });

    it(`should fail when given an array with non-strings before the function`, () => {
      expectFail(checker(['foo', 23, RegularFunction]));
    });

    it(`should fail when given an array with the function not last`, () => {
      expectFail(checker(['foo', RegularFunction, 'bar']));
    });
  });

  describe(`strictDi: false`, () => {
    let checker;
    beforeEach(() => {
      checker = injectableFunction();
    });

    it(`should pass with a function`, () => {
      expectPass(checker(RegularFunction));
    });
  });

  describe(`strictDi: true`, () => {
    let checker;
    beforeEach(() => {
      checker = injectableFunction({strictDi: true});
    });

    it(`should fail with a function`, () => {
      expectFail(checker(RegularFunction));
    });
  });

  describe(`disabled: true`, () => {
    let checker;
    beforeEach(() => {
      checker = injectableFunction({disabled: true});
    });

    it(`should succeed in any case`, () => {
      expectPass(checker('foo'));
      expectPass(checker(RegularFunction));
    });
  });

  function expectPass(val) {
    expect(val).to.be.undefined;
  }

  function expectFail(val) {
    expect(val).to.be.an.instanceOf(Error);
  }

});


