var webpack = require('webpack');
var path = require('path');

var thirdParty = '/(node_modules|bower_components)/';

var nodeModules = require('fs').readdirSync('node_modules')
    .filter(x => ['bin'].indexOf(x) === -1);

module.exports = {
    entry: [
        'webpack/hot/signal.js',
        './src/backend-web-app/main.js'
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'backend-web.js'
    },
    node:{
        __dirname: false,
    },
    externals: [
        function (context, request, callback) {
            var pathStart = request.split('/')[0];
            if (nodeModules.indexOf(pathStart) >= 0 && request != 'webpack/hot/signal.js') {
                return callback(null, "commonjs " + request);
            }

            callback();
        }
    ],
    module: {
        loaders: [
            {test: /\.js$/, exclude: thirdParty, loader: 'babel', query: {cacheDirectory: true, presets: ['es2015']}}
        ]
    },
    debug: true,
    devtool: 'source-map',
    recordsPath: path.join(__dirname, 'build/_records'),
    devServer: {
        stats: 'errors-only'
    },
    plugins: [
        new webpack.IgnorePlugin(/.(css|less|jsx)$/),
        new webpack.BannerPlugin('require("source-map-support").install();'),
        new webpack.HotModuleReplacementPlugin({quiet: true})
    ]
};
