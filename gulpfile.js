var gulp = require('gulp');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var runSequence = require('run-sequence');
var path = require('path');
var nodemon = require('nodemon');
var rimraf = require('rimraf');
var backendConfig = require('./webpack.backend.js');
var frontendConfig = require('./webpack.frontend.js');


gulp.task('clean', function(done) {
    rimraf('./build', {}, () => done());
});

gulp.task('move-static', function() {
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
    var firedDone = false;
    webpack(backendConfig).watch(100, function (err, stats) {
        if (!firedDone) {
            firedDone = true;
            done();
        }

        nodemon.restart();
    })
});

gulp.task('nodemon-start', function() {
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
});

gulp.task('watch', function (done) {
    runSequence('clean', 'move-static'
    ,['backend-watch', 'frontend-watch']
    , 'nodemon-start'
    , done);
});

