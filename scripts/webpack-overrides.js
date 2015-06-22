var here = require('kcd-common-tools/utils/here');
var _ = require('lodash');
module.exports = function(defaultConfig) {
  return _.merge(defaultConfig, {
    output: {
      library: 'angularScopeTypes',
      libraryTarget: 'umd'
    },
    externals: {
      angular: 'angular',
      'api-check': {
        root: 'apiCheck',
        amd: 'api-check',
        commonjs2: 'api-check',
        commonjs: 'api-check'
      }
    },
    resolve: {
      alias: {
        'angular-fix': here('src/angular-fix')
      }
    }
  });
};
