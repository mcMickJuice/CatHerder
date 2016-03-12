var gulp = require('gulp');
var Mocha = require('mocha');
var path = require('path');
var backendConfig = require('./webpack.backend.js')('test');
var rimraf = require('rimraf');
var webpack = require('webpack');
var Q = require('q');

function backendTestBuild(testConfig) {
  //change output to test file output
  var deferred = Q.defer();
  backendConfig = Object.assign({}, backendConfig, testConfig);

  webpack(backendConfig).run((err, stats) => {
    if (err) {
      deferred.reject(err);
      return;
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
    entry: path.resolve(__dirname, './test/backend-web-app/backend-tests.index.js'),
    output: {
      filename: 'backend-test.js',
      path: path.join(__dirname, './test/testOutput')
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: [
            /node_modules/
          ],
          loader: 'babel',
          query: {presets: ['es2015'], plugins: ['babel-plugin-rewire']}
        }
      ]
    },
  };

  backendTestBuild(outputOptions)
    .then(() => runTest(path.resolve(outputOptions.output.path, outputOptions.output.filename)))
    .then(() => cleanTests(outputOptions.output.path))
    .then(() => done())
    .catch(err => {
      console.log('Error in test pipeline', err, err.stack);
    });
});