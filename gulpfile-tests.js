var gulp = require('gulp');
var Mocha = require('mocha');
var path = require('path');
var backendConfig = require('./webpack.backend.js')('development');
var rimraf = require('rimraf');
var webpack = require('webpack');
var Q = require('q');

function backendTestBuild(testConfig) {
    //change output to test file output
    var deferred = Q.defer();
    backendConfig = Object.assign({}, backendConfig, testConfig);

    webpack(backendConfig).run((err, stats) => {
        if (err) {
            console.log('error in backend test build!', err);
        }

        deferred.resolve();
    });

    return deferred.promise;
}

function runTest(testFile) {
    var mochaRunner = new Mocha();
    var deferred = Q.defer();
    //mocha.addFile is an option too
    mochaRunner.files = [testFile];
    mochaRunner.run(() => deferred.resolve());

    return deferred.promise;
}

function cleanTests(directoryPath) {
    var deferred = Q.defer();
    rimraf(directoryPath, {}, () => deferred.resolve());

    return deferred.promise;
}

gulp.task('test-backend', function (done) {
    var outputOptions = {
        entry: [path.join(__dirname, 'test/backend-web-app/backend-tests.index.js')],
        output: {
            filename: 'backend-test.js',
            path: path.join(__dirname, 'test/testOutput')
        }
    };

    backendTestBuild(outputOptions)
        .then(() => runTest(path.resolve(outputOptions.output.path, outputOptions.output.filename)))
        .then(() => cleanTests(outputOptions.output.path))
        .then(() => done())
        .catch(err => {
            console.log('Error in test pipeline', err);
        });
});