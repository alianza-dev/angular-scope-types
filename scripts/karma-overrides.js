var _ = require('lodash');
var here = require('kcd-common-tools/utils/here');

module.exports = function(defaultConfig) {
  defaultConfig.files = _.union([
    here('./node_modules/angular/angular.js'),
    here('./node_modules/angular-mocks/angular-mocks.js'),
    here('./node_modules/api-check/dist/api-check.js')
  ], defaultConfig.files);
  return defaultConfig;
};
