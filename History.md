3.0.1/ 2015-08-02
==================
* add: gulp.js增加perfmjs3的build，使用`gulp perfmjs3`
* add: angular2-try增加jsonPipe, filterPipe的功能
* add: angular2-try完善投注功能

3.0.0/ 2015-07-31
==================
* add: perfmjs3.0.0

3.0.0-alpha.1/ 2015-07-29
==================
* init: perfmjs3.0.0-alpha.1, write using TypeScript

2.1.4-rc4/ 2015-07-15
==================
* add: 增加ssq的angular2-try例子

2.1.4-rc3/ 2015-07-15
==================
* improved: 提升angular2的依赖版本到2.0.0-alpha.31

2.1.4-rc2/ 2015-07-10
==================
* improved: 完善angular2-try例子

2.1.3/ 2015-06-23
==================
* fixed: 修复globalConfig的加载BUG
* improved: 新增angular2例子

2.1.2 / 2015-04-20
==================
* improved: 将系统所有公共的插件配置统一放到一个global-config.js文件中管理
* improved: improved jasmine from 2.1.3 to 2.2.1

2.1.1 / 2015-01-20
==================
* fixed: amd.js代码中依赖数组的insert顺序搞反了(splice),这个BUG导致错误地按依赖列表的反序来加载依赖js文件
* improved: 将utils.version改为utils.VERSION

2.1.0 / 2015-01-19
==================
* add: 增加angular.js的例子及测试用例

2.0.0 / 2014-12-2
==================
* improved: 给符合AMD规范的js文件增加版本号功能；优化include资源文件的加载方式

1.3.11 / 2014-10-21
==================
* add: 增加app-config.js

1.3.10 / 2014-09-15
==================
* improved: 将app.js中error.message改为error.stack
* fixed: 修复base.js的option方法的BUG

1.3.9 / 2014-09-02
==================
* improved:简化includeRes#loadModules方法的使用

1.3.8 / 2014-09-01
==================
* fix: 将perfmjs.utils#isH5Supported方法名改成isH5Support()
* improved: 简化核心代码

1.3.7 / 2014-08-28
==================
* improved: amd.js 增加错误处理

1.3.6 / 2014-08-27
==================
* improved: app.js 管理对象生命周期时，去掉moduleId入参
* improved: base.js 增加getName()方法
* improved:.includeres.js 增加对带版本号的（如：core-1.3.6-min.js）这种依赖文件的正则匹配
* improved: 整理命名空间

1.3.5 / 2014-08-26
==================
 * fix: 修复amd.js中不能同步加载资源文件的问题
 * improved: 优化promise/A+实现类async.js
 * add: 增加gulp构建工具文件：gulpfile.js

1.3.4 / 2014-08-22
==================
 * add: 在utils中增加方法：isBrowserSupport()和isNodeJSSupport()
 * add: 增加promise/A+实现类async.js

1.3.3 / 2014-08-19
==================
 * add: 给perfmjs#utils, joquery.js, event.proxy.js, fsm.js, base.js增加AMD模块化规范并在README.md中增加使用例子

1.3.2 / 2014-08-14
==================
 * add: 给includeres.js增加AMD模块化规范并在README.md中增加使用例子

1.3.1 / 2014-08-13
==================
 * add: 给perfmjs框架增加AMD模块化规范并在README.md中增加使用例子

1.3.0 / 2014-08-12
==================
 * add: 实现浏览器端的AMD模块化规范，功能类似require.js,但比require.js更轻量

1.2.5 / 2014-07-28
==================
 * fixed: fixed logic about perfmjs.utils.isH5Support()

1.2.4 / 2014-07-23
==================
 * improved: improved some function in joquery.js

1.2.3 / 2014-07-16
==================
 * fixed: fixed defaults problem in base.js

1.2.2 / 2014-07-16
==================
 * fixed: fixed scope problem in app.js

1.2.1 / 2014-07-09
==================
 * improved: improved README.md and Help document

1.2.0 / 2014-07-09
==================
 * improved: improved base function

1.1.8 / 2014-07-08
==================
 * improved: improved perfmjs.utils#fmtJSONMsg

1.1.7 / 2014-07-03
==================
 * Modify: adjust project fils construct

1.1.6 / 2014-07-02
==================
 * add: perfmjs.utils#isObject, perfmjs.utils#keys

1.1.5 / 2014-06-25
==================
 * add: perfmjs.utils#fastMap, perfmjs.utils#fastReduce

1.1.4 / 2014-06-25
==================
 * fix: fix some bugs
 * add: perfmjs.utils#fastBind, perfmjs.utils#forEach
 * modify: joquery#where, joquery#updateOrInsert, joquery#last, joquery#last

1.1.3 / 2014-06-20
==================
 * fix: fix some bugs
 * add: perfmjs.utils#toNumber, perfmjs.utils#toBoolean

说明：修改类型为: init(初始化项目)/improved(改善功能)/add(新增功能)/remove(移除功能)/modify(修复功能内容)/fix(修改BUG)