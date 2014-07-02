/**
 * perfmjs－高性能javascript v1.1.3
 * @date 2014-05-19
 */
!(function() {
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
        isH5Supported: function() {
            return -[1,]; //判断加载页面的浏览器是否为支持Html5的现代浏览器
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
        fastBind: function(fn, thisContext) {
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
                iterator = arguments.length > 2 ? this.fastBind(fn, thisContext) : fn;
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
                iterator = arguments.length > 2 ? this.fastBind(fn, thisContext) : fn;
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
                iterator = arguments.length > 3 ? this.fastBind(fn, thisContext) : fn;
            for (i = 0; i < length; i++) {
                result = iterator(result, subject[i], i, subject);
            }
            return result;
        },
    	//以下方法实现都是来自jquery1.8.2的对应方法:_type,_isFunction,_isArray,_each,_isWindow,_isNumeric, _isPlainObject,_extend
    	each: function(obj, callback, args) {
    		var name, i = 0, length = obj.length, isObj = length === undefined || this.isFunction( obj );
    		if (args) {
    			if ( isObj ) {
    				for (name in obj) {
    					if (callback.apply(obj[name], args) === false) {
    						break;
    					}
    				}
    			} else {
    				for (; i < length;) {
    					if (callback.apply( obj[ i++ ], args) === false ) {
    						break;
    					}
    				}
    			}
    		// A special, fast, case for the most common use of each
    		} else {
    			if (isObj) {
    				for (name in obj) {
    					if (callback.call( obj[ name ], name, obj[ name ] ) === false) {
    						break;
    					}
    				}
    			} else {
    				for (; i < length;) {
    					if (callback.call( obj[ i ], i, obj[ i++ ] ) === false) {
    						break;
    					}
    				}
    			}
    		}
    		return obj;
    	},
    	class2type: undefined,
    	type: function(obj) {
    		if (this.class2type === undefined) {
    			var _class2type = this.class2type = {};
    		    this.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
    		    	_class2type["[object " + name + "]"] = name.toLowerCase();
    		    });
    		}
    		return obj == null ? String(obj) : this.class2type[Object.prototype.toString.call(obj)] || "object";
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
    	isNumeric: function(obj) {
    		return !isNaN(parseFloat(obj)) && isFinite(obj);
    	},
        toNumber: function(obj) {
            return ~~obj; //these is 0: "null,undefined,false,0,'',NaN,非数字的字符串"
        },
        toBoolean: function(obj) {
            return !!obj; //these is false: "null,undefined,false,0,'',NaN"
        },
    	isWindow: function(obj) {
    		return obj != null && obj == obj.window;
    	},
    	isPlainObject: function(obj) {
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
        				if (deep && copy && ( this.isPlainObject(copy) || (copyIsArray = this.isArray(copy)))) {
        					if (copyIsArray) {
        						copyIsArray = false;
        						clone = src && this.isArray(src) ? src : [];
        					} else {
        						clone = src && this.isPlainObject(src) ? src : {};
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
    	// Cross-browser xml parsing
    	parseXML: function(data) {
    		var xml, tmp;
    		if ( !data || typeof data !== "string" ) {
    			return null;
    		}
    		try {
    			if (window.DOMParser) { // Standard
    				tmp = new DOMParser();
    				xml = tmp.parseFromString(data , "text/xml");
    			} else { // IE
    				xml = new ActiveXObject("Microsoft.XMLDOM");
    				xml.async = "false";
    				xml.loadXML(data);
    			}
    		} catch(e) {
    			xml = undefined;
    		}
    		if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
    			this.error("Invalid XML: " + data);
    		}
    		return xml;
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
    		var jsonMessage = {status:"success",code:'0',msg:'',result:{}};
    		try {
    			if (typeof jsonData === 'string') {
    				result = eval("(" + jsonData + ")");
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
    			try {
    				if (typeof(JSON) == 'object' && JSON.parse) {
        				var result = JSON.parse(jsonData);
    					//对不规范响应内容进行处理
    					if (result != undefined && result.status == undefined) {
    						jsonMessage.status = "success";
    						jsonMessage.code = "0";
    						jsonMessage.msg = "";
    						jsonMessage.result = result;
    					}  else if (result != undefined) {
    						jsonMessage = result;
    					}
    				} else {
    					//服务器响应失败，错误代码：XXX，请稍后重试或联系我们的客服！
    					jsonMessage = {status:"fail",code:'0',msg:"服务器响应失败，请稍后重试或联系我们的客服！",result:{}};
    				}
    			} catch(err) {
    				jsonMessage = {status:"fail",code:'0',msg:err.description||err.toString()||'',result:{}};
    			}
    		}
    		return jsonMessage || {status:"fail",code:'0',msg:'',result:{}};
    	},
    	xmlToJSON: function(xmlDoc) {
    		// Create the return object
    		var obj = {};
    		if (xmlDoc.nodeType == 1) { // element
    			// do attributes
    			if (xmlDoc.attributes.length > 0) {
    				obj["@attr"] = {};
    				for (var j = 0; j < xmlDoc.attributes.length; j++) {
    					var attribute = xmlDoc.attributes.item(j);
    					obj["@attr"][attribute.nodeName] = attribute.nodeValue;
    				}
    			}
    		} else if (xmlDoc.nodeType == 3) {
    			//text
    			obj = xmlDoc.nodeValue.trim();
    		}
    		// do children
    		if (xmlDoc.hasChildNodes()) {
    			for(var i = 0; i < xmlDoc.childNodes.length; i++) {
    				var item = xmlDoc.childNodes.item(i);
    				var nodeName = item.nodeName;
    				if (typeof(obj[nodeName]) == "undefined") {
    					obj[nodeName] = this.xmlToJSON(item);
    				} else {
    					if (typeof(obj[nodeName].push) == "undefined") {
    						var old = obj[nodeName];
    						obj[nodeName] = [];
    						obj[nodeName].push(old);
    					}
    					obj[nodeName].push(this.xmlToJSON(item));
    				}
    			}
    		}
    		return obj;
    	},
        aop: function(context, orig, before, after) {
            var _self = this, aopFunc = function() {
                var args, result;
                context = context || this;
                if (before && typeof before === 'function') {
                    //可修改传入参数
                    args = before.apply(this, arguments);
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
//            for(var i in orig) {
//                if(orig.hasOwnProperty(i)){
//                    aopFunc[i] = orig[i];
//                }
//            }
//            aopFunc.origFunc = orig;
            //aopFunc.prototype = orig.prototype;
            return aopFunc;
        },
    	end: 0
    };
    //perfmjs插件开发接口
    perfmjs.plugin = function(meta, fn, runFnNow) {
		var name = perfmjs.utils.isString(meta) ? meta : meta['name'];
        runFnNow = runFnNow || true;
		fn = perfmjs.utils.isFunction(meta) ? meta : fn;
		if (!perfmjs.utils.isFunction(fn)) throw "Plugin fn required";
		if (name && fn) perfmjs.plugins[name] = fn;
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
})();perfmjs.plugin('sysconfig', function($$) {
    $$.sysconfig.events = {
        moduleIsReady: 'perfmjs.ready',
        end:0
    };
});/**
 * Browser detect: http://www.quirksmode.org/js/detect.html
 * A useful but often overrated JavaScript function is the browser detect. 
 * Sometimes you want to give specific instructions or load a new page in case the viewer uses, for instance, Safari.
 * import utils.js
 */
perfmjs.plugin('browser', function($$) {
	$$.browser = {
		init: function() {
			this.browser = this._searchString(this._dataBrowser) || "An unknown browser";
			this.version = this._searchVersion(navigator.userAgent) || this._searchVersion(navigator.appVersion) || "an unknown version";
			this.os = this._searchString(this._dataOS) || "an unknown OS";
			this.ok = true;
		},
		info: function() {
			if (this.ok === undefined) this.init();
			return this.browser + " " + this.version + " " + this.os; 
		},
		msie: function() {
			if (this.ok === undefined) this.init();
			return (this.browser === 'Explorer');
		},
		_searchString: function(data) {
			for (var i=0;i<data.length;i++)	{
				var dataString = data[i].string;
				var dataProp = data[i].prop;
				this.version_searchString = data[i].versionSearch || data[i].identity;
				if (dataString) {
					if (dataString.indexOf(data[i].subString) != -1) {
						return data[i].identity;
					}
				} else if (dataProp) {
					return data[i].identity;
				}
			}
		},
		_searchVersion: function(dataString) {
			var index = dataString.indexOf(this.version_searchString);
			if (index == -1) return;
			return parseFloat(dataString.substring(index+this.version_searchString.length+1));
		},
		_dataBrowser: [{
				string: navigator.userAgent,
				subString: "Chrome",
				identity: "Chrome"
			},{
				string: navigator.userAgent,
				subString: "OmniWeb",
				versionSearch: "OmniWeb/",
				identity: "OmniWeb"
			},{
				string: navigator.vendor,
				subString: "Apple",
				identity: "Safari",
				versionSearch: "Version"
			},{
				prop: window.opera,
				identity: "Opera",
				versionSearch: "Version"
			},{
				string: navigator.vendor,
				subString: "iCab",
				identity: "iCab"
			},{
				string: navigator.vendor,
				subString: "KDE",
				identity: "Konqueror"
			},{
				string: navigator.userAgent,
				subString: "Firefox",
				identity: "Firefox"
			},{
				string: navigator.vendor,
				subString: "Camino",
				identity: "Camino"
			},{		
				// for newer Netscapes (6+)
				string: navigator.userAgent,
				subString: "Netscape",
				identity: "Netscape"
			},{
				string: navigator.userAgent,
				subString: "MSIE",
				identity: "Explorer",
				versionSearch: "MSIE"
			},{
				string: navigator.userAgent,
				subString: "Gecko",
				identity: "Mozilla",
				versionSearch: "rv"
			},{ 		
				// for older Netscapes (4-)
				string: navigator.userAgent,
				subString: "Mozilla",
				identity: "Netscape",
				versionSearch: "Mozilla"
			}
		],
		_dataOS: [{
				string: navigator.platform,
				subString: "Win",
				identity: "Windows"
			},{
				string: navigator.platform,
				subString: "Mac",
				identity: "Mac"
			},{
				   string: navigator.userAgent,
				   subString: "iPhone",
				   identity: "iPhone/iPod"
		    },{
				string: navigator.platform,
				subString: "Linux",
				identity: "Linux"
			}]
	};
});/**
 * 原生态js的OO框架抽象基类,默认不自动实例化对象
 * @date 2012-12-01
 */
!(function($$) {
	$$ = $$ || window;
	/**
	 * 子类继承父类的例子,调用如：xxx.newInstance(arg) 或 new perfmjs.xxx() 或 new $$.xxx() 或perfmjs.xxx.newInstance(arg) 或用perfmjs.xxx.instance访问实例;
	第一级子类例子：
    perfmjs.plugin('xxx', function($$) {
		$$.base("base.xxx", {
			init: function(arg) {
				return this;
			},
			end: 0
		});
		$$.base.xxx.defaults = {
			scope: 'singleton',
			end: 0
		};
	});
   多级子类例子：
   perfmjs.plugin('xxx', function($$) {
		$$.base("base.xxx.yyy", {
			init: function(arg) {
				return this;
			},
			end: 0
		}, $$.base.xxx.prototype, $$.base.xxx.defaults);
		$$.base.xxx.yyy.defaults = {
			scope: 'singleton',
			end: 0
		};
	});
	 * @param name e.g. 'base.ssq'
	 */
	$$.base = function(name, prototype, parentPrototype, parentDefaults) {
		var parentPrototype = parentPrototype || $$.base.prototype;
		var parentDefaults = parentDefaults || $$.base.defaults;
		var namespace = name.split(".").slice(0, name.split(".").length - 1).join('.');
		//name必须全局唯一
		name = name.split(".")[name.split(".").length - 1];
		var spaceLen = namespace.split(".").length;
		var spaces = namespace.split(".");
		for (var i = 0; i < spaceLen; i++) {
			$$[namespace] = (i < 1)?$$[spaces[0]]:$$[namespace][spaces[i]];
		}
		$$[namespace] = $$[namespace] || {};
		$$[name] = $$[namespace][name] = function(callInitFunc, options) {
			callInitFunc = (callInitFunc === undefined)?true:callInitFunc;
			this.namespace = namespace;
			this.name = name;
			this.options = $$.utils.extend({}, parentDefaults, $$[namespace][name].defaults, options);
			(callInitFunc && this.init());
			if (this.options['scope'] === 'singleton') {
				$$[name]['instance'] = this;
			}
		};
		$$[namespace][name].newInstance = function(arg) {
			if ($$[name]['instance']) {
				return $$[name]['instance'];
			}
			var _inst = new $$[namespace][name](false); _inst.init(arg);
			return _inst;
		};
		$$[namespace][name].prototype = $$.utils.extend(true, {}, parentPrototype, prototype);
		$$[namespace][name].prototype._super = function(funcName, options) {
			//FIXME base父类的第一级子类中（base.ssqModule)不可以执行重写的方法：如this._super('init');
			parentPrototype[funcName].call(this, options);
		};
	};
	$$.base.prototype = {
		init: function() {
			return this;
		},
		option: function(key, value) {
			var _options = key;
			if (typeof key == "string") {
				if (typeof value === 'undefined') {
					return this.options[key];
				}
				_options = {};
				_options[key] = value;
			}
			for (_key in _options) {
				this.options[_key] = _options[_key];
			}
		}
	};
	/*
	 * 以下是公共的配置,可被子类覆盖.以免引起混乱,这些配置变量不应在除父类和子类的第三方类中引用
	 * scope: singleton | prototype, the default value is singleton
	 */
	$$.base.defaults = {
		scope: 'singleton',
		end: 0
	};
})(perfmjs); /**
 * 日志模块 FIXME 待完善
 * 1）允许定义日志等级 -- "error", "warn", "info", "debug", "log"
 * 2）在Firefox中通过firebug控制台输出日志，在IE中通过在url中添加debug=true参数，将日志显示在页面底部。
 * 3）线上模式的错误日志，将记录到draggon监控系统，触发报警。
 * @date 2012-11-30
 * import perfmjs.js
 */
!(function($$){
	/**
	 * 	调试开发, 打开后将输出日志
	 *  online模式下，异常信息将记录到draggon服务器上报警
	 *  window.dmtrack 此变量只有online模式才存在，因此可以用于区分debug/online
	 *  注意拷贝线上html源码时请将不需要的相关代码删除。
	 */
	DEBUG_MOD = false;
	perfmjs.logger=function(){};
	perfmjs.logger.level=4; 	//default level
	//perfmjs.logger.errorUri="http://search.china.alibaba.com/rpc/dragoontrack/logError.json?msg="; 	//dragoon url
	//perfmjs.logger.errorUri="http://s.no100.com/rpc/dragoontrack/logError.json?msg="; 	//dragoon url
	perfmjs.logger.setLevel=function(level){//set logger level to filter the logger , so just show the logger level you focus.
		perfmjs.logger.level=level;
	};
   
	var prepared = false;
	var methods = [ "error", "warn", "info", "debug", "log"];//0-4 level
   
	perfmjs.utils.extend(perfmjs.logger.prototype, {
		level:perfmjs.logger.level,
		setEnableLevel: function(level) {
			if(level>4 || level<0) {
				this.error(['wrong level setting. level should be 0-4, the int type,you set ',level,", so stupided."].join(''));
			}
			this.level=parseInt(level);
		},
		enabled: function(lev) {
			if(lev>perfmjs.logger.level) {
				return false;
			}
			return true;
		},
		name: function() {
			return this._name;
		},
		log: function() {
			this._log(4, arguments);
		},
		debug: function() {
			this._log(3, arguments);
		},
		info: function() {
			this._log(2, arguments);
		},
		warn: function() {
			this._log(1, arguments);
		},
		error: function() {
			this._log(0, arguments);
		},
		_handler: function(level, name, msg){
            ////////////在此处返回/////////////////////////////
            return;
            /////////////////////////////////////////
			var method=methods[level];
			msg=[[method+"|"].join(" | ")].concat(Array.prototype.slice.call(msg));
			   
			if(self.console && !perfmjs.browser.msie()){
			   if(console.log.apply){
				  console[method].apply(console, msg);    	  
			   }else{
				  console[console[method]?method:'log'](msg);
			   }
			}else{
				//在IE下，如果url中添加debug=true，则日志窗口将被添加在页面的底部，帮助调试。
				if(perfmjs.browser.msie()) {
					if(/debug=true/i.test(location.search)) {
						!prepared && this._prepare();	
						var msgBox = perfmjs.utils.getJQuery()('#DEBUG ol');
						var color;
						switch(method){
							case "log":{
								color="#FFFFFF";
								break;
							}
							case "debug":{
								color="#C0C0C0";
								break;
							}
							case "info":{
								color="#EBF5FF";
								break;
							}
							case "warn":{
								color="#FFFFC8";
								break;
							}
							case "error":{
								color="#FE6947";
								break;
							}
							default:{
								color="#FFFFFF";
								break;
							}
						}
						perfmjs.utils.getJQuery()('<li style="background-color:'+ color +';">').text('' + msg).appendTo(msgBox);
					} 
				}
			}
//			//online模式下需要报警
//			if(!DEBUG_MOD){
//				if(level == 0 || level == 1){
//					(new Image()).src = perfmjs.logger.errorUri + this._getBrowserInfo() + msg;
//				}
//			}
		},
		_log: function(level, msg) {
			if (this.enabled(level)) {
				this._handler(level,this.name(),msg);
			}
		},
		_getBrowserInfo:function(){
			return perfmjs.browser.info();
		},
		_prepare:function() {
			perfmjs.utils.getJQuery()('#DEBUG').remove();
			//注意应该该js放在<head>标签内才有效果
			perfmjs.utils.getJQuery()(document.head).before('<div id="DEBUG" style="margin-top:10px;padding:8px;border:dashed 1px #FF7300;background-color:#EEE;color:#000;"><ol></ol></div>');
			prepared = true;
		},
		end:0
	});
   
	var logs={};//logs  instance container
	perfmjs.logger = function(name) {
       if (!logs[name]) {
           logs[name] = new perfmjs.logger(name);
           logs[name]._name=name;
       }
       return logs[name];
	}('perfmjs');
	if(DEBUG_MOD){
		perfmjs.logger.setEnableLevel(4);	
	}else{
		perfmjs.logger.setEnableLevel(2);
	}
	//try-catch 捕捉不到的异常使用onerror函数来记录日志
	/* window.onerror = function(msg,url,line){
		if(!DEBUG_MOD){
			(new Image()).src = perfmjs.logger.errorUri + perfmjs.logger._getBrowserInfo() + msg + ' |url:' +url + ' |line:'+line;
		}
		return false;
	}; */
})(window);/*
 * JOQUERY 1.0.0
 * import utils.js
 */
perfmjs.plugin('joquery', function($$) {
	$$.base("base.joquery", {
		init: function() {
			if (arguments === undefined) return this;
			//copy传进来的入参数组
			this.items = arguments[0].slice();
			return this;
		},
        version: "1.0.0",
        toArray: function() {return this.items;},
        /**
         * where条件
         * @param clause 条件表达式
         * @param lazySearch： true-找到一个符合条件的记录后不再往后找，false-一直找到最后
         * @returns {*}
         */
        where: function(clause, lazySearch) {
            var newArray = new Array();
            for (var index = 0; index < this.items.length; index++) {
                if (clause(this.items[index], index)) {
                    newArray[newArray.length] = this.items[index];
                    if (lazySearch) {
                        break;
                    }
                }
            }
            return new $$.joquery(false).init(newArray);
        },
        select: function(clause) {
            var newArray = new Array();
            // The clause was passed in as a Method that returns a Value
            for (var i = 0; i < this.items.length; i++) {
                if (clause(this.items[i])) {
                    newArray[newArray.length] = this.items[i];
                }
            }
            return new $$.joquery(false).init(newArray);
        },
        orderBy: function(clause) {
            var tempArray = new Array();
            for (var i = 0; i < this.items.length; i++) {
                tempArray[tempArray.length] = this.items[i];
            }
            return new $$.joquery(false).init(
	            tempArray.sort(function(a, b) {
	                var x = clause(a);
	                var y = clause(b);
	                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	            })
            );
        },
        orderByDescending: function(clause) {
            var tempArray = new Array();
            for (var i = 0; i < this.items.length; i++) {
                tempArray[tempArray.length] = this.items[i];
            }
            return new $$.joquery(false).init(
	            tempArray.sort(function(a, b) {
	                var x = clause(b);
	                var y = clause(a);
	                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	            })
            );
        },
        selectMany: function(clause) {
            var r = new Array();
            for (var i = 0; i < this.items.length; i++) {
                r = r.concat(clause(this.items[i]));
            }
            return new $$.joquery(false).init(r);
        },
        count: function(clause) {
            if (clause == null)
                return this.items.length;
            else
                return this.where(clause).items.length;
        },
        distinct: function(clause) {
            var item;
            var dict = new Object();
            var retVal = new Array();
            for (var i = 0; i < this.items.length; i++) {
                item = clause(this.items[i]);
                // TODO - This doens't correctly compare Objects. Need to fix this
                if (dict[item] == null) {
                    dict[item] = true;
                    retVal[retVal.length] = item;
                }
            }
            dict = null;
            return new $$.joquery(false).init(retVal);
        },
        any: function(clause) {
        	var result = {'matched':false, 'index':-1, 'item': {}};
            for (var index = 0; index < this.items.length; index++) {
                if (clause(this.items[index], index)) {return {'matched':true, 'index':index, 'item': this.items[index]};}
            }
            return result;
        },
        all: function(clause) {
            for (var index = 0; index < this.items.length; index++) {
                if (!clause(this.items[index], index)) { return false; }
            }
            return true;
        },
        reverse: function() {
            var retVal = new Array();
            for (var index = this.items.length - 1; index > -1; index--)
                retVal[retVal.length] = this.items[index];
            return new $$.joquery(false).init(retVal);
        },
        first: function(clause) {
            if (clause != null) {
                return this.where(clause, true).first();
            } else {
                // If no clause was specified, then return the first element in the Array
                if (this.items.length > 0)
                    return this.items[0];
                else
                    return null;
            }
        },
        last: function(clause) {
            if (clause != null) {
                return this.reverse().first(clause);
            } else {
                // If no clause was specified, then return the first element in the Array
                if (this.items.length > 0)
                    return this.items[this.items.length - 1];
                else
                    return null;
            }
        },
        elementAt: function(index) {
            return this.items[index];
        },
        concatArray: function(array) {
            var arr = array.items || array;
            return new $$.joquery(false).init(this.items.concat(arr));
        },
        intersect: function(secondArray, clause) {
            var clauseMethod;
            if (clause != undefined) {
                clauseMethod = clause;
            } else {
                clauseMethod = function(item, index, item2, index2) { return item == item2; };
            }

            var sa = secondArray.items || secondArray;

            var result = new Array();
            for (var a = 0; a < this.items.length; a++) {
                for (var b = 0; b < sa.length; b++) {
                    if (clauseMethod(this.items[a], a, sa[b], b)) {
                        result[result.length] = this.items[a];
                    }
                }
            }
            return new $$.joquery(false).init(result);
        },
        defaultIfEmpty: function(defaultValue) {
            if (this.items.length == 0) {
                return defaultValue;
            }
            return this;
        },
        elementAtOrDefault: function(index, defaultValue) {
            if (index >= 0 && index < this.items.length) {
                return this.items[index];
            }
            return defaultValue;
        },
        firstOrDefault: function(defaultValue) {
            return this.first() || defaultValue;
        },
        lastOrDefault: function(defaultValue) {
            return this.last() || defaultValue;
        },
        /**
         * 将新元素插入到指定条件的位置,并返回插入的index等信息
         * 果找不到满足clause条件的记录，则把item追加到目标数组的最后
         * @param item 新的数组元素
         * @param clause 条件
         * @returns {*} 结果
         */
        insert: function(item, clause) {
         	var result = {'matched':false, 'index':-1, 'item': {}};
         	if (this.items.length < 1) {
         		this.items.splice(0, 0, item);
         		return {'matched':true, 'index':0, 'item': item}; 
         	}
            for (var index = 0; index < this.items.length; index++) {
                if (clause(this.items[index], index)) {
                	this.items.splice(index, 0, item);
                	return {'matched':true, 'index':index, 'item': item}; 
                }
            }
            if (!result.matched) {
            	this.items[this.items.length] = item;
            	return {'matched':true, 'index':this.items.length - 1, 'item': item};  
            }
            return result;       	
        },
        /**
         * 将新元素插入/修改到指定条件的位置,并返回插入/修改的元素的index等信息,如修改条件满足则只进行修改操作
         * 如果找不到满足updateClause， insertClause条件的记录，则把item追加到目标数组的最后
         * @param item  新的数组元素
         * @param updateClause 修改条件
         * @param insertClause 新增条件
         * @returns {*} 结果
         */
        updateOrInsert: function(item, updateClause, insertClause) {
         	var result = {'matched':false, 'index':-1, 'item': {}};
         	if (this.items.length < 1) {
         		this.items.splice(0, 0, item);
         		return {'matched':true, 'index':0, 'item': item}; 
         	}
            for (var index = 0; index < this.items.length; index++) {
                if (updateClause != undefined && updateClause(this.items[index], index)) {
                	this.items[index] = item;
                	return {'matched':true, 'index':index, 'item': item}; 
                } else if (insertClause(this.items[index], index)) {
                	this.items.splice(index, 0, item);
                	return {'matched':true, 'index':index, 'item': item}; 
                }
            }
            if (!result.matched) {
            	this.items[this.items.length] = item;
            	return {'matched':true, 'index':this.items.length - 1, 'item': item};  
            }
            return result;       	
        }
	}, $$.base.prototype, $$.base.defaults);
	$$.base.joquery.defaults = {
		scope: 'prototype',
		end: 0
	};
});
/*
SamplesData = [
   		    { ID: 1, firstName: "Chris", lastName: "Pearson", BookIDs: [1001, 1002, 1003] },
   		    { ID: 9, firstName: "Bernard", lastName: "Sutherland", BookIDs: [1001, 2002, 3003] },
   		    { ID: 20, firstName: "Kate", lastName: "Pinkerton", BookIDs: [4001, 3002, 2003] }
   		];
var sample = joquery.newInstance(SamplesData).updateOrInsert({ID: 0, firstName: "Chris", lastName: "Pearson", BookIDs: [1001, 1002, 1003]}, function(item){return item.ID == 9;}, function(item){return item.ID > 15;});
alert(perfmjs.json.toJSON(sample));
var sample2 = joquery.newInstance(SamplesData).where(function(item, index){return item.ID == 9;});
alert(perfmjs.json.toJSON(sample2.toArray()));*////#source 1 1 /src/1.0.0/load.js
/* head.load - v1.0.3 */
/*
 * HeadJS     The only script in your <HEAD>
 * Author     Tero Piirainen  (tipiirai)
 * Maintainer Robert Hoffmann (itechnology)
 * License    MIT / http://bit.ly/mit-license
 * WebSite    http://headjs.com
 */
//for perfmjs: 去掉注释中的!符号,并将以下的(符号改为!执行符号
!function (win, undefined) {
    "use strict";

    //#region variables
    var doc        = win.document,
        domWaiters = [],
        handlers   = {}, // user functions waiting for events
        assets     = {}, // loadable items in various states
        isAsync    = "async" in doc.createElement("script") || "MozAppearance" in doc.documentElement.style || win.opera,
        isDomReady,

        /*** public API ***/
        headVar = win.head_conf && win.head_conf.head || "head",
        api     = win[headVar] = (win[headVar] || function () { api.ready.apply(null, arguments); }),

        // states
        PRELOADING = 1,
        PRELOADED  = 2,
        LOADING    = 3,
        LOADED     = 4;
    //#endregion

    //#region PRIVATE functions

    //#region Helper functions
    function noop() {
        // does nothing
    }

    function each(arr, callback) {
        if (!arr) {
            return;
        }

        // arguments special type
        if (typeof arr === "object") {
            arr = [].slice.call(arr);
        }

        // do the job
        for (var i = 0, l = arr.length; i < l; i++) {
            callback.call(arr, arr[i], i);
        }
    }

    /* A must read: http://bonsaiden.github.com/JavaScript-Garden
     ************************************************************/
    function is(type, obj) {
        var clas = Object.prototype.toString.call(obj).slice(8, -1);
        return obj !== undefined && obj !== null && clas === type;
    }

    function isFunction(item) {
        return is("Function", item);
    }

    function isArray(item) {
        return is("Array", item);
    }

    function toLabel(url) {
        ///<summary>Converts a url to a file label</summary>
        var items = url.split("/"),
             name = items[items.length - 1],
             i    = name.indexOf("?");

        return i !== -1 ? name.substring(0, i) : name;
    }

    // INFO: this look like a "im triggering callbacks all over the place, but only wanna run it one time function" ..should try to make everything work without it if possible
    // INFO: Even better. Look into promises/defered's like jQuery is doing
    function one(callback) {
        ///<summary>Execute a callback only once</summary>
        callback = callback || noop;

        if (callback._done) {
            return;
        }

        callback();
        callback._done = 1;
    }
    //#endregion

    function conditional(test, success, failure, callback) {
        ///<summary>
        /// INFO: use cases:
        ///    head.test(condition, null       , "file.NOk" , callback);
        ///    head.test(condition, "fileOk.js", null       , callback);
        ///    head.test(condition, "fileOk.js", "file.NOk" , callback);
        ///    head.test(condition, "fileOk.js", ["file.NOk", "file.NOk"], callback);
        ///    head.test({
        ///               test    : condition,
        ///               success : [{ label1: "file1Ok.js"  }, { label2: "file2Ok.js" }],
        ///               failure : [{ label1: "file1NOk.js" }, { label2: "file2NOk.js" }],
        ///               callback: callback
        ///    );
        ///    head.test({
        ///               test    : condition,
        ///               success : ["file1Ok.js" , "file2Ok.js"],
        ///               failure : ["file1NOk.js", "file2NOk.js"],
        ///               callback: callback
        ///    );
        ///</summary>
        var obj = (typeof test === "object") ? test : {
            test: test,
            success: !!success ? isArray(success) ? success : [success] : false,
            failure: !!failure ? isArray(failure) ? failure : [failure] : false,
            callback: callback || noop
        };

        // Test Passed ?
        var passed = !!obj.test;

        // Do we have a success case
        if (passed && !!obj.success) {
            obj.success.push(obj.callback);
            api.load.apply(null, obj.success);
        }
        // Do we have a fail case
        else if (!passed && !!obj.failure) {
            obj.failure.push(obj.callback);
            api.load.apply(null, obj.failure);
        }
        else {
            callback();
        }

        return api;
    }

    function getAsset(item) {
        ///<summary>
        /// Assets are in the form of
        /// {
        ///     name : label,
        ///     url  : url,
        ///     state: state
        /// }
        ///</summary>
        var asset = {};

        if (typeof item === "object") {
            for (var label in item) {
                if (!!item[label]) {
                    asset = {
                        name: label,
                        url : item[label]
                    };
                }
            }
        }
        else {
            asset = {
                name: toLabel(item),
                url : item
            };
        }

        // is the item already existant
        var existing = assets[asset.name];
        if (existing && existing.url === asset.url) {
            return existing;
        }

        assets[asset.name] = asset;
        return asset;
    }

    function allLoaded(items) {
        items = items || assets;

        for (var name in items) {
            if (items.hasOwnProperty(name) && items[name].state !== LOADED) {
                return false;
            }
        }

        return true;
    }

    function onPreload(asset) {
        asset.state = PRELOADED;

        each(asset.onpreload, function (afterPreload) {
            afterPreload.call();
        });
    }

    function preLoad(asset, callback) {
        if (asset.state === undefined) {

            asset.state     = PRELOADING;
            asset.onpreload = [];

            loadAsset({ url: asset.url, type: "cache" }, function () {
                onPreload(asset);
            });
        }
    }

    function apiLoadHack() {
        /// <summary>preload with text/cache hack
        ///
        /// head.load("http://domain.com/file.js","http://domain.com/file.js", callBack)
        /// head.load(["http://domain.com/file.js","http://domain.com/file.js"], callBack)
        /// head.load({ label1: "http://domain.com/file.js" }, { label2: "http://domain.com/file.js" }, callBack)
        /// head.load([{ label1: "http://domain.com/file.js" }, { label2: "http://domain.com/file.js" }], callBack)
        /// </summary>
        var args     = arguments,
            callback = args[args.length - 1],
            rest     = [].slice.call(args, 1),
            next     = rest[0];

        if (!isFunction(callback)) {
            callback = null;
        }

        // if array, repush as args
        if (isArray(args[0])) {
            args[0].push(callback);
            api.load.apply(null, args[0]);

            return api;
        }

        // multiple arguments
        if (!!next) {
            /* Preload with text/cache hack (not good!)
             * http://blog.getify.com/on-script-loaders/
             * http://www.nczonline.net/blog/2010/12/21/thoughts-on-script-loaders/
             * If caching is not configured correctly on the server, then items could load twice !
             *************************************************************************************/
            each(rest, function (item) {
                // item is not a callback or empty string
                if (!isFunction(item) && !!item) {
                    preLoad(getAsset(item));
                }
            });

            // execute
            load(getAsset(args[0]), isFunction(next) ? next : function () {
                api.load.apply(null, rest);
            });
        }
        else {
            // single item
            load(getAsset(args[0]));
        }

        return api;
    }

    function apiLoadAsync() {
        ///<summary>
        /// simply load and let browser take care of ordering
        ///
        /// head.load("http://domain.com/file.js","http://domain.com/file.js", callBack)
        /// head.load(["http://domain.com/file.js","http://domain.com/file.js"], callBack)
        /// head.load({ label1: "http://domain.com/file.js" }, { label2: "http://domain.com/file.js" }, callBack)
        /// head.load([{ label1: "http://domain.com/file.js" }, { label2: "http://domain.com/file.js" }], callBack)
        ///</summary>
        var args     = arguments,
            callback = args[args.length - 1],
            items    = {};

        if (!isFunction(callback)) {
            callback = null;
        }

        // if array, repush as args
        if (isArray(args[0])) {
            args[0].push(callback);
            api.load.apply(null, args[0]);

            return api;
        }

        // JRH 262#issuecomment-26288601
        // First populate the items array.
        // When allLoaded is called, all items will be populated.
        // Issue when lazy loaded, the callback can execute early.
        each(args, function (item, i) {
            if (item !== callback) {
                item             = getAsset(item);
                items[item.name] = item;
            }
        });

        each(args, function (item, i) {
            if (item !== callback) {
                item = getAsset(item);

                load(item, function () {
                    if (allLoaded(items)) {
                        one(callback);
                    }
                });
            }
        });

        return api;
    }

    function load(asset, callback) {
        ///<summary>Used with normal loading logic</summary>
        callback = callback || noop;

        if (asset.state === LOADED) {
            callback();
            return;
        }

        // INFO: why would we trigger a ready event when its not really loaded yet ?
        if (asset.state === LOADING) {
            api.ready(asset.name, callback);
            return;
        }

        if (asset.state === PRELOADING) {
            asset.onpreload.push(function () {
                load(asset, callback);
            });
            return;
        }

        asset.state = LOADING;

        loadAsset(asset, function () {
            asset.state = LOADED;

            callback();

            // handlers for this asset
            each(handlers[asset.name], function (fn) {
                one(fn);
            });

            // dom is ready & no assets are queued for loading
            // INFO: shouldn't we be doing the same test above ?
            if (isDomReady && allLoaded()) {
                each(handlers.ALL, function (fn) {
                    one(fn);
                });
            }
        });
    }

    function getExtension(url) {
        url = url || "";

        var items = url.split("?")[0].split(".");
        return items[items.length-1].toLowerCase();
    }

    /* Parts inspired from: https://github.com/cujojs/curl
    ******************************************************/
    function loadAsset(asset, callback) {
        callback = callback || noop;

        function error(event) {
            event = event || win.event;

            // release event listeners
            ele.onload = ele.onreadystatechange = ele.onerror = null;

            // do callback
            callback();

            // need some more detailed error handling here
        }

        function process(event) {
            event = event || win.event;

            // IE 7/8 (2 events on 1st load)
            // 1) event.type = readystatechange, s.readyState = loading
            // 2) event.type = readystatechange, s.readyState = loaded

            // IE 7/8 (1 event on reload)
            // 1) event.type = readystatechange, s.readyState = complete

            // event.type === 'readystatechange' && /loaded|complete/.test(s.readyState)

            // IE 9 (3 events on 1st load)
            // 1) event.type = readystatechange, s.readyState = loading
            // 2) event.type = readystatechange, s.readyState = loaded
            // 3) event.type = load            , s.readyState = loaded

            // IE 9 (2 events on reload)
            // 1) event.type = readystatechange, s.readyState = complete
            // 2) event.type = load            , s.readyState = complete

            // event.type === 'load'             && /loaded|complete/.test(s.readyState)
            // event.type === 'readystatechange' && /loaded|complete/.test(s.readyState)

            // IE 10 (3 events on 1st load)
            // 1) event.type = readystatechange, s.readyState = loading
            // 2) event.type = load            , s.readyState = complete
            // 3) event.type = readystatechange, s.readyState = loaded

            // IE 10 (3 events on reload)
            // 1) event.type = readystatechange, s.readyState = loaded
            // 2) event.type = load            , s.readyState = complete
            // 3) event.type = readystatechange, s.readyState = complete

            // event.type === 'load'             && /loaded|complete/.test(s.readyState)
            // event.type === 'readystatechange' && /complete/.test(s.readyState)

            // Other Browsers (1 event on 1st load)
            // 1) event.type = load, s.readyState = undefined

            // Other Browsers (1 event on reload)
            // 1) event.type = load, s.readyState = undefined

            // event.type == 'load' && s.readyState = undefined

            // !doc.documentMode is for IE6/7, IE8+ have documentMode
            if (event.type === "load" || (/loaded|complete/.test(ele.readyState) && (!doc.documentMode || doc.documentMode < 9))) {
                // remove timeouts
                win.clearTimeout(asset.errorTimeout);
                win.clearTimeout(asset.cssTimeout);

                // release event listeners
                ele.onload = ele.onreadystatechange = ele.onerror = null;

                // do callback   
                callback();
            }
        }

        function isCssLoaded() {
            // should we test again ? 20 retries = 5secs ..after that, the callback will be triggered by the error handler at 7secs
            if (asset.state !== LOADED && asset.cssRetries <= 20) {

                // loop through stylesheets
                for (var i = 0, l = doc.styleSheets.length; i < l; i++) {
                    // do we have a match ?
                    // we need to tests agains ele.href and not asset.url, because a local file will be assigned the full http path on a link element
                    if (doc.styleSheets[i].href === ele.href) {
                        process({ "type": "load" });
                        return;
                    }
                }

                // increment & try again
                asset.cssRetries++;
                asset.cssTimeout = win.setTimeout(isCssLoaded, 250);
            }
        }

        var ele;
        var ext = getExtension(asset.url);

        if (ext === "css") {
            ele      = doc.createElement("link");
            ele.type = "text/" + (asset.type || "css");
            ele.rel  = "stylesheet";
            ele.href = asset.url;

            /* onload supported for CSS on unsupported browsers
             * Safari windows 5.1.7, FF < 10
             */

            // Set counter to zero
            asset.cssRetries = 0;
            asset.cssTimeout = win.setTimeout(isCssLoaded, 500);         
        }
        else {
            ele      = doc.createElement("script");
            ele.type = "text/" + (asset.type || "javascript");
            ele.src = asset.url;
        }

        ele.onload  = ele.onreadystatechange = process;
        ele.onerror = error;

        /* Good read, but doesn't give much hope !
         * http://blog.getify.com/on-script-loaders/
         * http://www.nczonline.net/blog/2010/12/21/thoughts-on-script-loaders/
         * https://hacks.mozilla.org/2009/06/defer/
         */

        // ASYNC: load in parallel and execute as soon as possible
        ele.async = false;
        // DEFER: load in parallel but maintain execution order
        ele.defer = false;

        // timout for asset loading
        asset.errorTimeout = win.setTimeout(function () {
            error({ type: "timeout" });
        }, 7e3);

        // use insertBefore to keep IE from throwing Operation Aborted (thx Bryan Forbes!)
        var head = doc.head || doc.getElementsByTagName("head")[0];

        // but insert at end of head, because otherwise if it is a stylesheet, it will not override values      
        head.insertBefore(ele, head.lastChild);
    }

    /* Parts inspired from: https://github.com/jrburke/requirejs
    ************************************************************/
    function init() {
        var items = doc.getElementsByTagName("script");

        // look for a script with a data-head-init attribute
        for (var i = 0, l = items.length; i < l; i++) {
            var dataMain = items[i].getAttribute("data-headjs-load");
            if (!!dataMain) {
                api.load(dataMain);
                return;
            }
        }
    }

    function ready(key, callback) {
        ///<summary>
        /// INFO: use cases:
        ///    head.ready(callBack);
        ///    head.ready(document , callBack);
        ///    head.ready("file.js", callBack);
        ///    head.ready("label"  , callBack);
        ///    head.ready(["label1", "label2"], callback);
        ///</summary>

        // DOM ready check: head.ready(document, function() { });
        if (key === doc) {
            if (isDomReady) {
                one(callback);
            }
            else {
                domWaiters.push(callback);
            }

            return api;
        }

        // shift arguments
        if (isFunction(key)) {
            callback = key;
            key      = "ALL"; // holds all callbacks that where added without labels: ready(callBack)
        }

        // queue all items from key and return. The callback will be executed if all items from key are already loaded.
        if (isArray(key)) {
            var items = {};

            each(key, function (item) {
                items[item] = assets[item];

                api.ready(item, function() {
                    if (allLoaded(items)) {
                        one(callback);
                    }
                });
            });

            return api;
        }

        // make sure arguments are sane
        if (typeof key !== "string" || !isFunction(callback)) {
            return api;
        }

        // this can also be called when we trigger events based on filenames & labels
        var asset = assets[key];

        // item already loaded --> execute and return
        if (asset && asset.state === LOADED || key === "ALL" && allLoaded() && isDomReady) {
            one(callback);
            return api;
        }

        var arr = handlers[key];
        if (!arr) {
            arr = handlers[key] = [callback];
        }
        else {
            arr.push(callback);
        }

        return api;
    }

    /* Mix of stuff from jQuery & IEContentLoaded
     * http://dev.w3.org/html5/spec/the-end.html#the-end
     ***************************************************/
    function domReady() {
        // Make sure body exists, at least, in case IE gets a little overzealous (jQuery ticket #5443).
        if (!doc.body) {
            // let's not get nasty by setting a timeout too small.. (loop mania guaranteed if assets are queued)
            win.clearTimeout(api.readyTimeout);
            api.readyTimeout = win.setTimeout(domReady, 50);
            return;
        }

        if (!isDomReady) {
            isDomReady = true;

            init();
            each(domWaiters, function (fn) {
                one(fn);
            });
        }
    }

    function domContentLoaded() {
        // W3C
        if (doc.addEventListener) {
            doc.removeEventListener("DOMContentLoaded", domContentLoaded, false);
            domReady();
        }

        // IE
        else if (doc.readyState === "complete") {
            // we're here because readyState === "complete" in oldIE
            // which is good enough for us to call the dom ready!
            doc.detachEvent("onreadystatechange", domContentLoaded);
            domReady();
        }
    }

    // Catch cases where ready() is called after the browser event has already occurred.
    // we once tried to use readyState "interactive" here, but it caused issues like the one
    // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
    if (doc.readyState === "complete") {
        domReady();
    }

    // W3C
    else if (doc.addEventListener) {
        doc.addEventListener("DOMContentLoaded", domContentLoaded, false);

        // A fallback to window.onload, that will always work
        win.addEventListener("load", domReady, false);
    }

    // IE
    else {
        // Ensure firing before onload, maybe late but safe also for iframes
        doc.attachEvent("onreadystatechange", domContentLoaded);

        // A fallback to window.onload, that will always work
        win.attachEvent("onload", domReady);

        // If IE and not a frame
        // continually check to see if the document is ready
        var top = false;

        try {
            top = !win.frameElement && doc.documentElement;
        } catch (e) { }

        if (top && top.doScroll) {
            (function doScrollCheck() {
                if (!isDomReady) {
                    try {
                        // Use the trick by Diego Perini
                        // http://javascript.nwbox.com/IEContentLoaded/
                        top.doScroll("left");
                    } catch (error) {
                        // let's not get nasty by setting a timeout too small.. (loop mania guaranteed if assets are queued)
                        win.clearTimeout(api.readyTimeout);
                        api.readyTimeout = win.setTimeout(doScrollCheck, 50);
                        return;
                    }

                    // and execute any waiting functions
                    domReady();
                }
            }());
        }
    }
    //#endregion

    //#region Public Exports
    // INFO: determine which method to use for loading
    api.load  = api.js = isAsync ? apiLoadAsync : apiLoadHack;
    api.test  = conditional;
    api.ready = ready;
    //#endregion

    //#region INIT
    // perform this when DOM is ready
    api.ready(doc, function () {
        if (allLoaded()) {
            each(handlers.ALL, function (callback) {
                one(callback);
            });
        }

        if (api.feature) {
            api.feature("domloaded", true);
        }
    });
    //#endregion

    /*for perfmjs begin*/
    perfmjs.loadres = api;
    /*for perfmjs end*/
}(window);
/**
 * 解析加载资源文件的url.
 * TODO: 该类必须同时通过所有浏览器测试，包括ie6, ie7, ie8等浏览器
 * 如：
  	<script type="text/javascript" src="/perfmjs/js/core2/onlyforload.js?v=2012120303^{n:'css-comm',f:'',t:'css',m:'fb;jq',d:'http://s.no100.com'}"></script>
  	<script type="text/javascript" src="/perfmjs/js/core2/onlyforload.js?v=2012120301^{n:'widget-comm',f:'http://s.no100.com/perfmjs/js/core2/include-comm.js',t:'js',m:'ssq',d:'http://s.no100.com'}"></script>
	<script type="text/javascript" src="/perfmjs/js/core2/onlyforload.js?v=2012120302^{n:'js-comm',f:'http://s.no100.com/perfmjs/js/core2/include-comm.js',t:'js',m:'jq;dlt',d:'http://s.no100.com'}"></script>
	<script type="text/javascript" src="/perfmjs/js/core2/jquery-1.8.3.js"></script>
	<script type="text/javascript" src="/perfmjs/js/core2/utils.js"></script>
	<script type="text/javascript" src="/perfmjs/js/core2/base.js"></script>
	<script type="text/javascript" src="/perfmjs/js/core2/json.js"></script>
	<script type="text/javascript" src="/perfmjs/js/core2/joquery.js"></script>
	<script type="text/javascript" src="/perfmjs/js/core2/loadres.js"></script>
	或者使用以下压缩地址
  	<script type="text/javascript" src="/perfmjs/js/core2/onlyforload.js?v=2012120303^{n:'css-comm',f:'',t:'css',m:'jq;fb',d:'http://s.no100.com'}"></script>
	<script type="text/javascript" src="/perfmjs/js/core2/onlyforload.js?v=2012120302^{n:'js-comm',f:'http://s.no100.com/perfmjs/js/core2/include-comm.js',t:'js',m:'jq;dlt',d:'http://s.no100.com'}"></script>
	<script type="text/javascript" src="/perfmjs/js/core2/core.min.js?v=2012120301^{n:'widget-comm',f:'http://s.no100.com/perfmjs/js/core2/include-comm.js',t:'js',m:'ssq',d:'http://s.no100.com'}"></script>
 */
!(function($$) {
	perfmjs.includeres = {
		writejs: function(src, encode) {
		    document.write('<script type="text/javascript" src='+src+' charset="'+(encode||"UTF-8")+'"></script>');
		},
		writecss: function(link, asyncCss) {
			asyncCss = asyncCss || true;
			if (asyncCss) {
				var cssNode = document.createElement('link');
				cssNode.type = 'text/css'; cssNode.rel = 'stylesheet'; cssNode.href = link;
				document.getElementsByTagName("head")[0].appendChild(cssNode);
			} else {
				//放在头部的css最好要同步下载且放在head元素中
				document.write('<link type="text/css" rel="stylesheet" href="' + link + '" />');
			}
		},
        /**
         * 利用head.load.js类库加载资源文件
         * 调用例子: perfmjs.includeres.loadHeadRes("http://domain.com/file.js","http://domain.com/file.js", callBack)
         */
        loadHeadRes: function() {
            var args = arguments, _args = [];
            for (var i = 0; i < args.length; i++) {
                if (perfmjs.utils.isArray(args[i])) {
                    _args  = _args.concat(args[i]);
                    continue;
                }
                _args[_args.length] = args[i];
            }
            perfmjs.loadres.js.apply(null, _args);
        },
		load: function(options) {
			//var load_start = perfmjs.utils.now();
			this._parseLoadedRes(options);
			var len = this.sources.length, v = this.getVersion(), confs = [];
			for(var i = 0; i < len;  i++) {
				var option = this.sources[i];
				if (option['f'] != undefined && option['f'] != '') {
					confs[confs.length] = option['f'] + "?v=" + v;
				}
			}
			confs = perfmjs.joquery.newInstance(confs).distinct(function(item){return item;}).toArray();
			//以下include文件用同步加载而不用异步加载方式:perfmjs.loadres.js(confs);
			var confLen = confs.length;
			for(var j = 0; j < confLen;  j++) {
				this.writejs(confs[j]);
			}
			//perfmjs.logger.debug("load fun execute in load function, cost:" + (perfmjs.utils.now() - load_start) + " ms");
			return this;
		},
		loadedModuleName: {},
		//加载应用需要的所有相关js或css文件
		loadModules: function(options) {
			//var loadModules_execstart = perfmjs.utils.now();
			options = perfmjs.utils.extend({name:'js-comm', type:'js', mdCallback:function(){}, handleUrlsCallback:function(){}, afterLoadedCallback:function(){}}, options);
			if (typeof perfmjs.includeres.sources != 'undefined') {
				var sources = perfmjs.includeres.sources;
				sources = perfmjs.joquery.newInstance(sources).select(function(item) {
					return (item['n'] === options['name'] && item['t'] === options['type']);
				}).toArray();
				if (sources.length < 1) return this;
				var combineUrls = [];
				var modLen = sources.length;
				for (var i = 0; i < modLen; i++) {
					//name应唯一,不重复执行相同name的模块
					if (perfmjs.includeres.loadedModuleName[sources[i]['n']]) {
						continue;
					}
					var source = sources[i];
                    if (source['d'] !== undefined && (perfmjs.currentDomain||'') === '') {
                        perfmjs.currentDomain = source['d'];
                    }
					var modules = source['m'].split(";");
					var moduleslen = modules.length;
					for (var j = 0; j < moduleslen; j++) {
						var module = modules[j];
						options.mdCallback.call(null, source, module, combineUrls);
					}
					perfmjs.includeres.loadedModuleName[source['n']] = source['n'];
				}
				//去掉重复链接文件名
				//var joquery_execstart = perfmjs.utils.now();
				combineUrls = perfmjs.joquery.newInstance((options.handleUrlsCallback.call(null, combineUrls)||combineUrls)).distinct(function(item) {return item;}).toArray();
				//perfmjs.logger.debug("joquery distinct finished in loadModules, cost:" + (perfmjs.utils.now() - joquery_execstart) + " ms");
				if (combineUrls.length > 0) {
					if (options.type === 'js') {
						//应用所需的js文件使用异步加载
						//var loadmodules_start = perfmjs.utils.now();
                        this.loadHeadRes(combineUrls.concat([options.afterLoadedCallback]));
						//perfmjs.logger.debug("loadModules finished, cost:" + (perfmjs.utils.now() - loadmodules_start) + " ms, combineUrls=" + combineUrls);
					} else if (options.type === 'css') {
						//FIXME css文件应使用同步加载且应使用minify或concat之类的在线压缩工具,css文件最好不要使用js类库来管理版本号加载（网速慢的情况下头部样式会乱）
						var combineUrlsLen = combineUrls.length;
						for (var r = 0; r < combineUrlsLen; r++) {
							this.writecss(combineUrls[r], false);
						}
					}
				}
				//perfmjs.logger.debug("loadModules execute all finished, cost:" + (perfmjs.utils.now() - loadModules_execstart) + " ms");
			}
            return this;
		},
		sources: [],
		getVersion: function(interval) {
			interval = interval || 2;
			var load_date = new Date();
			var load_day = load_date.getDate()<=9?('0'+load_date.getDate()):load_date.getDate();
			var load_hour = load_date.getHours()<=9?('0'+load_date.getHours()):load_date.getHours();
			var _min = load_date.getMinutes()%2==0?load_date.getMinutes():(load_date.getMinutes()-load_date.getMinutes()%interval);
			var load_minute = _min<=9?('0'+_min):_min;
			return ''+load_date.getFullYear()+(load_date.getMonth()+1)+load_day+load_hour+load_minute;
		},
		_parseLoadedRes: function(options) {
			//只认带有script元素的src属性或src参数中含有onlyforload.js或core.js或core.min.js或core-def.js字符的地址
			options = perfmjs.utils.extend({loadfile:'onlyforload.js|core.min.js|core.js|core-def.js', isScript:false, src:''}, options);
			this.sources.length = 0;  //将sources数组清空
			var scripts = options['isScript'] ? document.getElementsByTagName("script") : options['src'].split('|');
			var scriptLen = scripts.length;
			for (var i=0; i<scriptLen; i++) {
				var src = options['isScript'] ? scripts[i].src : (scripts[i].indexOf('^')<0?('onlyforload.js^'+scripts[i]):scripts[i]);
				var scriptOptions={};
				var isParsed = options['isScript'] ? (src.isparsed || false) : false;
				if (src && src.match(options['loadfile']) && !isParsed ) {
					if(src.indexOf('^') != -1) {
						var multiSrcOptions = src.split('^')[1].replace(new RegExp("%22","gm"),"\"").replace(new RegExp("%27","gm"),"\'").split('|');
						var multiSrcOptionsLen = multiSrcOptions.length;
						for (var j = 0; j < multiSrcOptionsLen; j++) {
							srcOptions = multiSrcOptions[j];
							try {
								scriptOptions = eval("("+srcOptions+")");
							} catch (err) {
								if (typeof(JSON) == 'object' && JSON.parse) {
			        				scriptOptions = JSON.parse(srcOptions);
								}
							}
							this.sources[this.sources.length] = scriptOptions;
						}
						if (options['isScript']) {
							scripts[i].setAttribute('isparsed', 'true');
						}
					}
					/*
					else if(src.indexOf('&') != -1) {
						//FIXME 代码不应执行到这里
						var srclen = src.split('&').length;
						if(srclen == 1){
							var srcOptions = src.split('&')[1].replace(new RegExp("%22","gm"),"\"").replace(new RegExp("%27","gm"),"\'");
							try {
								scriptOptions = eval("("+srcOptions+")");
							} catch (err) {
								if (typeof(JSON) == 'object' && JSON.parse) {
			        				scriptOptions = JSON.parse(srcOptions);
								}
							}
							this.sources[this.sources.length] = scriptOptions;
						}else{
							var srcOptions = src.substr(src.indexOf('&')+1).replace(new RegExp("%22","gm"),"\"").replace(new RegExp("%27","gm"),"\'");;
							try {
								scriptOptions = eval("("+srcOptions+")");
							} catch (err) {
								if (typeof(JSON) == 'object' && JSON.parse) {
			        				scriptOptions = JSON.parse(srcOptions);
								}
							}
							this.sources[this.sources.length] = scriptOptions;
						}
					}*/
				}
			}
			return this.sources;
		}
	};
	//立即解析includeres
	perfmjs.includeres.load({isScript:true});
})(window);/**
 * eventProxy
 * 单实例，实现模块间通信的代理类, 每个模块都有自己的 eventProxy，用来降低模块间耦合度，各模块只能直接和eventProxy打交道。
 * @date 2012-11-30
 * import base.js
 */
perfmjs.plugin('eventProxy', function($$) {
	$$.base("base.eventProxy", {
		init: function(){
			this.channels = {};
			return this;
		},
		
		/**
		* @method: on
		* @param: channel: 要监听事件的名称（string|Array）
		* @param: fn: 监听事件的回调函数（function）
		* @param: context: （可选）这个参数可以指定fn的作用域
		*/
		on: function(channel, fn, context) {
			var id, subscription, self, i, _len, _results;
			if (context == null) context = this;
			if (this.channels[channel] == null) this.channels[channel] = [];
			self = this;
			
			//允许使用一个回调函数同时监听多个事件，
			//例如：sb.subscribe( ["event1", "event2"], messageHandler );
			if (channel instanceof Array) {
				_results = [];
				for (i = 0, _len = channel.length; i < _len; i++) {
				id = channel[i];
				_results.push(this.subscribe(id, fn, context));
			}
			return _results;
		  }else {
			subscription = {
				context: context,
				callback: fn
			};
			return {
			  attach: function() {
				self.channels[channel].push(subscription);
				return this;
			  },
			  detach: function() {
				Mediator._rm(self, channel, subscription.callback);
				return this;
			  }
			}.attach();
		  }
		},
		
		/**
		* @method: off，有多种方式可以移除监听事件
		* @param: ch: 要监听事件的名称（string|function）
		* @param: cb: 要移除监听的回调函数（可选）
		*/
		off: function(ch, cb) {
		  var id;
		  switch (typeof ch) {
			case "string":
			  if (typeof cb === "function") Mediator._rm(this, ch, cb);
			  if (typeof cb === "undefined") Mediator._rm(this, ch);
			  break;
			case "function":
			  for (id in this.channels) {
				Mediator._rm(this, id, ch);
			  }
			  break;
			case "undefined":
			  for (id in this.channels) {
				Mediator._rm(this, id);
			  }
			  break;
			case "object":
			  for (id in this.channels) {
				Mediator._rm(this, id, null, ch);
			  }
		  }
		  return this;
		},
		
		/**
		* @method: emit
		* @param: channel: 要监听事件的名称（string）
		* @param: data: 通过事件传递的数据，可以是数组（object|Array）
		* @param: publishReference: （可选）默认为false，保证data数据不被修改。 如果为true，则data数据作为引用传值给其它模块，可能会被修改。
		*/
		emit: function(channel, data, publishReference) {
		  var copy, k, subscription, v, i, _len, _ref;
		  if (this.channels[channel] != null) {
			_ref = this.channels[channel];
			for (i = 0, _len = _ref.length; i < _len; i++) {
			  subscription = _ref[i];
			  if (publishReference !== true && typeof data === "object") {
				if (data instanceof Array) {
				  copy = (function() {
					var _j, _len2, _results;
					_results = [];
					for (_j = 0, _len2 = data.length; _j < _len2; _j++) {
					  v = data[_j];
					  _results.push(v);
					}
					return _results;
				  })();
				} else {
				  copy = {};
				  for (k in data) {
					v = data[k];
					copy[k] = v;
				  }
				}
				subscription.callback.apply(subscription.context, [copy, channel]);
			  } else {
				subscription.callback.apply(subscription.context, [data, channel]);
			  }
			}
		  }
		  return this;
		},
		end: 0
	}, $$.base.prototype, $$.base.defaults);
	$$.base.eventProxy.defaults = {
		scope: 'singleton',
		end: 0
	};
});/**
 * 有限状态机的javascript实现
 * Created by tony on 2014/4/11.
 */
perfmjs.plugin('fsm', function($$) {
    $$.base("base.fsm", {
        init: function() {
            if (this.options['initial']) {
                this.option('current',this.options['initial']['from']);
                this.options['stateMap'][this.options['initial']['event']] = {};
                this.options['stateMap'][this.options['initial']['event']][this.options['current']] = this.options['initial']['to'];
                if (!this.options['initial']['defer']) {
                    this.event(this.options['initial']['event']);
                }
            }
            return this;
        },
        event: function(event) {
          this.transition(event);
        },
        transition: function(event) {
            var result = false, oldState = this.options['current'];
            if (!!this['onEnterFrom' + this.upperCaseFirst(this.options['current'])]) {
                result = this['onEnterFrom' + this.upperCaseFirst(this.options['current'])](event);
            } else {
                result = this.onEnterEvent(event);
            }
            if (typeof result !== 'undefined' && !result) {
                return;
            }

            if (!!this['onLeaveFrom' + this.upperCaseFirst(this.options['current'])]) {
                result = this['onLeaveFrom' + this.upperCaseFirst(this.options['current'])](event);
            } else {
                result = this.onLeaveCurrentState(event);
            }
            if (typeof result !== 'undefined' && !result) {
                return;
            }

            if (this.options['stateMap'][event][oldState] !== this.options['current']) {
                alert('========' + this.options['stateMap'][event][oldState] + "/" + this.current());
                return;
            }

            if (!!this['onEnterTo' + this.upperCaseFirst(this.options['current'])]) {
                result = this['onEnterTo' + this.upperCaseFirst(this.options['current'])](event);
            } else {
                result = this.onEnterNewState(event);
            }
            if (typeof result !== 'undefined' && !result) {
                return;
            }

            if (!!this['onLeaveTo' + this.upperCaseFirst(this.options['current'])]) {
                this['onLeaveTo' + this.upperCaseFirst(this.options['current'])](event);
            } else {
                this.onLeaveEvent(event);
            }
        },
        current: function() {
            return this.options['current'];
        },
        is: function(state) {
            return this.options['current'] === state;
        },
        can: function(event) {
            return this.options['stateMap'][event].hasOwnProperty(this.options['current']) || this.options['stateMap'][event].hasOwnProperty(this.options['WILDCARD']);
        },
        cannot: function(event) {
            return !this.can(event);
        },
        isFinished: function() {
            return this.is(this.options['terminal']);
        },
        upperCaseFirst: function(str) {
            return str.substring(0, 1).toUpperCase() + str.substring(1);
        },
        onEnterEvent: function(event) {
        },
        onLeaveCurrentState: function(event) {
            //change current state to new state
            this.option('current', this.options['stateMap'][event][this.options['current']] || this.options['current']);
        },
        onEnterNewState: function(event) {
            //do something
        },
        onLeaveEvent: function(event) {
        },
        end: 0
    });
    $$.base.fsm.defaults = {
        initial: {event: 'startup', from: 'init', to: 'final', defer: false}, //e.g. {event: 'startup', from:'none', to:'final', defer:false}
        stateMap: {},  //e.g. {'startup':{'none':'final', 'on':'final'}}
        current: 'init',
        terminal: 'final',
        WILDCARD: '*',
        version: '1.0.0',
        scope: 'singleton',
        end: 0
    };
});/**
 * app core 作用：
 * 1）控制各个模块的生命周期，创建及销毁
 * 2）允许模块间的通信
 * 3）负责对系统错误的处理
 * @date 2012-11-30
 * import logger.js
 * import eventProxy.js
 * import lazymodule.js
 */
perfmjs.plugin('app', function($$) {
	$$.base("base.app", {
		init: function(arg) {	
			this.moduleData = {};
			this.eventProxy = $$.eventProxy.newInstance();
			return this;
		},
		
		/**
		* @method: register 模块注册函数
		* @param: moduleId: 注册模块的名称（string）, 如果与dom节点的id相同，则会自动获取节点中的data-conf属性的json值
		* @param: creator: 模块的构造函数（string|function），如果为string，则会被parse成为function
		* @param: opt: （可选）可配置参数，可以传入callback或其它配置参数
		*/
		register: function(moduleId, creator, opt){
			if (opt == null) opt = {};
			try {
			  this._addModule(moduleId, creator, opt);
			  if(opt.init){
					return this.start(moduleId);
			  }
			  return true;
			} catch (ex) {
				if(!DEBUG_MOD){
					perfmjs.logger.error("could not register " + moduleId + " because: " + ex.message);
				}else{
					throw ex;
				}
			  return false;
			}
		},
		
		/**
		* @method: unregister 模块卸载函数
		* @param: moduleId: 注册模块的名称（string）
		*/
		unregister: function(moduleId) {
			if (this.moduleData[moduleId] != null) {
			  delete this.moduleData[moduleId];
			  return true;
			} else {
			  return false;
			}
		},
  
		/**
		* @method: start 初始化模块
		* @param: moduleId: 注册模块的名称（string）
		*/
		start: function(moduleId){
			//try-catch保证了在online模式下，一个模块的异常不会影响到其它模块，消除SPOF（单点故障）。
			//在debug模式下，把错误抛给浏览器处理，一个模块失败会影响到其它模块。这样便于发现错误。
			try {
				if (this.moduleData[moduleId] == null){
					throw new Error("module " + moduleId + " does not exist");
				}
				//var start = $$.utils.now();
				var opt = this.moduleData[moduleId].options;
				if (opt == null) opt = {};
				
				var instance = this._createInstance(moduleId, opt);
				if (instance.running === true){
					throw new Error("module " + moduleId + " was already started");
				}
				if (typeof instance.init !== "function") {
					throw new Error("module " + moduleId + " do not have an init function");
				}
				instance.option(instance.options);
				instance.running = true;
				this.moduleData[moduleId].instance = instance;
				if (typeof opt.callback === "function"){
					opt.callback();
				}
				//perfmjs.logger.debug(moduleId + " init finished, cost:" + ($$.utils.now() - start) + " ms");
				return true;
			} catch (ex) {
				if(!DEBUG_MOD){
					perfmjs.logger.error(moduleId + " init Error: " + ex.message);
				}else{
					throw ex;
				}
			  return false;
			}
		},
		
		/**
		* @method: startAll 初始化所有已注册模块
		*/		
		startAll: function(){
			var moduleId, results = [];
			for (moduleId in this.moduleData){
				if (this.moduleData.hasOwnProperty(moduleId)){
                    results.push(this.start(moduleId));
				}
			}
			//通知所有的模块以及初始化完毕，有需要监听此事件的模块可以处理callback函数。
			this.eventProxy.emit($$.sysconfig.events.moduleIsReady);
			return results;
		},
		
		/**
		* @method: stop 停止一个模块的运行
		* @param: moduleId: 注册模块的名称（string）
		*/		
		stop:function(moduleId) {
			var module = this.moduleData[moduleId];
			if (module.instance) {
				if($$.utils.isFunction(module.instance.destroy)){
					module.instance.destroy();
				}
				module.instance.running = false;
				module.instance = null;
				return true;
			} else {
				return false;
			}
		},
		
  		/**
		* @method: stopAll 停止所有模块的运行
		*/	
		stopAll:function() {
			var moduleId, _results;
			_results = [];
			for (moduleId in this.moduleData){
				if (this.moduleData.hasOwnProperty(moduleId)){
					_results.push(this.stop(moduleId));
				}
			}
			return _results;
		},
		
  		/**
		* @method: reStart 重新启动一个模块
		* @param: moduleId: 注册模块的名称（string）
		*/		
		restart:function(moduleId){
			if(this.stop(moduleId)){
				return this.start(moduleId);
			}
			return false;
		},
		
		_addModule: function(moduleId, creator, opt) {
			if (typeof moduleId !== "string") {
				throw new Error("moudule ID has to be a string");
			}
			var original = creator;
			if(typeof creator === "string"){
				creator = this._parseFunction(creator);
			}
 			if (typeof creator !== "function") {
				throw new Error(creator + " creator "+ original +" has to be a constructor function");
			}	
			if (typeof opt !== "object") {
				throw new Error("option parameter has to be an object");
			}
			if (this.moduleData[moduleId] != null) {
				throw new Error("module was already registered");
			}
			this.moduleData[moduleId] = {
				creator: creator,
				options: opt
			};
			return true;
		  },
		
		_createInstance: function(moduleId, opt) {
        var module = this.moduleData[moduleId];
        if (module.instance != null){
            return module.instance;
        }

			var instance = new module.creator(false, opt), name, method;
			instance.init($$.eventProxy.newInstance());

			//debug模式下try catch不起作用，交由浏览器自己处理错误。
			//online模式下可以把错误信息记录在日志服务器上。
//			if (!DEBUG_MOD){
//				for (name in instance){
//					method = instance[name];
//					if (typeof method == "function"){
//						instance[name] = function(name, method){
//							return function (){
//								try {
//									return method.apply(this, arguments);
//								} catch(ex) {
//									perfmjs.logger.error(moduleId + " throw error: " +  name + "()-> " + ex.message);
//								}
//							};
//						}(name, method);
//					}
//				}
//			}
			return instance;
		},

		/**
		 * 将字符串转化为函数
		 */
		_parseFunction:function(s){
			var a = s.split('.'),
			l=a.length,
			o = window;
			for (var i=($$.utils.isWindow(a[0])?1:0);i<l;i++) {
				if($$.utils.isFunction(o[a[i]]) || $$.utils.isPlainObject(o[a[i]])) {
					o = o[a[i]];
				} else {
					return null;
				}
			}
			if($$.utils.isFunction(o)){
				return o;
			}
			return null;
		},
		end:0
	}, $$.base.prototype, $$.base.defaults);
	$$.base.app.defaults = {
		scope: 'singleton',
		end: 0
	};
});