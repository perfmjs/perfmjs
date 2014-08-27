/**
 * gulp构建脚本
 * Created by Administrator on 2014/8/26.
 */
var gulp      = require('gulp');
var gutil     = require('gulp-util');
var uglify    = require('gulp-uglify');
var concat    = require('gulp-concat');
var jshint    = require('gulp-jshint');
var del        = require('del');
//var jsdoc   = require('gulp-jsdoc');

var paths = {
    "core.name": "core-1.3.5",
    scripts: [
        './lib/perfmjs/perfmjs.js',
        './lib/perfmjs/sysconfig.js',
        './lib/perfmjs/base.js',
        './lib/perfmjs/joquery.js',
        './lib/perfmjs/async.js',
        './lib/perfmjs/amd.js',
        './lib/perfmjs/browser.js',
        './lib/perfmjs/logger.js',
        './lib/perfmjs/head.load.js',
        './lib/perfmjs/includeres.js',
        './lib/perfmjs/event-proxy.js',
        './lib/perfmjs/fsm.js',
        './lib/perfmjs/app.js'
    ]
};

gulp.task('clean', function(cb) {
    del(['./build'], cb);
});
gulp.task('concat', ['clean'], function () {
    gulp.src(paths.scripts)
        .pipe(concat(paths['core.name'] + '.js'))
        .pipe(gulp.dest('build'))
        .pipe(uglify())
        .pipe(concat(paths['core.name'] + '.min.js'))
        .pipe(gulp.dest('build'));
});

gulp.task('default', ['concat']);