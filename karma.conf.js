//this is for backend testing only

var webpackConfig = require('./webpack.backend.js');
webpackConfig.devtool = 'inline-source-map';

////remove references to "hot"
webpackConfig.entry = ['./src/backend-web-app/main.js'];

module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        singleRun: true,
        frameworks: ['mocha', 'chai', 'sinon', 'sinon-chai'],
        files: ['./test/backend-web-app/*.index.js'],
        plugins: [
            'karma-phantomjs-launcher',
            'karma-chai',
            'karma-mocha',
            'karma-sourcemap-loader',
            'karma-webpack',
            'karma-mocha-reporter',
            'karma-sinon',
            'karma-sinon-chai',
            'karma-babel-preprocessor'
        ],
        preprocessors: {
            './test/**/*.js': ['webpack', 'babel']
        },
        reporters: ['mocha'],
        webpack: webpackConfig,
        webpackServer: {
            noInfo: true
        },

        autoWatch: true
    });
};