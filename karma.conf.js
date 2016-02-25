//this is for frontend testing only

//var webpackConfig = require('./webpack.backend.js');
//webpackConfig.devtool = 'inline-source-map';
//
//module.exports = function (config) {
//    config.set({
//        browsers: [ 'PhantomJS' ],
//        singleRun: true,
//        frameworks: [ 'mocha', 'chai', 'sinon', 'sinon-chai' ],
//        files: [
//            'tests.webpack.js'
//        ],
//        plugins: [
//            'karma-phantomjs-launcher',
//            'karma-chai',
//            'karma-mocha',
//            'karma-sourcemap-loader',
//            'karma-webpack',
//            'karma-mocha-reporter',
//            'karma-sinon',
//            'karma-sinon-chai',
//            'karma-babel-preprocessor'
//        ],
//        preprocessors: {
//            'tests.webpack.js': [ 'babel', 'sourcemap' ]
//        },
//        reporters: [ 'mocha' ],
//        //webpack: webpackConfig,
//        //webpackServer: {
//        //    noInfo: true
//        //},
//
//        autoWatch: true
//    });
//};