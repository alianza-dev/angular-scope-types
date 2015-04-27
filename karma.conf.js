// Karma configuration
var deepExtend = require('deep-extend');
var path = require('path');
var ci = process.env.NODE_ENV === 'test:ci';

var preprocessors;
var reporters = ['progress'];
var files = [
  './node_modules/api-check/dist/api-check.js',
  './node_modules/angular/angular.js',
  './node_modules/chai/chai.js'
];
if (ci) {
  files.push('./.test/api-check-angular.min.js');
} else {
  files.push('./.test/api-check-angular.js');
  preprocessors = {
    '**/*.js': ['sourcemap'],
    '.test/**/*.js': ['coverage']
  };
  reporters.push('coverage');
}

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',
    frameworks: ['mocha'],
    files: files,
    exclude: [],

    preprocessors: preprocessors,

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: reporters,

    coverageReporter: {
      reporters: [
        {type: 'lcov', dir: 'coverage/', subdir: '.'},
        {type: 'json', dir: 'coverage/', subdir: '.'}
      ]
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: !ci,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ci ? ['Firefox'] : ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: ci,

    browserNoActivityTimeout: 180000,

    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-coverage',
      'karma-sourcemap-loader',
      'karma-chrome-launcher',
      'karma-firefox-launcher'
    ]
  });
};
