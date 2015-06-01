var webpack = require('webpack');
var WebpackNotifierPlugin = require('webpack-notifier');
var deepExtend = require('deep-extend');
var fs = require('fs');
var path = require('path');

var packageJsonString = fs.readFileSync('package.json', 'utf8');
var packageJson = JSON.parse(packageJsonString);


var context = process.env.NODE_ENV || 'development';

var configFns = {
  development: getDevConfig,
  production: getProdConfig,
  test: getTestConfig,
  'test:ci': getTestCIConfig
};

var config = configFns[context]();
addCommonPlugins(config);

console.log('building version %s in %s mode', packageJson.version, context);
module.exports = config;


function getDevConfig() {
  var exclude = /node_modules/;
  var devConfig = {
    context: here('src'),
    entry: './index.js',
    output: {
      filename: 'angular-scope-types.js',
      path: here('dist'),
      library: 'angularScopeTypes',
      libraryTarget: 'umd'
    },

    stats: {
      colors: true,
      reasons: true
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

    plugins: [],

    resolve: {
      extensions: ['', '.js'],
      alias: {
        'angular-fix': here('src/angular-fix')
      }
    },

    module: {
      loaders: [
        {test: /\.js$/, loader: 'ng-annotate!babel!eslint', exclude: exclude}
      ]
    },
    eslint: {
      emitError: false,
      failOnError: false,
      failOnWarning: false
    }
  };

  if (process.env.ON_TRAVIS !== 'true') {
    devConfig.plugins = [
      new WebpackNotifierPlugin({
        title: 'ATAC',
        contentImage: here('other/logo.png')
      })
    ];
  }
  return devConfig;
}

function getProdConfig() {
  var prodConfig = deepExtend({}, getDevConfig(), {
    output: {
      filename: 'angular-scope-types.min.js',
      path: here('dist')
    },
    devtool: 'source-map',
    eslint: {
      emitError: true,
      failOnError: true,
      failOnWarning: true
    }
  });

  prodConfig.plugins = [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false}
    })
  ];
  return prodConfig;
}

function getTestConfig() {
  return deepExtend({}, getDevConfig(), {
    entry: './index.test.js',
    output: {
      path: here('.test')
    },
    externals: {
      chai: 'chai'
    },
    plugins: []
  });
}

function getTestCIConfig() {
  return deepExtend({}, getProdConfig(), {
    entry: './index.test.js',
    output: {
      path: here('.test')
    },
    externals: {
      chai: 'chai'
    }
  });
}

function addCommonPlugins(config) {
  config.plugins = config.plugins || [];
  // put the global variables before everything else
  config.plugins.unshift(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    VERSION: JSON.stringify(packageJson.version)
  }));

  // make sure to add the banner last so it's not removed by uglify
  config.plugins.push(new webpack.BannerPlugin(getBanner(), {raw: true}));

}

function getBanner() {
  return '// ' + packageJson.name + ' version ' +
    packageJson.version +
    ' built with ♥ by ' +
    packageJson.contributors.join(', ') +
    ' (ó ì_í)=óò=(ì_í ò)\n';
}

function here(p) {
  return path.join(__dirname, p || '');
}
