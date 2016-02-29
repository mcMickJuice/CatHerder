var gulp = require('gulp');
var mocha = require('mocha');
var path = require('path');
var backendConfig = require('../webpack.backend.js');
var rimraf = require('rimraf');
var webpack = require('webpack');

function backendTestBuild(testOutput, done) {
    //change output to test file output
    backendConfig.output = testOutput;

    webpack(backendConfig).run((err, stats => {
        if(err) {
            console.log('error in backend test build!', err);
            process.exit();
        }

        done();
    }));
}

function runTest(testFile, done) {
    var options = {
        files: [testFile]
    };

    mocha(options, function() {
        done();
    })
}

function cleanTests(directoryPath) {
    rimraf(directoryPath);
}

gulp.task('test-backend', function() {
    var outputOptions = {
        filename: 'backend-test.js'
    };

    var testfileOutput = path.resolve(__dirname, 'testOutput');
    var testFile =
    backendTestBuild({
        filename: 'backend-test.js',
        path: testfileOutput
    }, runTest(testFile, cleanTests(testfileOutput)));
});