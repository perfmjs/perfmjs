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
   "core.name.snapshot": "core",
   "core.name.release": "core-2.1.2",
    scripts: [
        './lib/perfmjs/perfmjs.js',
        './lib/perfmjs/sys-config.js',
        './lib/perfmjs/base.js',
        './lib/perfmjs/joquery.js',
        './lib/perfmjs/app-config.js',
        './lib/perfmjs/async.js',
        './lib/perfmjs/amd.js',
        './lib/perfmjs/logger.js',
        './lib/perfmjs/head.load.js',
        './lib/perfmjs/include-res.js',
        './lib/perfmjs/event-proxy.js',
        './lib/perfmjs/fsm.js',
        './lib/perfmjs/app.js'
    ]
};

gulp.task('clean', function(cb) {
    del(['./build'], cb);
});
gulp.task('concat', ['clean'], function () {
    var coreName = "core.name.snapshot";
    gulp.src(paths.scripts)
        .pipe(concat(paths[coreName] + '.js'))
        .pipe(gulp.dest('build'))
        .pipe(uglify())
        .pipe(concat(paths[coreName] + '.min.js'))
        .pipe(gulp.dest('build'));
});

gulp.task('default', ['concat']);