var _utils = class Utils {
    'use strict';
    version:string = 'core.dev@3.0.0-alpha.1';
    _class2type:any;
    global:any = {};

    constructor(global:any) {
        this.global = global || {};
        this.getGlobal("perfmjs.utils");
        this.global['perfmjs']['utils'] = this;
    }

    //Allow getting a global that is expressed in, dot notation, like 'a.b.c'.
    getGlobal(ns:string) {
        if (!ns) {
            return this.global;
        }
        var g = this.global;
        this.forEach(ns.split('.'), function(part:string) {
            g[part] = g[part] || {};
            g = g[part];
        });
        return g;
    }

    get root() {
        return this.getGlobal('perfmjs');
    }

    isBrowserSupport() {
        return !this.isNodeJSSupport();
    }

    isNodeJSSupport() {
        if (typeof module !== 'undefined' && module.exports) {
            return true;
        }
        return false;
    }

    isAmdSupport() {
        return (typeof define === "function" && define.amd && define.amd['async']);
    }

    isSystemSupport() {
        if (typeof System !== 'undefined' && System.register) {
            return true;
        }
        return false;
    }

    isObject(obj:any) {
        return obj === Object(obj);
    }

    isH5Support() {
        return '__proto__' in {};
    }

    toNumber(obj:any) {
        return ~~obj; //int型数字本身或0: "null,undefined,false,0,'',NaN,非数字的字符串",注意，超过int最大的数字后就始终是最大那个数
    }

    toBoolean(obj:any) {
        return !!obj; //these is false: "null,undefined,false,0,'',NaN"
    }

    //以下方法实现都是来自jquery1.8.2的对应方法:_type,_isFunction,_isArray,_isWindow,_isPlainObject,_extend
    type(obj:any) {
        if (this._class2type === undefined) {
            var _class2type:any = this._class2type = {};
            this.forEach("Boolean Number String Function Array Date RegExp Object".split(" "), function (item:string) {
                _class2type["[object " + item + "]"] = item.toLowerCase();
            });
        }
        return obj == null ? String(obj) : this._class2type[Object.prototype.toString.call(obj)] || "object";
    }

    isString(obj:any) {
        return typeof obj == "string";
    }

    isFunction(obj:any) {
        return this.type(obj) === "function";
    }

    isArray(obj:any) {
        return Array.isArray(obj) || this.type(obj) === "array";
    }

    isWindow(obj:any) {
        return obj != null && obj == obj.window;
    }

    extend() {
        var options:any, name:any, src:any, copy:any, copyIsArray:any, clone:any,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;
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
                    if (deep && copy && ( this._isPlainObject(copy) || (copyIsArray = this.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && this.isArray(src) ? src : [];
                        } else {
                            clone = src && this._isPlainObject(src) ? src : {};
                        }
                        // Never move original objects, clone them
                        target[name] = this.extend(deep, clone, copy);
                        // Don't bring in undefined values
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        // Return the modified object
        return target;
    }

    _isPlainObject(obj:any) {
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
        } catch (e) {
            // IE8,9 Will throw exceptions on certain host objects #9897
            return false;
        }
        // Own properties are enumerated firstly, so to speed up,
        // if last one is own, then all properties are own.
        var key:any;
        for (key in obj) {
        }
        return key === undefined || core_hasOwn.call(obj, key);
    }

    trim(text:string) {
        return String.prototype.trim(text) && !String.prototype.trim.call("\uFEFF\xA0") ?
            (function (text:string) {
                return text == null ? "" : String.prototype.trim.call(text);
            })(text) : (function (text:string) {
            return text == null ? "" : (text + "").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
        })(text);
    }

    /**
     * 合并JSON对象或数组(second)到第1个数组(first)中
     */
    merge(first:any, second:any) {
        var l = second.length, i = first.length, j = 0;
        if (typeof l === "number") {
            for (; j < l; j++) {
                first[i++] = second[j];
            }
        } else {
            while (second[j] !== undefined) {
                first[i++] = second[j++];
            }
        }
        first.length = i;
        return first;
    }

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
    fetch(url:string, handler:any, jsonParam:any, method:string, formData:FormData, headers:any):void {
        var self = this;
        var requestParam = {
            method: method || 'GET',
            headers: headers || {'Accept': 'application/json'}
        };
        if (requestParam.method.toUpperCase() === 'POST') {
            if (formData) {
                requestParam['body'] = formData;
            } else if (jsonParam) {
                var formData = new FormData();
                this.forEach(this.keys(jsonParam), function(item, index) {
                    formData.append(encodeURIComponent(item), encodeURIComponent(jsonParam[item]));
                });
                requestParam['body'] = formData;
            }
        }
        fetch(url,requestParam).then(response=>response.json()).then(function(json) {
            handler(self.fmtJSONMsg(json));
        }).catch(function (ex) {
            console.log('request:' + url + ' failed info:' + ex.message);
        })
    }

    fmtJSONMsg(jsonData:any):any {
        //json格式消息与响应的JSONMessage对象保持一致, status: 成功-success, 失败-fail
        var result:any, jsonMessage = {status: "fail", code: '0', msg: '', result: {}};
        try {
            if (typeof jsonData === 'string') {
                if (typeof(JSON) === 'object' && JSON.parse) {
                    result = JSON.parse(jsonData);
                } else {
                    result = eval("(" + jsonData + ")");
                }
            } else {
                result = jsonData;
            }
            //对不规范响应内容进行处理
            if (result != undefined && result.status == undefined) {
                jsonMessage.status = "success";
                jsonMessage.code = "0";
                jsonMessage.msg = "";
                jsonMessage.result = result;
            } else if (result != undefined) {
                jsonMessage = result;
            }
        } catch (err) {
            //服务器响应失败，错误代码：XXX，请稍后重试或联系我们的客服！
            //TODO 可将err.description||err.toString()||''发送给日志服务器分析
            jsonMessage = {status: "fail", code: '0', msg: "服务器响应失败，请稍后重试或联系我们的客服！", result: {}};
        }
        return jsonMessage || {status: "fail", code: '0', msg: '', result: {}};
    }

    parseJSON(data:any) {
        if (!data || typeof data !== "string") {
            return null;
        }
        // Make sure leading/trailing whitespace is removed (IE can't handle it)
        data = this.trim(data);
        // Attempt to parse using the native JSON parser first
        if (window.JSON && window.JSON.parse) {
            return window.JSON.parse(data);
        }
        // Make sure the incoming data is actual JSON
        // Logic borrowed from http://json.org/json2.js
        if (/^[\],:{}\s]*$/.test(data.replace(/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, "@")
                .replace(/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g, "]")
                .replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
            return (new Function("return " + data))();
        }
        this.error("Invalid JSON: " + data);
    }

    debugJSON(o:any) {
        //用于在ie8+和ff3.5+浏览器下开发调试
        if (typeof(JSON) === 'object' && JSON.stringify) {
            return JSON.stringify(o);
        }
        return "{}";
    }

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
    aop(context:any, orig:any, before:any, after:any) {
        var _self = this, aopFunc = function () {
            var args:any, result:any;
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
    }

    nextTick(f:any, v:any) {
        if (typeof module !== 'undefined' && module.exports) {
            process.nextTick(function () {
                f(v);
            });
        } else {
            setTimeout(function () {
                f(v);
            }, 0);
        }
    }

    keys(obj:any) {
        if (!this.isObject(obj)) return [];
        var keys:any = [];
        if (obj.forEach) {
            obj.forEach(function(value,key){
                keys[keys.length] = key;
            });
            return keys;
        }
        if (Object.keys) return Object.keys(obj);
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                keys[keys.length] = key;
            }
        }
        return keys;
    }

    /**
     * 将map或set转化为array
     * e.g. var m = new Map(); utils.toArray(m.values());
     * @param likeMap和迭代对象
     * @returns {any}
     */
    toArray(likeMap:any) {
        if (Array.hasOwnProperty('from')) {
            return Array.from(likeMap);
        }
        return [];
    }

    /**
     * e.g. contain([1,2,33], 33) will return true;
     * @param arr
     * @param element
     * @returns {boolean}
     */
    contain(arr:any, element:any) {
        if (this.isArray(arr)) {
            return arr.indexOf(element) >= 0;
        }
        return false;
    }

    /**
     * # For Each 有参考https://github.com/codemix/fast.js的代码实现
     *
     * A fast `.forEach()` implementation.
     *
     * @param  {Array|Map|Set}    subject     The array (or array-like: Map, Set) to iterate over.
     * @param  {Function} fn          The visitor function.
     * @param  {Object}   thisContext The context for the visitor.
     */
    forEach(subject:any, fn:any, thisContext:any) {
        if (subject.forEach) {
            subject.forEach(function(value, key, forEachObj) {
                fn(value, key, forEachObj);
            });
            return;
        }
        var length = subject.length, i:number = 0,
            iterator = arguments.length > 2 ? this._fastBind(fn, thisContext) : fn;
        for (;i < length; i++) {
            iterator(subject[i], i, subject);
        }
    }

    now() {
        return (new Date).getTime();
    }

    error(msg:any) {
        throw new Error(msg);
    }

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
    fastMap(subject:any, fn:any, thisContext:any) {
        var length = subject.length, result = new Array(length), i:number = 0,
            iterator = arguments.length > 2 ? this._fastBind(fn, thisContext) : fn;
        for (;i < length; i++) {
            result[i] = iterator(subject[i], i, subject);
        }
        return result;
    }

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
    fastReduce(subject:any, fn:any, initialValue:any, thisContext:any) {
        var length = subject.length, result = initialValue, i:number = 0,
            iterator = arguments.length > 3 ? this._fastBind(fn, thisContext) : fn;
        for (; i < length; i++) {
            result = iterator(result, subject[i], i, subject);
        }
        return result;
    }

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
    _fastBind(fn:any, thisContext:any) {
        var boundLength = arguments.length - 2, boundArgs:Array<any>;
        if (boundLength > 0) {
            boundArgs = new Array(boundLength);
            for (var i = 0; i < boundLength; i++) {
                boundArgs[i] = arguments[i + 2];
            }
            return function () {
                var length = arguments.length,
                    args = new Array(boundLength + length),
                    i:number = 0;
                for (;i < boundLength; i++) {
                    args[i] = boundArgs[i];
                }
                for (i = 0; i < length; i++) {
                    args[boundLength + i] = arguments[i];
                }
                return fn.apply(thisContext, args);
            };
        } else {
            return function () {
                var length = arguments.length,
                    args = new Array(length),
                    i:number =0;
                for (;i < length; i++) {
                    args[i] = arguments[i];
                }
                return fn.apply(thisContext, args);
            };
        }
    }
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
    ready(callback:any) {
        if (this.isFunction(callback)) {
            var root = this.root;
            this.root.headLoad.ready(document, function () {
                callback(root, root.app);
            });
        }
    }
};
var __utils = new _utils(this);
export var utils = __utils;
export var perfmjs = __utils.root;