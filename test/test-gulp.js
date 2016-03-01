var gulp = require('gulp');
var Mocha = require('mocha');
var path = require('path');
var backendConfig = require('../webpack.backend.js');
var rimraf = require('rimraf');
var webpack = require('webpack');

function backendTestBuild(testConfig, done) {
    //change output to test file output
    backendConfig = Object.assign({}, backendConfig, testConfig);

    webpack(backendConfig).run((err, stats) => {
        if (err) {
            console.log('error in backend test build!', err);
            process.exit();
        }

        done();
    });
}

function runTest(testFile, done) {
    var mochaRunner = new Mocha();
    //mocha.addFile is an option too
    mochaRunner.files = [testFile];
    mochaRunner.run(done);
}

function cleanTests(directoryPath, done) {
    rimraf(directoryPath, {}, done);
}

gulp.task('test-backend', function (done) {
    var outputOptions = {
        entry: [path.resolve(__dirname, './backend-web-app/backend-tests.index.js')],
        output: {
            filename: 'backend-test.js',
            path: path.resolve(__dirname, 'testOutput')
        }
    };

    backendTestBuild(outputOptions,
        () => runTest(path.resolve(outputOptions.output.path, outputOptions.output.filename)
    , () => cleanTests(outputOptions.output.path, done)));
});