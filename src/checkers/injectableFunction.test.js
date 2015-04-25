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

  describe(`strictDi: false`, () => {
    let checker;
    beforeEach(() => {
      checker = injectableFunction();
    });

    it(`should pass with a function`, () => {
      expect(checker(RegularFunction)).to.be.undefined;
    });

    it(`should pass with $inject property`, () => {
      expect(checker($Inject)).to.be.undefined;
    });

    it(`should pass with Array syntax`, () => {
      expect(checker(ArrayFunction)).to.be.undefined;
    });
  });

});


