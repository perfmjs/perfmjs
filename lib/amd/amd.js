/** AMD规范实现, 应注意避免模块间的循环依赖
 * 参考:A minimalist javascript framework for AMD-based web applications   http://pilotjs.com/
 * https://github.com/amdjs/amdjs-api
 * http://requirejs.org/
 * http://javascript.ruanyifeng.com/tool/requirejs.html
 * https://github.com/jrburke/almond
 * http://ozjs.org/
 * https://curiosity-driven.org/minimal-loader
 * http://addyosmani.com/writing-modular-js/
 * http://msdn.microsoft.com/en-us/magazine/hh227261.aspx
 * Created by Administrator on 2014/8/11.
 */
!function() {
    var commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg, cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g;
    var config = {
        'baseUrl': 'http://localhost:63342/perfmjs/lib/amd/',
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
    }
    require = function(modules, callback, context) {
        var loadedModules = [], invokeStack = [];
        loader.loadParsedRequireStack(modules);
        setTimeout(function() {
            loader.getDepsStack(modules, invokeStack);
            //add instance to exports
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
        }, 800);  //等待资源完全加载并执行define了方法
    }
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
                for (var j = 0; j < deps.length; j++) {
                    loader.getDepsStack(deps[j] , invokeStack, invokedModules);
                }
            }
        }
    };
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
        switch (id) {
            case 'require':
            case 'exports':
            case 'module':
                return id;
        }
        newContext = (context || config.baseUrl).split('/');
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
        return (newContext.length && changed ? newContext.join('/') + '/' : '') + id.join('/');
    };
    loader.inject = function(file, callback) {
        var doc = document;
        var elHead = doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement;
        var script = doc.createElement('script');
        script.onload = script.onreadystatechange = function () {
            if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
                script.onload = script.onreadystatechange = null;  //控制不执行文件内容
                elHead.removeChild(script);
                callback && callback();
            }
        };
        script.type = 'text/javascript';
        script.async = true;
        script.src = file;
        elHead.appendChild(script);
    };
    define.amd = {};
}();