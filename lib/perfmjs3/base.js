System.register(['perfmjs/utils'], function(exports_1) {
    var utils_1;
    var $$, base;
    return {
        setters:[
            function (_utils_1) {
                utils_1 = _utils_1;
            }],
        execute: function() {
            /**
             * 子类继承父类的例子,调用如：xxx.newInstance(arg) 或 new perfmjs.xxx() 或 new $$.xxx() 或perfmjs.xxx.newInstance(arg) 或用perfmjs.xxx.instance访问实例;
             第一级子类例子：
             import {base} from 'perfmjs/base';
            
             base("demo", {
                init: function(args:any) {
                    console.log("demo init !!!!" + args);
                    return this;
                },
                test: function() {
                    console.log("test demo!!!!");
                },
                end: 0
            });
             base.demo.defaults = {
                end: 0
            };
             export var demo = base.demo;
            
             多级子类例子：
             import {base} from 'perfmjs/base';
             import {demo} from './demo';
            
             base("demo.demo1", {
                init: function(args:any) {
                    this._super('init', args);
                    console.log("demo1 init !!!!" + args);
                    return this;
                },
                test: function() {
                    console.log("test demo!!!!");
                },
                end: 0
             });
             base.demo1.defaults = {
                end: 0
             };
             export var demo1 = base.demo1;
             * @param name e.g. 'dlt','fc.ssq'
             */
            $$ = utils_1.utils.root;
            $$.base = function (name, prototype, parentPrototype, parentDefaults) {
                //name必须全局唯一
                if (name.indexOf('base.') < 0) {
                    name = 'base.' + name;
                }
                var namespace = name.split(".").slice(0, name.split(".").length - 1).join('.');
                name = name.split(".")[name.split(".").length - 1];
                var spaceLen = namespace.split(".").length, spaces = namespace.split(".");
                for (var i = 0; i < spaceLen; i++) {
                    $$[namespace] = (i < 1) ? $$[spaces[0]] : $$[namespace][spaces[i]];
                    parentDefaults = $$.utils.extend({}, parentDefaults, $$[namespace].defaults);
                    parentPrototype = $$.utils.extend(true, {}, parentPrototype, $$[namespace].prototype);
                }
                $$[namespace] = $$[namespace] || {};
                if ($$[name]) {
                    throw new Error('base module [' + name + '] already exists!');
                }
                $$[name] = $$.base[name] = $$[namespace][name] = function (callInitFunc, options) {
                    callInitFunc = (callInitFunc === undefined) ? true : callInitFunc;
                    this.options = $$.utils.extend({}, parentDefaults, $$[namespace][name].defaults, options);
                    (callInitFunc && this.init());
                    if (!this.options['scope']) {
                        this.options['scope'] = 'singleton';
                    }
                    if (this.options['scope'] === 'singleton') {
                        $$[name]['instance'] = this;
                    }
                };
                $$[namespace][name].getName = function () { return name; };
                $$[namespace][name].newInstance = function (args, options) {
                    if ($$[name]['instance']) {
                        return $$[name]['instance'];
                    }
                    var _inst = new $$[namespace][name](false, options);
                    _inst.init(args);
                    return _inst;
                };
                $$[namespace][name].prototype = $$.utils.extend(true, {}, parentPrototype, prototype);
                $$[namespace][name].prototype._super = function (funcName, options) {
                    //FIXME base父类的第一级子类中（base.ssqModule)不可以执行重写的方法：如this._super('init', options);
                    //FIXME this._super('init', options); 只能存在于最终实例化的那1个子类中
                    return parentPrototype[funcName].call(this, options);
                };
            };
            $$.base.prototype = {
                init: function (args) {
                    return this;
                },
                option: function (key, value) {
                    if (typeof key === "string") {
                        if (typeof value === 'undefined') {
                            return this.options[key];
                        }
                        else {
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
            exports_1("base", base = $$.base);
        }
    }
});
