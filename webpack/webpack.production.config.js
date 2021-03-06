var path = require('path');
var BundleTracker = require('webpack-bundle-tracker');
var webpack = require('webpack');
var config = require('./webpack.base.config.js');

config.entry = {
  Index: [
    path.join(__dirname, '../static/js/src/main/index')
  ],
  vendors: ['react'],
};

config.output = {
  path: path.join(__dirname, '../static/builds/'),
  filename: '[name]-[hash].min.js',
  publicPath: '/static/js/builds/'
};

config.plugins = [
  new BundleTracker({ filename: './webpack/webpack-stats.production.json' }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
      BASE_URL: JSON.stringify('http://0.0.0.0/'),
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    mangle: false,
    sourcemap: false
  }),
  new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'), //seperates bundle files, one for react.js one for our app. Caches react library so users don't have to redownload.
];

module.exports = config
