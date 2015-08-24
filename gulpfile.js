/**
 * gulp构建脚本
 * Created by Administrator on 2014/8/26.
 */
var gulp      = require('gulp');
var uglify    = require('gulp-uglify');
var concat    = require('gulp-concat');
var addsrc    = require('gulp-add-src');
var del       = require('del');
//below for typescript compile
var ts = require('gulp-typescript');
var merge = require('merge2');
var currentAngular2Version = '2.0.0-alpha.35';

var paths = {
    "core.name.snapshot": "core",
    "core.name.release": "core-2.1.2",
    "core.ts.snapshot": "core-3.0.6",
    "perfmjs.angular2.ts.snapshot": "perfmjs-angular2@" + currentAngular2Version,
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
        './lib/perfmjs/loader.js',
        './lib/perfmjs/event.proxy.js',
        './lib/perfmjs/fsm.js',
        './lib/perfmjs/app.js'
    ],
    "perfmjsTSScripts": [
        './lib/perfmjs3/**/*.ts'
    ],
    "perfmjsAngular2TSScripts": [
        './lib/angular2/**/*.ts'
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

gulp.task('clean-dist-perfmjs', function(cb) {
    del(['./dist/perfmjs'], cb);
});
gulp.task('clean-dist-angular2', function(cb) {
    del(['./dist/angular2'], cb);
});

//typescript compile task， 参考：https://github.com/ivogabe/gulp-typescript
//in file: /node_modules/gulp-typescript/node_modules/typescript/bin/typescript.js增加如下代码
/////////////////////////////////////////////////////////////////////////////////////////////
///*把下面的代码加到typescript.js#emitSystemModule()中去，可以在system.register中定义模块Id*/
///*got module Name from typescript.js#emitSystemModule() begin*/
//var filePrefix = compilerOptions.filePrefix;
//var moduleName = node.fileName.split(filePrefix)[1].split('.ts')[0];
//var modulePrefix = compilerOptions.modulePrefix;
//node.moduleName = modulePrefix + moduleName;
//////write("System.register(");  //放在typescript.js该行前面
///*got module Name from typescript.js#emitSystemModule() end*/
/////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('perfmjs3', ['clean-dist-perfmjs'], function () {
    var tsResult = gulp.src(paths.perfmjsTSScripts)
        .pipe(ts({
            declarationFiles: false,
            noExternalResolve: false,
            module: 'system',
            target: "es5",
            noImplicitAny: true,
            declaration: true,
            sourceMap: true,
            emitDecoratorMetadata: true,
            experimentalDecorators: true,
            filePrefix: '/Users/tony/WebstormProjects/perfmjs/lib/perfmjs3/', //自己新增的参数
            modulePrefix: 'perfmjs/', //自己新增的参数
        }));
    return merge([
        tsResult.dts.pipe(gulp.dest('dist/definitions')),
        tsResult.js
            .pipe(concat(paths['core.ts.snapshot'] + '.js'))  //使用”gulp compile“时注释该行
            .pipe(gulp.dest('dist/perfmjs'))
    ]);
});

/**
 * FIXME: 可以自己使用，但还需要完善
 * 1. 因为typescript会生成很多angular2的重复的__decorate，__metadata，__param变量，所以最好需要手工修改生成的js文件去重
 * */
gulp.task('angular2', ['clean-dist-angular2'], function () {
    var tsResult = gulp.src(paths.perfmjsAngular2TSScripts)
        .pipe(ts({
            declarationFiles: false,
            noExternalResolve: false,
            module: 'system',
            target: "es5",
            noImplicitAny: true,
            declaration: true,
            sourceMap: true,
            emitDecoratorMetadata: true,
            experimentalDecorators: true,
            filePrefix: '/Users/tony/WebstormProjects/perfmjs/lib/angular2/', //自己新增的参数
            modulePrefix: 'perfmjs/angular2/', //自己新增的参数
        }));
    return merge([
        tsResult.dts.pipe(gulp.dest('dist/definitions')),
        tsResult.js
            .pipe(addsrc('lib/angular2/directives/message-event.js'))
            .pipe(concat(paths['perfmjs.angular2.ts.snapshot'] + '.js'))
            .pipe(gulp.dest('dist/angular2'))
    ]);
});

//watch perfmjs3
gulp.task('watch', ['perfmjs3'], function() {
    gulp.watch(paths.perfmjsTSScripts, {ignoreInitial: true}, ['perfmjs3']);
});

gulp.task('default', ['perfmjs3']);