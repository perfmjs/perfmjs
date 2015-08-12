//ref to: https://github.com/gionkunz/angular2-sandbox/blob/master/gulpfile.js
var gulp = require('gulp');
var connect = require('gulp-connect');

var src = './src';
var filesToReload = src + '/**/*.{html,js}';

gulp.task('connect', function() {
    connect.server({
        root: src,
        livereload: true
    });
});

gulp.task('reload', function () {
    gulp.src(filesToReload)
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch([filesToReload], ['reload']);
});

gulp.task('default', ['connect', 'watch']);