/** javascript AMD规范实现, 应注意避免模块间的循环依赖:被依赖的模块应放在依赖数组的靠前元素位置
 * 参考列表:
 * http://www.zhihu.com/question/20351507
 * http://blog.csdn.net/wl110231/article/details/8283512
 * http://www.douban.com/note/283566440/
 * http://pilotjs.com/
 * https://github.com/cmdjs/specification/blob/master/draft/module.md
 * https://github.com/amdjs/amdjs-api
 * http://requirejs.org/
 * http://javascript.ruanyifeng.com/tool/requirejs.html
 * http://addyosmani.com/writing-modular-js/
 * http://msdn.microsoft.com/en-us/magazine/hh227261.aspx
 * CMD 模块定义规范 #242  https://github.com/seajs/seajs/issues/242
 * TODO: 1.getInstance的方式 2.打印错误信息 3.功能向require.js看齐
 * Created by tony on 2014/8/11.
 * @version v1.0
 */
perfmjs.plugin('amd', function($$) {
    var commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg, cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g;
    var parsedRequireStack = {}; //e.g. {'foo':true, 'foo_1':true, 'foo_1_1':true} //用于消除死循环依赖
    var defines = {}; //e.g. {'foo':{'id':'foo',deps:[],callback:function(){}}};
    var exports = {
        'require': {'id':'require', 'getInstance': function() {
            return function (module) {
                if (typeof module === 'string') {
                    if (exports[module]) {
                        return exports[module]['getInstance'](module);
                    }
                    throw new Error(module + ' has not been defined. Please include it as a dependency in define()');
                    return;
                }
            };
        }},
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
        var invokeStack = [], deferred = $$.async.defer();
        if (typeof modules === 'string') {
            return;
        }
        //将没有依赖或只有'require', 'exports', 'module'的依赖放在依赖列表的后面
        loader.loadParsedRequireStack(modules, [], 0, deferred);
        deferred.promise.then(function(result) {
            loader.getDepsStack(modules, invokeStack);
            invokeStack = $$.joquery.newInstance(invokeStack).orderBy(function(module) {
                var deps = defines[module]['deps'] || [], depsCount = 0;
                $$.utils.forEach(deps, function(dep, index) {
                    if (dep === 'require' || dep === 'exports' || dep === 'module') {
                        return;
                    }
                    depsCount++;
                });
                return depsCount;
            }).toArray();
            for (var i = 0; i < invokeStack.length; i++) {
                var thisExport = invokeStack[i];
                if (!exports[thisExport]) {
                    exports[thisExport] = {'id':thisExport, 'getInstance': function(_thisExport) {
                        try {
                            var args = [], depsInstances = defines[_thisExport]['deps'];
                            if ($$.utils.toBoolean(exports[_thisExport]['instance'])) {
                                return exports[_thisExport]['instance'];
                            }
                            for (var j = 0; j < depsInstances.length; j++) {
                                if ((exports[depsInstances[j]] || {})['getInstance']) {
                                    args[args.length] = (exports[depsInstances[j]] || {})['getInstance'](depsInstances[j]);
                                }
                            }
                            exports[_thisExport]['instance'] =  defines[_thisExport]['callback'].apply(null, args);
                            if (typeof exports[_thisExport]['instance'] === 'undefined') {
                                exports[_thisExport]['instance'] = {};
                            }
                            return exports[_thisExport]['instance'];
                        } catch (error) {
                            deferred.reject(error.message);
                        }
                    }};
                }
            }
            var loadedModules = [];
            for (var x = 0; x < modules.length; x++) {
                switch (modules[x]) {
                    case 'require':
                        loadedModules[x] = exports['require']['getInstance']();
                        break;
                    case 'exports': //XXX 该块里的逻辑有待验证
                        loadedModules[x] = exports['exports']['getInstance']('context');
                        break;
                    case 'module': //XXX 该块里的逻辑有待验证
                        loadedModules[x] = exports['module'].getInstance()('context');
                        break;
                    case exports[context] ? exports[context]['id'] : '':
                        loadedModules[x] = exports[context].getInstance();
                        break;
                    default:
                        loadedModules[x] = exports[modules[x]]['getInstance'](modules[x]);
                }
            }
            callback && callback.apply(null, loadedModules);
        }, function(error) {
            //FIXME need error handle in promise
            throw new Error('Error Occurred in require promise1:' + error.message);
        }).then(function(result) {
            //noop
        }, function(error) {
            //FIXME need error handle in promise
            $$.utils.isH5Support() && console.log('Error Occurred in require promise2:' + error.message);
            throw new Error('Error Occurred in require promise2:' + error.message);
        });
    };
    define.config = {
        'baseUrl': '/perfmjs/lib/amd/',
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
    define.amd = {'async':true, 'jQuery':true};
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
                    //同级的依赖顺序应是：被依赖的赖块ID放在数组前面的元素位置
                    loader.getDepsStack(deps[j] , invokeStack, invokedModules);
                }
            }
        }
    };
    loader.loadParsedRequireStack = function(modules, needLoadModules, countdown, deferred) {
        var needLoadResources = [];
        needLoadModules = needLoadModules || [];
        loader.parseRequireStack(modules, needLoadModules);
        for (var i = 0; i < needLoadModules.length; i++) {
            var thisNeedLoadModule = needLoadModules[i], version = '';
            //结合appConfig取每个app个性化的配置
            var appConfig = $$.appConfig.newInstance();
            if (appConfig.option('amd.baseUrl') && appConfig.option('amd.modules') && appConfig.option('amd.modules')[thisNeedLoadModule]) {
                $$.utils.forEach(['css', 'js'], function(fileType) {
                    if (appConfig.option('amd.modules')[thisNeedLoadModule][fileType] && appConfig.option('amd.modules')[thisNeedLoadModule][fileType].length > 0) {
                        $$.utils.forEach(appConfig.option('amd.modules')[thisNeedLoadModule][fileType], function(item) {
                            if (item.indexOf('http://') < 0) {
                                item = define.config.baseUrl + item;
                            }
                            needLoadResources[needLoadResources.length] = item;
                        });
                    }
                });
                if ($$.utils.toBoolean(appConfig.option('amd.modules')[thisNeedLoadModule]['alias'])) {
                    version = appConfig.option('amd.modules')[thisNeedLoadModule]['version'] || '';
                    thisNeedLoadModule = appConfig.option('amd.modules')[thisNeedLoadModule]['alias'];
                }
            }
            if ($$.utils.toBoolean(version)) {
                needLoadResources[needLoadResources.length] = loader.toUrl(thisNeedLoadModule) + '.js?v=' + version;
            } else {
                needLoadResources[needLoadResources.length] = loader.toUrl(thisNeedLoadModule) + '.js';
            }
        }
        if (countdown < 1 && needLoadResources.length < 1) {
            deferred.resolve(modules);
        }
        if (needLoadResources.length > 0) {
            countdown += needLoadResources.length;
            $$.includeRes.loadHeadRes(needLoadResources, function() {
                countdown -= needLoadResources.length;
                var depsNeedLoadResources = [];
                for (var i = 0; i < needLoadModules.length; i++) {
                    depsNeedLoadResources = depsNeedLoadResources.concat(defines[needLoadModules[i]]['deps']);
                }
                loader.loadParsedRequireStack(depsNeedLoadResources, [], countdown, deferred);
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
            //if (parsedRequireStack[thisModule]) { //fixed for a bug while pre-load amd js files in include.js
            if (defines[thisModule]) {
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
});