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
})(perfmjs);