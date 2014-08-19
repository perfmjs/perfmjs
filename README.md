perfmjs
=======
high performance javascript framework  V1.3.3

为什么使用perfmjs?　
=======
面对复杂的WEB前端业务开发，有了这个“外壳”框架，开发人员就可以立即高效地编写业务上的javascript 代码了！

Features:
=======
fast by default：高效，易用，易读

核心库(core.js)压缩后只有32k+，还可以优化至更小

实现了浏览器端的AMD（Asynchronous Module Definition）异步模块定义规范，功能类似require.js, 但比require.js更轻量

原生态支持面向对象(object-oriented)功能

更高效的插件开发机制

更高效的js和css资源加载功能(底层功能由head.js提供)

更高效的js和css资源文件版本号管理功能

支持高效的数组操作，事件代理，AOP, 状态机, 日志等功能

可测试性，通过了jasmine库的测试

支持所有的主流浏览器，包括：ie5.5+, firefox, chrome, safari, etc

Nodejs版的perfmjs框架请移步：https://github.com/perfmjs/perfmjs-node

可选功能：
=======
jQuery/zepto.js是该框架的可选部分。DOM操作,AJAX,CSS等功能可以使用jQuery及类似框架提供，perfmjs框架在这些功能上不重复发明轮子！

TODO:
=======
增加资源文件自已更新缓存的功能（不需使用版本号）

支持Html5,支持移动Mobile

支持lazyload,bigRender等高效功能（可选功能，默认不开启）

GitHub上类似框架: Fdev4  https://github.com/swain/Fdev4


How to use
-------
foo.js
```js
define('foo', ['base'], function(base) {
    base("foo", {
        init: function(initParam) {
            return this;
        },
        sayHello: function(name) {
            return 'hi- ' + name;
        },
        foo: function() {
            return 'foo!';
        },
        end: 0
    });
    base.foo.defaults = {
        end: 0
    };
    return base.foo;
});
```

bar.js, 继承于foo.js
```js
define('bar', function(require) {
    var base = require('base'), foo = require('foo');
    base("foo.bar", {
        init: function(initParam) {
            return this;
        },
        sayHello: function(name) {
            var superName = this._super('sayHello', name);
            return 'call super:' + superName + ', call self: hello- ' + name + "/foo:" + this.foo();
        },
        end: 0
    });
    base.bar.defaults = {
        end: 0
    };
    return base.bar;
});
```

index.html
```js
<!DOCTYPE html>
<html>
<head lang="en">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Hello perfmjs</title>
    <script type="text/javascript" src="build/core.js?v=20140813001"></script>
    <script>
    require(['loader'], function(loader) {
        loader.load({src:"{n:'load-js',t:'js',m:'foo;'}"}
        ).loadModules({name:'load-js', type:'js', mdCallback:function(source, module, combineUrls) {
            if (module === 'foo') {
                combineUrls[combineUrls.length] = 'foo.js';
                combineUrls[combineUrls.length] = 'bar.js';
            }
        }, afterLoadedCallback:function() {
            //应用入口函数
            require(['app', 'bar'], function (app, bar) {
                app.registerAndStart('bar', bar);
                alert(bar.instance.sayHello('bar'));
            });
        }});
    };
    </script>
</head>
<body>
Hello perfmjs!
</body>
</html>
```

License
-------

Copyright 2011 Tony

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.