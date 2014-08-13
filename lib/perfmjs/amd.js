/** javascript AMD规范实现, 应注意避免模块间的循环依赖:被依赖的模块放在依赖数组的最后元素位置
 * 参考列表:
 * http://pilotjs.com/
 * https://github.com/amdjs/amdjs-api
 * http://requirejs.org/
 * http://javascript.ruanyifeng.com/tool/requirejs.html
 * http://addyosmani.com/writing-modular-js/
 * http://msdn.microsoft.com/en-us/magazine/hh227261.aspx
 * CMD 模块定义规范 #242  https://github.com/seajs/seajs/issues/242
 * TODO: 1.getInstance的方式 2.打印错误信息 3.功能上向require.js看齐
 * Created by tony on 2014/8/11.
 * @version v0.1
 *
 */
!function() {
    var commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg, cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g;
    var parsedRequireStack = {}; //e.g. {'foo':true, 'foo_1':true, 'foo_1_1':true} //用于消除死循环依赖
    var defines = {}; //e.g. {'foo':{'id':'foo',deps:[],callback:function(){}}};
    var exports = {
        'require': {'id':'require', 'getInstance': function() {
            return function (module) {
                if (typeof module === 'string') {
                    if (exports[module]) {
                        return exports[module]['getInstance'];
                    }
                    throw new Error(module + ' has not been defined. Please include it as a dependency in define()');
                    return;
                }
            };
        }()},
        'exports': {'id':'exports', 'getInstance': function() {
            return exports;
        }()},
        'module': {'id':'module', 'getInstance': function() {
            return function(context) {
                return {
                    id: context,
                    uri: loader.toUrl(context)
                }
            };
        }}
    }; //e.g. {'foo':{'id':'foo','getInstance':function(){return callback.apply(null, args)}}}
    var loader = {};
    define = function(id, dependencies, factory) {
        var argLen = arguments.length;
        if (argLen === 1) {
            factory = id;
            dependencies = undefined;
            id = undefined;
        } else if (argLen === 2) {
            if ({}.toString.call(id) === '[object Array]') {
                factory = dependencies;
                dependencies = id;
                id = undefined;
            } else {
                factory = dependencies;
                dependencies = undefined;
            }
        }
        //在define方法里有require('xxx')的情况
        if (!dependencies && (typeof factory === 'function')) {
            dependencies = [];
            if (factory.length) {
                factory
                    .toString()
                    .replace(commentRegExp, '')
                    .replace(cjsRequireRegExp, function (match, dep) {
                        dependencies.push(dep);
                    });
                dependencies = (factory.length === 1 ? ['require'] : ['require', 'exports', 'module']).concat(dependencies);
            }
        }
        if (id && !defines[id]) {
            defines[id] = {'id':id, 'deps':dependencies || [], callback: factory};
        }
    };
    require = function(modules, callback, context) {
        var loadedModules = [], invokeStack = [];
        if (typeof modules === 'string') {
            return;
        }
        loader.loadParsedRequireStack(modules);
        loader.getDepsStack(modules, invokeStack);
        //TODO 正确的逻辑应是：需等待所有资源完全加载并执行了define方法
        //将没有依赖或只有'require', 'exports', 'module'的依赖放在列表的后面
        invokeStack.sort(function(module1, module2){
            var deps1 = defines[module1]['deps'] || [], depsCount1 = 0;
            var deps2 = defines[module2]['deps'] || [], depsCount2 = 0;
            for (var i = 0; i < deps1.length; i++) {
                if (deps1[i] === 'require' || deps1[i] === 'exports' || deps1[i] === 'module') {
                    continue;
                }
                depsCount1++;
            }
            for (var j = 0; j < deps1.length; j++) {
                if (deps2[j] === 'require' || deps2[j] === 'exports' || deps2[j] === 'module') {
                    continue;
                }
                depsCount2++;
            }
            return depsCount2 - depsCount1;
        });
        for (var i = invokeStack.length - 1; i >= 0; i--) {
            var thisExport = invokeStack[i];
            if (!exports[thisExport]) {
                exports[thisExport] = {'id':thisExport, 'getInstance': (function() {
                    var args = [], depsInstances = defines[thisExport]['deps'];
                    for (var j = 0; j < depsInstances.length; j++) {
                        if ((exports[depsInstances[j]]||{})['getInstance']) {
                            args[args.length] = (exports[depsInstances[j]]||{})['getInstance'];
                        }
                    }
                    return defines[thisExport]['callback'].apply(null, args);
                })()}
            }
        }
        for (var x = 0; x < modules.length; x++) {
            switch (modules[x]) {
                case 'require':
                    loadedModules[x] = exports['require']['getInstance'];
                    break;
                case 'exports':
                    loadedModules[x] = exports['exports']['getInstance']('context');
                    break;
                case 'module':
                    loadedModules[x] = exports['module'].getInstance()('context');
                    break;
                case exports[context] ? exports[context]['id'] : '':
                    loadedModules[x] = exports[context].getInstance();
                    break;
                default:
                    loadedModules[x] = exports[modules[x]]['getInstance'];
            };
        }
        callback && callback.apply(null, loadedModules);
    };
    loader.getInstance = function(module, callback, invokedModule) {
        invokedModule = invokedModule || {};
        if (invokedModule[module]) {
            return {};
        }
        if (exports[module]) {
            return exports[module];
        }
        if (defines[module]) {
            invokedModule[module] = true;  //消除死循环依赖
            var deps = defines[module]['deps'] || [];
            for (var i = 0; i < deps.length; i++) {
                if (defines[deps[i]] && defines[deps[i]]['deps']) {

                }
            }
        }
        return callback && callback.apply(null, loader.callStack(/**/));
    };
    loader.getDepsStack = function(modules, invokeStack, invokedModules) {
        invokedModules = invokedModules || {};
        if (typeof modules === 'string') {
            modules = [modules];
        }
        for (var i = 0; i < modules.length; i++) {
            var thisModule = modules[i];
            if (thisModule === 'require' || thisModule === 'exports' || thisModule === 'module') {
                continue;
            }
            if (defines[thisModule]) {
                if (invokedModules[thisModule]) {
                    continue;
                }
                invokedModules[thisModule] = true;  //消除死循环依赖
                invokeStack[invokeStack.length] = thisModule;
                var deps = defines[thisModule]['deps'] || [];
                for (var j = deps.length - 1; j >= 0; j--) {
                    //同级的依赖顺序应是：被依赖的赖块ID放在数组前面的元素位置
                    loader.getDepsStack(deps[j] , invokeStack, invokedModules);
                }
            }
        }
    };
    define.config = {
        'baseUrl': 'http://localhost:63342/perfmjs/lib/amd/',
        'alias': {
            'xxx': 'plugins/xxx.min'
        },
        'usingInclude': {
            'default': true,
            'module': {
                'foo': false
            }
        },
        'shim': {
            'backbone': {
                'deps': [
                    'underscore',
                    'jquery'
                ],
                'exports': 'Backbone'
            }
        }
    };
    define.amd = {'async':true};
    loader.loadParsedRequireStack = function(modules, needLoadModules) {
        needLoadModules = needLoadModules || [];
        loader.parseRequireStack(modules, needLoadModules);
        for (var i = 0; i < needLoadModules.length; i++) {
            var loadedModule = needLoadModules[i];
            loader.inject(loader.toUrl(needLoadModules[i]) + '.js', function () {
                loader.loadParsedRequireStack(defines[loadedModule]['deps'], []);
            });
        }
    };
    loader.parseRequireStack = function(modules, needLoadModules) {
        if (typeof modules === 'string') {
            modules = [modules];
        }
        needLoadModules = needLoadModules || [];
        for (var x = 0; x < modules.length; x++) {
            var thisModule = modules[x];
            if (parsedRequireStack[thisModule]) {
                continue;
            }
            parsedRequireStack[thisModule] = true;
            switch (thisModule) {
                case 'require':
                    break;
                case 'exports':
                    break;
                case 'module':
                    break;
                default:
                    if (defines[thisModule]) {
                        if (defines[thisModule]['deps'] && defines[thisModule]['deps'].length > 0) {
                            loader.parseRequireStack(defines[thisModule]['deps'], needLoadModules);
                        }
                    } else {
                        needLoadModules.splice(0,0,thisModule);
                    }
            }
        }
    };
    loader.toUrl = function(id, context) {
        var newContext, i, changed;
        if (define.config.alias[id]) {
            id = define.config.alias[id];
        }
        switch (id) {
            case 'require':
            case 'exports':
            case 'module':
                return id;
        }
        newContext = (context || define.config.baseUrl).split('/');
        newContext.pop();
        id = id.split('/');
        i = id.length;
        while (--i) {
            switch (id[0]) {
                case '..':
                    newContext.pop();
                case '.':
                case '':
                    id.shift();
                    changed = true;
            }
        }
        return newContext.join('/') + '/' + id.join('/');
    };
    loader.inject = function(file, callback) {
        var doc = document;
        var elHead = doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement;
        var script = doc.createElement('script');
        script.onload = script.onreadystatechange = function (event) {
            if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
                script.onload = script.onreadystatechange = null;
                elHead.removeChild(script);
                callback && callback();
            }
        };
        script.type = 'text/javascript';
        script.charset = 'utf-8';
        script.async = true;
        script.src = file;
        elHead.appendChild(script);
    };
}();