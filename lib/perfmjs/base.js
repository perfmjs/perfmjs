/**
 * 原生态js的OO框架抽象基类,默认不自动实例化对象
 * @date 2012-12-01
 */
!(function($$) {
	$$ = $$ || window;
	/**
	 * 子类继承父类的例子,调用如：xxx.newInstance(arg) 或 new perfmjs.xxx() 或 new $$.xxx() 或perfmjs.xxx.newInstance(arg) 或用perfmjs.xxx.instance访问实例;
	第一级子类例子：
    perfmjs.plugin('xxx', function($$) {
		$$.base("xxx", {
			init: function(initParam) {
				return this;
			},
			end: 0
		});
		$$.xxx.defaults = {
			end: 0
		};
	});
   多级子类例子：
   if (typeof module !== 'undefined' && module.exports) {
        require('./xxx');
   }
   perfmjs.plugin('yyy', function($$) {
		$$.base("xxx.yyy", {
			init: function(initParam) {
				return this;
			},
			end: 0
		});
		$$.yyy.defaults = {
			end: 0
		};
	});
	 * @param name e.g. 'dlt','fc.ssq'
	 */
	$$.base = function(name, prototype, parentPrototype, parentDefaults) {
        //name必须全局唯一
        if (name.indexOf('base.') < 0) {
            name = 'base.' + name;
        }
		var namespace = name.split(".").slice(0, name.split(".").length - 1).join('.');
		name = name.split(".")[name.split(".").length - 1];
		var parentType, spaceLen = namespace.split(".").length, spaces = namespace.split(".");
		for (var i = 0; i < spaceLen; i++) {
			$$[namespace] = (i < 1)?$$[spaces[0]]:$$[namespace][spaces[i]];
            if (i === (spaceLen - 1)) {
                parentType = $$[namespace];
            }
		}
        parentPrototype = parentPrototype || parentType.prototype || $$.base.prototype;
        parentDefaults = parentDefaults || parentType.defaults || $$.base.defaults;
		$$[namespace] = $$[namespace] || {};
		$$[name] = $$[namespace][name] = function(callInitFunc, options) {
			callInitFunc = (callInitFunc === undefined)?true:callInitFunc;
			this.namespace = namespace;
			this.name = name;
			this.options = $$.utils.extend({}, parentDefaults, $$[namespace][name].defaults, options);
			(callInitFunc && this.init());
            if (!this.options['scope']) {
                this.options['scope'] = 'singleton';
            }
			if (this.options['scope'] === 'singleton') {
				$$[name]['instance'] = this;
			}
		};
		$$[namespace][name].newInstance = function(initParam, options) {
			if ($$[name]['instance']) {
				return $$[name]['instance'];
			}
			var _inst = new $$[namespace][name](false, options); _inst.init(initParam);
			return _inst;
		};
		$$[namespace][name].prototype = $$.utils.extend(true, {}, parentPrototype, prototype);
		$$[namespace][name].prototype._super = function(funcName, options) {
			//FIXME base父类的第一级子类中（base.ssqModule)不可以执行重写的方法：如this._super('init');
			parentPrototype[funcName].call(this, options);
		};
	};
	$$.base.prototype = {
		init: function(initParam) {
			return this;
		},
		option: function(key, value) {
            if (typeof key === "string" && this.options.hasOwnProperty(key)) {
                if (typeof value === 'undefined') {
                    return this.options[key];
                } else {
                    return this.options[key] = value;
                }
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
})(perfmjs);