/**
 * perfmjs－高性能javascript v1.3.2
 * @date 2014-07-3
 */
!(function() {
    "use strict";
    /**
     * Returns the namespace specified and creates it if it doesn't exist
     * <pre>
     * perfmjs.utils.namespace('Platform.winport');
     * * perfmjs.utils.namespace('Platform.winport', 'Platform.winport.diy');
     * </pre>
     *
     * Be careful when naming packages. Reserved words may work in some browsers
     * and not others. For instance, the following will fail in Safari:
     * <pre>
     * perfmjs.utils.namespace('really.long.nested.namespace');
     * </pre>
     * perfmjs.utils fails because "long" is a future reserved word in ECMAScript
     *
     * @method namespace
     * @static
     * @param  {collection} arguments 1-n namespaces to create.
     * @return {object}  A reference to the last namespace object created.
     */
	var _namespace = function() {
        var a = arguments, o, i = 0, j, d, arg;
        for (; i < a.length; i++) {
            o = window;
            arg = a[i];
            if (arg.indexOf('.')) {
                d = arg.split('.');
                for (j = (d[0] == 'window') ? 1 : 0; j < d.length; j++) {
                    o[d[j]] = o[d[j]] || {};
                    o = o[d[j]];
                }
            } else {
                o[arg] = o[arg] || {};
            }
        }
    };
    //在这定义好core常用的命名空间，所有命名空间一律全小写
    _namespace('perfmjs.sysconfig','perfmjs.json', 'perfmjs.includeres', 'perfmjs.loadres', 'perfmjs.app', 'perfmjs.model');
    //FIXME Node.js
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = perfmjs;
    }
    //当前域名，全局只取唯一值 　e.g. http://www.no100.com/newuc
    perfmjs.currentDomain = "";
    perfmjs.plugins = {};
    perfmjs.utils = {
    	namespace: _namespace,
        isBrowserSupport: function() {
            return !this.isNodeJSSupport();
        },
        isNodeJSSupport: function() {
            if (typeof module !== 'undefined' && module.exports) {
                return true;
            }
            return false;
        },
        isAmdSupport: function() {
            return (typeof define === "function" && define.amd && define.amd['async']);
        },
        isH5Supported: function() {
            return -[1,] === -1; //判断加载页面的浏览器是否为支持Html5的现代浏览器
        },
    	isJQueryLoaded: function() {
    		return (typeof jQuery !== 'undefined');
    	},
    	getJQuery: function() {
    		return this.isJQueryLoaded()?jQuery:{};
    	},
        isObject: function(obj) {
            return obj === Object(obj);
        },
        keys: function(obj) {
            if (!this.isObject(obj)) return [];
            if (Object.keys) return Object.keys(obj);
            var keys = [];
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    keys[keys.length] = key;
                }
            }
            return keys;
        },
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
        _fastBind: function(fn, thisContext) {
            var boundLength = arguments.length - 2, boundArgs;
            if (boundLength > 0) {
                boundArgs = new Array(boundLength);
                for (var i = 0; i < boundLength; i++) {
                    boundArgs[i] = arguments[i + 2];
                }
                return function () {
                    var length = arguments.length,
                        args = new Array(boundLength + length),
                        i;
                    for (i = 0; i < boundLength; i++) {
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
                        i;
                    for (i = 0; i < length; i++) {
                        args[i] = arguments[i];
                    }
                    return fn.apply(thisContext, args);
                };
            }
        },
        /**
         * # For Each 有参考https://github.com/codemix/fast.js的代码实现
         *
         * A fast `.forEach()` implementation.
         *
         * @param  {Array}    subject     The array (or array-like) to iterate over.
         * @param  {Function} fn          The visitor function.
         * @param  {Object}   thisContext The context for the visitor.
         */
        forEach: function(subject, fn, thisContext) {
            var length = subject.length, i,
                iterator = arguments.length > 2 ? this._fastBind(fn, thisContext) : fn;
            for (i = 0; i < length; i++) {
                iterator(subject[i], i, subject);
            }
        },
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
        fastMap: function(subject, fn, thisContext) {
            var length = subject.length, result = new Array(length), i,
                iterator = arguments.length > 2 ? this._fastBind(fn, thisContext) : fn;
            for (i = 0; i < length; i++) {
                result[i] = iterator(subject[i], i, subject);
            }
            return result;
        },
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
        fastReduce: function(subject, fn, initialValue, thisContext) {
            var length = subject.length, result = initialValue, i,
                iterator = arguments.length > 3 ? this._fastBind(fn, thisContext) : fn;
            for (i = 0; i < length; i++) {
                result = iterator(result, subject[i], i, subject);
            }
            return result;
        },
        toNumber: function(obj) {
            return ~~obj; //these is 0: "null,undefined,false,0,'',NaN,非数字的字符串"
        },
        toBoolean: function(obj) {
            return !!obj; //these is false: "null,undefined,false,0,'',NaN"
        },
    	//以下方法实现都是来自jquery1.8.2的对应方法:_type,_isFunction,_isArray,_isWindow,_isPlainObject,_extend
    	_class2type: undefined,
    	type: function(obj) {
    		if (this._class2type === undefined) {
    			var _class2type = this._class2type = {};
    		    this.forEach("Boolean Number String Function Array Date RegExp Object".split(" "), function(item, index) {
    		    	_class2type["[object " + item + "]"] = item.toLowerCase();
    		    });
    		}
    		return obj == null ? String(obj) : this._class2type[Object.prototype.toString.call(obj)] || "object";
    	},
    	isString: function(obj) {
    		return typeof obj == "string";
    	},
    	isFunction: function(obj) {
    		return this.type(obj) === "function";
    	},
    	isArray: Array.isArray || function(obj) {
    		return this.type(obj) === "array";
    	},
    	isWindow: function(obj) {
    		return obj != null && obj == obj.window;
    	},
    	_isPlainObject: function(obj) {
    		var core_hasOwn = Object.prototype.hasOwnProperty;
    		// Must be an Object.
    		// Because of IE, we also have to check the presence of the constructor property.
    		// Make sure that DOM nodes and window objects don't pass through, as well
    		if (!obj || this.type(obj) !== "object" || obj.nodeType || this.isWindow(obj)) {
    			return false;
    		}
    		try {
    			// Not own constructor property must be Object
    			if (obj.constructor &&
    				!core_hasOwn.call(obj, "constructor") &&
    				!core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
    				return false;
    			}
    		} catch (e) {
    			// IE8,9 Will throw exceptions on certain host objects #9897
    			return false;
    		}
    		// Own properties are enumerated firstly, so to speed up,
    		// if last one is own, then all properties are own.
    		var key;
    		for (key in obj){}
    		return key === undefined || core_hasOwn.call(obj, key);
    	},
    	extend: function() {
    		var options, name, src, copy, copyIsArray, clone,
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
        		if ( (options = arguments[ i ]) != null ) {
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
        				} else if ( copy !== undefined ) {
        					target[name] = copy;
        				}
        			}
        		}
        	}
        	// Return the modified object
        	return target;
        },
    	trim: String.prototype.trim && !String.prototype.trim.call("\uFEFF\xA0") ?
			function(text) {
				return text==null?"":String.prototype.trim.call( text );
			} : function(text) {
				return text==null?"":(text + "").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
		},
    	now: function() {
    		return (new Date).getTime();
    	},
    	error: function(msg) {
    		throw new Error(msg);
    	},
    	parseJSON: function(data) {
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
    		if ( /^[\],:{}\s]*$/.test(data.replace(/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, "@")
    			.replace(/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g, "]")
    			.replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
    			return (new Function("return " + data))();
    		}
    		this.error("Invalid JSON: " + data);
    	},
    	debugJSON: function(o) {
    		//用于在ie8+和ff3.5+浏览器下开发调试
    		if (typeof(JSON) == 'object' && JSON.stringify) {
	            return JSON.stringify(o);
    		}
    		return "null";
    	},
    	merge: function(first, second) {
    		var l = second.length, i = first.length, j = 0;
    		if (typeof l === "number") {
    			for (; j < l; j++) {
    				first[ i++ ] = second[j];
    			}
    		} else {
    			while (second[j] !== undefined) {
    				first[i++] = second[j++];
    			}
    		}
    		first.length = i;
    		return first;
    	},
    	fmtJSONMsg: function(jsonData) {
    		//json格式消息与响应的JSONMessage对象保持一致, status: 成功-success, 失败-fail
    		var result, jsonMessage = {status:"fail",code:'0',msg:'',result:{}};
    		try {
    			if (typeof jsonData === 'string') {
                    if (typeof(JSON) == 'object' && JSON.parse) {
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
    			}  else if (result != undefined) {
    				jsonMessage = result;
    			}
    		} catch(err) {
                //服务器响应失败，错误代码：XXX，请稍后重试或联系我们的客服！
                //TODO 可将err.description||err.toString()||''发送给日志服务器分析
                jsonMessage = {status:"fail",code:'0',msg:"服务器响应失败，请稍后重试或联系我们的客服！",result:{}};
    		}
    		return jsonMessage || {status:"fail",code:'0',msg:'',result:{}};
    	},
        aop: function(context, orig, before, after) {
            var _self = this, aopFunc = function() {
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
        },
        nextTick: (typeof module !== 'undefined' && module.exports) ? function(f, v) {
            process.nextTick(function() {f(v);});
        } : function(f, v) {setTimeout(function() {f(v);},0);},
    	end: 0
    };
    //perfmjs插件开发接口
    perfmjs.plugin = function(meta, fn, runFnNow) {
		var name = perfmjs.utils.isString(meta) ? meta : meta['name'];
        runFnNow = runFnNow || true;
		fn = perfmjs.utils.isFunction(meta) ? meta : fn;
		if (!perfmjs.utils.isFunction(fn)) {
            throw "Plugin fn required!";
        }
        if (perfmjs.plugins[name]) {
            throw "Plugin name [" + name + " ] is existed!";
        }
		if (name && fn) {
            perfmjs.plugins[name] = fn;
        }
        if (runFnNow) {
            !fn(perfmjs);
        }
	};
    perfmjs.plugin.start = function(meta) {
        if (!!perfmjs.plugins[meta]) {
            perfmjs.plugins[meta](perfmjs);
        }
    };
    /**
     *
     * 负责所有模块的注册及应用程序的初始化入口,调用例子如下:
    //应用入口函数
    perfmjs.ready(function($$, app) {
        //注册启动业务对象实例
        app.register("module1", $$.module1);
        app.register("module2", $$.module2, {callback:function() {
            //alert('started base.module2');
        }});
        app.register("module3", $$.module3);
        app.startAll();
    });
     * @param callback
     */
    perfmjs.ready = function(callback) {
        if (perfmjs.utils.isFunction(callback)) {
            perfmjs.loadres.ready(document, function () {
                callback(perfmjs, perfmjs.app.newInstance());
            });
        }
    };
    if (perfmjs.utils.isAmdSupport()) {
        define('perfmjs', function (require) {
            return perfmjs;
        });
        define('utils', function (require) {
            return perfmjs.utils;
        });
    }
})();