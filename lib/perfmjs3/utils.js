System.register(['perfmjs/fetch'], function(exports_1) {
    var fetch_1;
    var _utils, utils;
    return {
        setters:[
            function (_fetch_1) {
                fetch_1 = _fetch_1;
            }],
        execute: function() {
            new fetch_1.FetchPolyfill();
            _utils = (function () {
                function Utils(global) {
                    this.version = 'core.dev@3.0.5';
                    this.global = {};
                    if (this._singletonUtils) {
                        return this._singletonUtils;
                    }
                    this._singletonUtils = this;
                    this.global = global || {};
                    this.getGlobal("perfmjs.utils");
                    this.global['perfmjs']['utils'] = this;
                }
                //Allow getting a global that is expressed in, dot notation, like 'a.b.c'.
                Utils.prototype.getGlobal = function (ns) {
                    if (!ns) {
                        return this.global;
                    }
                    var g = this.global;
                    this.forEach(ns.split('.'), function (part) {
                        g[part] = g[part] || {};
                        g = g[part];
                    });
                    return g;
                };
                Object.defineProperty(Utils.prototype, "root", {
                    get: function () {
                        return this.getGlobal('perfmjs');
                    },
                    enumerable: true,
                    configurable: true
                });
                Utils.prototype.isBrowserSupport = function () {
                    return !this.isNodeJSSupport();
                };
                Utils.prototype.isNodeJSSupport = function () {
                    if (typeof module !== 'undefined' && module.exports) {
                        return true;
                    }
                    return false;
                };
                Utils.prototype.isAmdSupport = function () {
                    return (typeof define === "function" && define.amd && define.amd['async']);
                };
                Utils.prototype.isSystemSupport = function () {
                    if (typeof System !== 'undefined' && System.register) {
                        return true;
                    }
                    return false;
                };
                Utils.prototype.isObject = function (obj) {
                    return obj === Object(obj);
                };
                Utils.prototype.isH5Support = function () {
                    return '__proto__' in {};
                };
                Utils.prototype.toNumber = function (obj) {
                    return ~~obj; //int型数字本身或0: "null,undefined,false,0,'',NaN,非数字的字符串",注意，超过int最大的数字后就始终是最大那个数
                };
                Utils.prototype.toBoolean = function (obj) {
                    return !!obj; //these is false: "null,undefined,false,0,'',NaN"
                };
                //以下方法实现都是来自jquery1.8.2的对应方法:_type,_isFunction,_isArray,_isWindow,_isPlainObject,_extend
                Utils.prototype.type = function (obj) {
                    if (this._class2type === undefined) {
                        var _class2type = this._class2type = {};
                        this.forEach("Boolean Number String Function Array Date RegExp Object".split(" "), function (item) {
                            _class2type["[object " + item + "]"] = item.toLowerCase();
                        });
                    }
                    return obj == null ? String(obj) : this._class2type[Object.prototype.toString.call(obj)] || "object";
                };
                Utils.prototype.isString = function (obj) {
                    return typeof obj == "string";
                };
                Utils.prototype.isFunction = function (obj) {
                    return this.type(obj) === "function";
                };
                Utils.prototype.isArray = function (obj) {
                    return Array.isArray(obj) || this.type(obj) === "array";
                };
                Utils.prototype.isWindow = function (obj) {
                    return obj != null && obj == obj.window;
                };
                Utils.prototype.extend = function () {
                    var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
                    // Handle a deep copy situation
                    if (typeof target === "boolean") {
                        deep = target;
                        target = arguments[1] || {};
                        // skip the boolean and the target
                        i = 2;
                    }
                    // Handle case when target is a string or something (possible in deep copy)
                    if (typeof target !== "object" && !this.isFunction(target)) {
                        target = {};
                    }
                    // extend jQuery itself if only one argument is passed
                    if (length === i) {
                        target = this;
                        --i;
                    }
                    for (; i < length; i++) {
                        // Only deal with non-null/undefined values
                        if ((options = arguments[i]) != null) {
                            // Extend the base object
                            for (name in options) {
                                src = target[name];
                                copy = options[name];
                                // Prevent never-ending loop
                                if (target === copy) {
                                    continue;
                                }
                                // Recurse if we're merging plain objects or arrays
                                if (deep && copy && (this._isPlainObject(copy) || (copyIsArray = this.isArray(copy)))) {
                                    if (copyIsArray) {
                                        copyIsArray = false;
                                        clone = src && this.isArray(src) ? src : [];
                                    }
                                    else {
                                        clone = src && this._isPlainObject(src) ? src : {};
                                    }
                                    // Never move original objects, clone them
                                    target[name] = this.extend(deep, clone, copy);
                                }
                                else if (copy !== undefined) {
                                    target[name] = copy;
                                }
                            }
                        }
                    }
                    // Return the modified object
                    return target;
                };
                Utils.prototype._isPlainObject = function (obj) {
                    var core_hasOwn = Object.prototype.hasOwnProperty;
                    // Must be an Object.
                    // Because of IE, we also have to check the presence of the constructor property.
                    // Make sure that DOM nodes and window objects don't pass through, as well
                    if (!obj || this.type(obj) !== "object" || obj.nodeType || this.isWindow(obj)) {
                        return false;
                    }
                    try {
                        // Not own constructor property must be Object
                        if (obj.constructor && !core_hasOwn.call(obj, "constructor") && !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                            return false;
                        }
                    }
                    catch (e) {
                        // IE8,9 Will throw exceptions on certain host objects #9897
                        return false;
                    }
                    // Own properties are enumerated firstly, so to speed up,
                    // if last one is own, then all properties are own.
                    var key;
                    for (key in obj) {
                    }
                    return key === undefined || core_hasOwn.call(obj, key);
                };
                Utils.prototype.trim = function (text) {
                    return String.prototype.trim(text) && !String.prototype.trim.call("\uFEFF\xA0") ?
                        (function (text) {
                            return text == null ? "" : String.prototype.trim.call(text);
                        })(text) : (function (text) {
                        return text == null ? "" : (text + "").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
                    })(text);
                };
                /**
                 * 合并JSON对象或数组(second)到第1个数组(first)中
                 */
                Utils.prototype.merge = function (first, second) {
                    var l = second.length, i = first.length, j = 0;
                    if (typeof l === "number") {
                        for (; j < l; j++) {
                            first[i++] = second[j];
                        }
                    }
                    else {
                        while (second[j] !== undefined) {
                            first[i++] = second[j++];
                        }
                    }
                    first.length = i;
                    return first;
                };
                /**
                 * A window.fetch JavaScript polyfill
                 * ref to:
                 * http://blog.gospodarets.com/fetch_in_action/
                 * https://github.com/github/fetch
                 * e.g.
                 * utils.fetch("http://localhost:8888/json/message2", function(jsonData) {
                        console.log(jsonData.result.userName);
                    }, {'id':999,'name':'12345'}, 'POST');
                 * @param url
                 * @param handler
                 * @param jsonParam
                 * @param method
                 * @param formData
                 * @param headers
                 */
                Utils.prototype.fetch = function (url, handler, jsonParam, method, formData, headers) {
                    var self = this;
                    var requestParam = {
                        method: method || 'GET',
                        headers: headers || { 'Accept': 'application/json' }
                    };
                    if (requestParam.method.toUpperCase() === 'POST') {
                        if (formData) {
                            requestParam['body'] = formData;
                        }
                        else if (jsonParam) {
                            var formData = new FormData();
                            this.forEach(this.keys(jsonParam), function (item, index) {
                                formData.append(encodeURIComponent(item), encodeURIComponent(jsonParam[item]));
                            });
                            requestParam['body'] = formData;
                        }
                    }
                    fetch(url, requestParam).then(function (response) { return response.json(); }).then(function (json) {
                        handler(self.fmtJSONMsg(json));
                    }).catch(function (ex) {
                        console.log('request:' + url + ' failed info:' + ex.message);
                    });
                };
                Utils.prototype.fmtJSONMsg = function (jsonData) {
                    //json格式消息与响应的JSONMessage对象保持一致, status: 成功-success, 失败-fail
                    var result, jsonMessage = { status: "fail", code: '0', msg: '', result: {} };
                    try {
                        if (typeof jsonData === 'string') {
                            if (typeof (JSON) === 'object' && JSON.parse) {
                                result = JSON.parse(jsonData);
                            }
                            else {
                                result = eval("(" + jsonData + ")");
                            }
                        }
                        else {
                            result = jsonData;
                        }
                        //对不规范响应内容进行处理
                        if (result != undefined && result.status == undefined) {
                            jsonMessage.status = "success";
                            jsonMessage.code = "0";
                            jsonMessage.msg = "";
                            jsonMessage.result = result;
                        }
                        else if (result != undefined) {
                            jsonMessage = result;
                        }
                    }
                    catch (err) {
                        //服务器响应失败，错误代码：XXX，请稍后重试或联系我们的客服！
                        //TODO 可将err.description||err.toString()||''发送给日志服务器分析
                        jsonMessage = { status: "fail", code: '0', msg: "服务器响应失败，请稍后重试或联系我们的客服！", result: {} };
                    }
                    return jsonMessage || { status: "fail", code: '0', msg: '', result: {} };
                };
                Utils.prototype.parseJSON = function (data) {
                    if (!data || typeof data !== "string") {
                        return null;
                    }
                    // Make sure leading/trailing whitespace is removed (IE can't handle it)
                    data = this.trim(data);
                    // Attempt to parse using the native JSON parser first
                    if (JSON && JSON.parse) {
                        return JSON.parse(data);
                    }
                    // Make sure the incoming data is actual JSON
                    // Logic borrowed from http://json.org/json2.js
                    if (/^[\],:{}\s]*$/.test(data.replace(/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, "@")
                        .replace(/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g, "]")
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                        return (new Function("return " + data))();
                    }
                    this.error("Invalid JSON: " + data);
                };
                Utils.prototype.debugJSON = function (o) {
                    //用于在ie8+和ff3.5+浏览器下开发调试
                    if (typeof (JSON) === 'object' && JSON.stringify) {
                        return JSON.stringify(o);
                    }
                    return "{}";
                };
                /**
                 * AOP
                 * e.g. filterPipeObj.transform = utils.aop(this, filterPipeObj.transform, function(value, args) {
                        return joquery.newInstance(utils.toArray(value)).filter(function(item){
                            return utils.toNumber(item.code) >= 2;
                        }).toArray();
                    });
                 * @param context
                 * @param orig (function)
                 * @param before
                 * @param after
                 * @returns {function(): (any|any)}
                 */
                Utils.prototype.aop = function (context, orig, before, after) {
                    var _self = this, aopFunc = function () {
                        var args, result;
                        context = context || this;
                        if (before && typeof before === 'function') {
                            //可修改传入参数
                            args = before.apply(context, arguments);
                            //如果返回false, 则停止执行
                            if (typeof args !== 'undefined') {
                                return args;
                            }
                        }
                        //如果before返回一个数组，则用来替换原有参数
                        args = _self.isArray(args) ? args : arguments;
                        //调用原对象的原方法
                        result = orig.apply(context, args);
                        if (after && typeof after === 'function') {
                            Array.prototype.unshift.call(args, result);
                            //可修改返回结果
                            result = after.apply(context, args) || result;
                        }
                        return result;
                    };
                    return aopFunc;
                };
                Utils.prototype.nextTick = function (f, v) {
                    if (typeof module !== 'undefined' && module.exports) {
                        process.nextTick(function () {
                            f(v);
                        });
                    }
                    else {
                        setTimeout(function () {
                            f(v);
                        }, 0);
                    }
                };
                Utils.prototype.keys = function (obj) {
                    if (!this.isObject(obj))
                        return [];
                    var keys = [];
                    if (obj.forEach) {
                        obj.forEach(function (value, key) {
                            keys[keys.length] = key;
                        });
                        return keys;
                    }
                    if (Object.keys)
                        return Object.keys(obj);
                    for (var key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            keys[keys.length] = key;
                        }
                    }
                    return keys;
                };
                /**
                 * 将map或set转化为array
                 * e.g. var m = new Map(); utils.toArray(m.values());
                 * @param likeMap和迭代对象
                 * @returns {any}
                 */
                Utils.prototype.toArray = function (likeMap) {
                    if (Array.hasOwnProperty('from')) {
                        return Array.from(likeMap);
                    }
                    return [];
                };
                /**
                 * e.g. contain([1,2,33], 33) will return true;
                 * @param arr
                 * @param element
                 * @returns {boolean}
                 */
                Utils.prototype.contain = function (arr, element) {
                    if (this.isArray(arr)) {
                        return arr.indexOf(element) >= 0;
                    }
                    return false;
                };
                /**
                 * # For Each 有参考https://github.com/codemix/fast.js的代码实现
                 *
                 * A fast `.forEach()` implementation.
                 *
                 * @param  {Array|Map|Set}    subject     The array (or array-like: Map, Set) to iterate over.
                 * @param  {Function} fn          The visitor function.
                 * @param  {Object}   thisContext The context for the visitor.
                 */
                Utils.prototype.forEach = function (subject, fn, thisContext) {
                    if (subject.forEach) {
                        subject.forEach(function (value, key, forEachObj) {
                            fn(value, key, forEachObj);
                        });
                        return;
                    }
                    var length = subject.length, i = 0, iterator = arguments.length > 2 ? this._fastBind(fn, thisContext) : fn;
                    for (; i < length; i++) {
                        iterator(subject[i], i, subject);
                    }
                };
                Utils.prototype.now = function () {
                    return (new Date).getTime();
                };
                Utils.prototype.error = function (msg) {
                    throw new Error(msg);
                };
                /**
                 * # Map 有参考https://github.com/codemix/fast.js的代码实现
                 *
                 * A fast `.map()` implementation.
                 *
                 * @param  {Array}    subject     The array (or array-like) to map over.
                 * @param  {Function} fn          The mapper function.
                 * @param  {Object}   thisContext The context for the mapper.
                 * @return {Array}                The array containing the results.
                 */
                Utils.prototype.fastMap = function (subject, fn, thisContext) {
                    var length = subject.length, result = new Array(length), i = 0, iterator = arguments.length > 2 ? this._fastBind(fn, thisContext) : fn;
                    for (; i < length; i++) {
                        result[i] = iterator(subject[i], i, subject);
                    }
                    return result;
                };
                /**
                 * # Reduce 有参考https://github.com/codemix/fast.js的代码实现
                 *
                 * A fast `.reduce()` implementation.
                 *
                 * @param  {Array}    subject      The array (or array-like) to reduce.
                 * @param  {Function} fn           The reducer function.
                 * @param  {mixed}    initialValue The initial value for the reducer.
                 * @param  {Object}   thisContext  The context for the reducer.
                 * @return {mixed}                 The final result.
                 */
                Utils.prototype.fastReduce = function (subject, fn, initialValue, thisContext) {
                    var length = subject.length, result = initialValue, i = 0, iterator = arguments.length > 3 ? this._fastBind(fn, thisContext) : fn;
                    for (; i < length; i++) {
                        result = iterator(result, subject[i], i, subject);
                    }
                    return result;
                };
                /**
                 * # Bind 有参考https://github.com/codemix/fast.js的代码实现
                 * Analogue of `Function::bind()`.
                 *
                 * ```js
                 * var bind = require('fast.js').bind;
                 * var bound = bind(myfunc, this, 1, 2, 3);
                 *
                 * bound(4);
                 * ```
                 * @param  {Function} fn          The function which should be bound.
                 * @param  {Object}   thisContext The context to bind the function to.
                 * @param  {mixed}    args, ...   Additional arguments to pre-bind.
                 * @return {Function}             The bound function.
                 */
                Utils.prototype._fastBind = function (fn, thisContext) {
                    var boundLength = arguments.length - 2, boundArgs;
                    if (boundLength > 0) {
                        boundArgs = new Array(boundLength);
                        for (var i = 0; i < boundLength; i++) {
                            boundArgs[i] = arguments[i + 2];
                        }
                        return function () {
                            var length = arguments.length, args = new Array(boundLength + length), i = 0;
                            for (; i < boundLength; i++) {
                                args[i] = boundArgs[i];
                            }
                            for (i = 0; i < length; i++) {
                                args[boundLength + i] = arguments[i];
                            }
                            return fn.apply(thisContext, args);
                        };
                    }
                    else {
                        return function () {
                            var length = arguments.length, args = new Array(length), i = 0;
                            for (; i < length; i++) {
                                args[i] = arguments[i];
                            }
                            return fn.apply(thisContext, args);
                        };
                    }
                };
                /**
                 * 负责所有模块的注册及应用程序的初始化入口,调用例子如下:
                 //应用入口函数
                 perfmjs.ready(function($$, app) {
                    //注册启动业务对象实例
                    app.register($$.module1);
                    app.register($$.module2, {callback:function() {
                        console.log('started base.module2!');
                    }});
                    app.register($$.module3);
                    app.startAll();
                });
                 * @param callback
                 */
                Utils.prototype.ready = function (callback) {
                    if (this.isFunction(callback)) {
                        var root = this.root;
                        this.root.headLoad.ready(document, function () {
                            callback(root, root.app);
                        });
                    }
                };
                return Utils;
            })();
            exports_1("utils", utils = new _utils(this));
        }
    }
});
