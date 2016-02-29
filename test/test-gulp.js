var gulp = require('gulp');
var mocha = require('mocha');
var path = require('path');
var backendConfig = require('../webpack.backend.js');
var rimraf = require('rimraf');
var webpack = require('webpack');

function backendTestBuild(testConfig, done) {
    //change output to test file output
    backendConfig = Object.assign({}, backendConfig, testConfig);
    console.log('backendTestBuild', backendConfig)

    webpack(backendConfig).run((err, stats) => {
        if (err) {
            console.log('error in backend test build!', err);
            process.exit();
        }

        done();
    });
}

function runTest(testFile, done) {
    console.log('run test', testFile);
    var options = {
        files: [testFile]
    };

    mocha(options, function () {
        done();
    })
}

function cleanTests(directoryPath) {
    console.log('clean tests', directoryPath)
    rimraf(directoryPath);
}

gulp.task('test-backend', function () {
    var outputOptions = {
        entry: [path.resolve(__dirname, './backend-tests.index.js')],
        output: {
            filename: 'backend-test.js',
            path: path.resolve(__dirname, 'testOutput')
        }
    };

    backendTestBuild(outputOptions,
        () => runTest(path.resolve(outputOptions.output.path, outputOptions.output.filename))
    , () => cleanTests(outputOptions.output.path));
});