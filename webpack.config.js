var camelCase = require('camelcase');
var path = require('path');
var webpack = require('webpack');
var pkg = require(path.join(process.cwd(), 'package.json'));
var shouldMininimize = process.argv.indexOf('--min') !== -1;

function plugin (name) {
  return path.join(__dirname, 'node_modules', name);
}

var standardConfig = {
  entry: {
    'dist/bundle.js': './src/index.js'
  },
  output: {
    path: './',
    filename: '[name]',
    libraryTarget: 'umd',
    library: camelCase(pkg.name),
    sourceMapFilename: '[file].map'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.less$/,
      loader: 'style!css!less'
    }, {
      loader: plugin('babel-loader'),
      test: /\.js$/,
      query: {
        presets: plugin('babel-preset-es2015')
      }
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ]
};

if (shouldMininimize) {
  Object.assign(standardConfig.entry, {
    'dist/bundle.min.js': './src/index.js'
  });
}

module.exports = standardConfig;
