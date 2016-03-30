var gulp = require('gulp');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var runSequence = require('run-sequence');
var path = require('path');
var eslint = require('gulp-eslint');
var nodemon = require('nodemon');
var rimraf = require('rimraf');
var args = require('yargs').argv;

process.env.NODE_ENV = args.env || 'development';

var backendConfig = require('./webpack.backend.js')(process.env.NODE_ENV);
var frontendConfig = require('./webpack.frontend.js');

gulp.task('clean', function (done) {
  rimraf('./build', {}, () => done());
});

gulp.task('move-static', function () {
  return gulp.src('./src/frontend-app/index.html')
    .pipe(gulp.dest('./build/static'));
});

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

var eslintGlob = args.glob || 'src/**/*.js*';
gulp.task('lint', function() {

  return gulp.src([eslintGlob, '!node_modules/**', '!build/**'])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('lint-watch', ['lint'], function() {
  gulp.watch(eslintGlob, ['lint']);
});

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
  new WebpackDevServer(webpack(frontendConfig), {
    publicPath: frontendConfig.output.publicPath,
    stats: 'errors-only',
  }).listen(3000, 'localhost', function (err, result) {
    if (err) {
      console.log('Error', err);
    }
    else {
      console.log('webpack dev server listening at localhost:3000');
    }
  })
});

gulp.task('backend-watch', function (done) {
  console.log(process.env.NODE_ENV)
  //add hotplugin
  var hotPlugin = new webpack.HotModuleReplacementPlugin({quiet: true});
  backendConfig.plugins.push(hotPlugin);
  //add signal.js to entry
  var signalJsEntry = 'webpack/hot/signal.js';
  if (backendConfig.entry instanceof Array && backendConfig.entry.indexOf(signalJsEntry) < 0) {
    backendConfig.entry.unshift(signalJsEntry);
  } else {
    backendConfig.entry = [signalJsEntry, backendConfig.entry];
  }

  var firedDone = false;

  var compiler = webpack(backendConfig);
  //run initial compile
  compiler.run((err, stats) => {
    if (err) {
      console.log('error on initial compile');
    }

    startServer();
  });

  //watch files to reload
  compiler.watch(100, function (err, stats) {
    if (!firedDone) {
      firedDone = true;
      done();
    }

    nodemon.restart();
  })
});

function startServer() {
  nodemon({
    execMap: {
      js: 'node'
    },
    script: path.resolve(__dirname, 'build/backend-web'),
    //ignore everything, watch nothing. webpack watch will handle restarting
    ignore: ['*'],
    watch: ['foo/'],
    ext: 'noop'
  }).on('restart', function () {
    console.log('Patched!!!')
  })
}

gulp.task('watch', ['lint-watch'], function (done) {
  runSequence('clean', 'move-static'
    , ['backend-watch', 'frontend-watch']
    , done);
});

