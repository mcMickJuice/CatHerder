var path = require('path');
var outputPath = path.join(__dirname, 'build/static');
var thirdParty = '/(node_modules|bower_components)/';


module.exports = {
  resolve: {
    extensions: ['', '.jsx', '.js']
  },
  entry: [
    //hot module loader too
    'webpack-dev-server/client?http://localhost:3000',
    './src/frontend-app/main.jsx'
  ],
  output: {
    path: outputPath + '/js',
    publicPath: 'http://localhost:3000/js',
    filename: 'frontend.js'
  },
  module: {
    loaders: [
      {test: /\.css$/, exclude: thirdParty, loader: 'style!css'},
      {test: /\.less$/, exclude: thirdParty, loader: 'style!css!less'},
      {
        test: /\.jsx?$/, exclude: thirdParty, loader: 'babel', query: {
        cacheDirectory: true,
        presets: ['es2015', 'react']
      }
      }
    ]
  },
  debug: true,
  devtool: 'inline-source-map',
  devServer: {
    stats: 'errors-only'
  }
};
