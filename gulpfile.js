/**
 * gulp构建脚本
 * Created by Administrator on 2014/8/26.
 */
var gulp      = require('gulp');
var uglify    = require('gulp-uglify');
var concat    = require('gulp-concat');
var del       = require('del');
//below for typescript compile
var ts = require('gulp-typescript');
var merge = require('merge2');
//below for typescript traceur
var gulpTraceur = require('gulp-traceur');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
    "core.name.snapshot": "core",
    "core.name.release": "core-2.1.2",
    "core.ts.snapshot": "core-3.0.1",
    scripts: [
        './lib/perfmjs/core.js',
        './lib/perfmjs/sys-config.js',
        './lib/perfmjs/base.js',
        './lib/perfmjs/joquery.js',
        './lib/perfmjs/app-config.js',
        './lib/perfmjs/async.js',
        './lib/perfmjs/amd.js',
        './lib/perfmjs/logger.js',
        './lib/perfmjs/head.load.js',
        './lib/perfmjs/loader.js',
        './lib/perfmjs/event.proxy.js',
        './lib/perfmjs/fsm.js',
        './lib/perfmjs/app.js'
    ],
    "tsScripts": [
        './lib/perfmjs3/**/*.ts'
    ]
};

gulp.task('clean-build', function(cb) {
    del(['./build'], cb);
});
gulp.task('concat', ['clean-build'], function () {
    var coreName = "core.name.snapshot";
    gulp.src(paths.scripts)
        .pipe(concat(paths[coreName] + '.js'))
        .pipe(gulp.dest('build'))
        .pipe(uglify())
        .pipe(concat(paths[coreName] + '.min.js'))
        .pipe(gulp.dest('build'));
});

gulp.task('default', ['concat']);

gulp.task('clean-dist', function(cb) {
    del(['./dist'], cb);
});

//typescript compile task， 参考：https://github.com/ivogabe/gulp-typescript
///*把下面的代码加到typescript.js#emitSystemModule()中去，可以在system.register中定义模块Id*/
///*got module Name from typescript.js#emitSystemModule() begin*/
//var filePrefix = '/Users/tony/WebstormProjects/perfmjs/lib/perfmjs3/';
//var moduleName = node.fileName.split(filePrefix)[1].split('.ts')[0];
//var modulePrefix = 'perfmjs/';
//node.moduleName = modulePrefix + moduleName;
//////write("System.register(");  //放在typescript.js该行前面
///*got module Name from typescript.js#emitSystemModule() end*/
gulp.task('perfmjs3', ['clean-dist'], function () {
    var tsResult = gulp.src(paths.tsScripts)
        .pipe(ts({
            declarationFiles: true,
            noExternalResolve: false,
            module: 'system',
            target: "es5",
            noImplicitAny: true,
            declaration: true,
            sourceMap: true,
            emitDecoratorMetadata: true,
            //prefix: 'perfmjs/',
            experimentalDecorators: true
        }));
    return merge([
        tsResult.dts.pipe(gulp.dest('dist/definitions')),
        tsResult.js
            .pipe(concat(paths['core.ts.snapshot'] + '.js'))  //使用”gulp compile“时注释该行
            .pipe(gulp.dest('dist/js'))
    ]);
});

//watch perfmjs3
gulp.task('watch', ['perfmjs3'], function() {
    gulp.watch(paths.tsScripts, {ignoreInitial: true}, ['perfmjs3']);
});

//typescript traceur, 参考：http://stackoverflow.com/questions/30813006/angular-2-typescript-require-not-found
gulp.task('compile-not-used', ['perfmjs3'], function() {
    return gulp.src("./lib/perfmjs3/**/*.js") //dist/js/*.es6.js
        .pipe(sourcemaps.init())
        .pipe(gulpTraceur({
            sourceMaps: true,
            outputLanguage: 'es5',
            annotations: true, // parse annotations
            types: true, // parse types
            script: false, // parse as a module
            memberVariables: true, // parse class fields
            modules: 'instantiate', //modules: amd|register|instantiate|inline
            moduleName: true
        }))
        .pipe(concat(paths['core.ts.snapshot'] + '.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'));
});