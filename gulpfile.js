var gulp = require('gulp');
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var path = require('path');
var nodemon = require('nodemon');

//setup backend config
var thirdParty = '/(node_modules|bower_components)/';

var nodeModules = require('fs').readdirSync('node_modules')
    .filter(x => ['bin'].indexOf(x) === -1);

var backendConfig = {
    entry: [
        'webpack/hot/signal.js',
        './src/backend-web-app/main.js'
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'backend-web.js'
    },
    node: {
        __dirname: false,
        __filename: true
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


//setup web config

var frontendConfig = {
    entry: [
        //hot module loader too
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/frontend-app/main.js'
    ],
    output: {
        path: path.join(__dirname, 'build/static'),
        publicPath: 'http://localhost:4000/static',
        fileName: 'frontend.js'
    },
    module: {
        loaders: [
            {test: /\.css$/, exclude: thirdParty, loader: 'style!css'},
            {test: /\.less$/, exclude: thirdParty, loader: 'style!css!less'},
            {
                test: /\.jsx$/, exclude: thirdParty, loader: 'babel', query: {
                cacheDirectory: true,
                presets: ['es2015', 'react']
            }
            }
        ]
    },
    debug: true,
    devServer: {
        stats: 'errors-only'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin({quiet: true})
    ]
};

function onBuild(done) {
    return function (err, stats) {
        if (err) {
            console.log('Error', err);
        }
        else {
            console.log('Webpack Finished')
        }

        if (done) done();
    }
}

gulp.task('frontend-build', function (done) {
    webpack(frontendConfig).run(onBuild(done))
});

gulp.task('backend-build', function (done) {
    webpack(backendConfig).run(onBuild(done))
});

gulp.task('build', ['frontend-build', 'backend-build'], function () {
    console.log('Apps Built!')
});

gulp.task('frontend-watch', function () {
    webpackDevServer(webpack(frontendConfig), {
        publicPath: frontendConfig.output.publicPath,
        stats: 'errors-only',
        hot: true
    }).listen(3000, 'localhost', function (err, result) {
        if (err) {
            console.log('Error', err);
        }
        else {
            console.log('webpack dev server listening at localhost:3000');
        }
    })
});

gulp.task('backend-watch', function(done) {
    var firedDone = false;
    webpack(backendConfig).watch(100, function(err, stats) {
        console.log('change detected, starting nodemon');
        if(!firedDone) {
            firedDone = true;
            done();
        }

        nodemon.restart();
    })
});

gulp.task('watch', ['backend-watch'], function() {
   nodemon({
       execMap: {
           js: 'node'
       },
       script: path.resolve(__dirname, 'build/backend-web'),
       //ignore everything, watch nothing. webpack watch will handle restarting
       ignore: ['*'],
       watch: ['foo/'],
       ext: 'noop'
   }).on('restart', function() {
       console.log('Patched!!!')
   })
});

