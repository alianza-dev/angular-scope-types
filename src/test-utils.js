import {expect} from 'chai';

/* istanbul ignore next */
const controllers = {
  regular: function RegularCtrl() {
  },
  array: ['foo', function ArrayCtrl(foo) {
  }],
  $inject: function $InjectCtrl(bar) {
  }
};
controllers.$inject.$inject = ['bar'];

export {expectPass, expectFail, link, controllers};


function expectPass(val) {
  expect(val).to.be.undefined;
}

function expectFail(val) {
  expect(val).to.be.an.instanceOf(Error);
}

/* istanbul ignore next */
function link(scope, el, attrs, ctrl, transclude) {
}


