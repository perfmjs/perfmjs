System.register(['perfmjs/utils'], function(exports_1) {
    var utils_1;
    var base, perfmjs;
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
            utils_1.perfmjs.base = function (name, prototype, parentPrototype, parentDefaults) {
                //name必须全局唯一
                if (name.indexOf('base.') < 0) {
                    name = 'base.' + name;
                }
                var namespace = name.split(".").slice(0, name.split(".").length - 1).join('.');
                name = name.split(".")[name.split(".").length - 1];
                var spaceLen = namespace.split(".").length, spaces = namespace.split(".");
                for (var i = 0; i < spaceLen; i++) {
                    utils_1.perfmjs[namespace] = (i < 1) ? utils_1.perfmjs[spaces[0]] : utils_1.perfmjs[namespace][spaces[i]];
                    parentDefaults = utils_1.perfmjs.utils.extend({}, parentDefaults, utils_1.perfmjs[namespace].defaults);
                    parentPrototype = utils_1.perfmjs.utils.extend(true, {}, parentPrototype, utils_1.perfmjs[namespace].prototype);
                }
                utils_1.perfmjs[namespace] = utils_1.perfmjs[namespace] || {};
                if (utils_1.perfmjs[name]) {
                    throw new Error('base module [' + name + '] already exists!');
                }
                utils_1.perfmjs[name] = utils_1.perfmjs.base[name] = utils_1.perfmjs[namespace][name] = function (callInitFunc, options) {
                    callInitFunc = (callInitFunc === undefined) ? true : callInitFunc;
                    this.options = utils_1.perfmjs.utils.extend({}, parentDefaults, utils_1.perfmjs[namespace][name].defaults, options);
                    (callInitFunc && this.init());
                    if (!this.options['scope']) {
                        this.options['scope'] = 'singleton';
                    }
                    if (this.options['scope'] === 'singleton') {
                        utils_1.perfmjs[name]['instance'] = this;
                    }
                };
                utils_1.perfmjs[namespace][name].getName = function () { return name; };
                utils_1.perfmjs[namespace][name].newInstance = function (args, options) {
                    if (utils_1.perfmjs[name]['instance']) {
                        return utils_1.perfmjs[name]['instance'];
                    }
                    var _inst = new utils_1.perfmjs[namespace][name](false, options);
                    _inst.init(args);
                    return _inst;
                };
                utils_1.perfmjs[namespace][name].prototype = utils_1.perfmjs.utils.extend(true, {}, parentPrototype, prototype);
                utils_1.perfmjs[namespace][name].prototype._super = function (funcName, options) {
                    //FIXME base父类的第一级子类中（base.ssqModule)不可以执行重写的方法：如this._super('init', options);
                    //FIXME this._super('init', options); 只能存在于最终实例化的那1个子类中
                    return parentPrototype[funcName].call(this, options);
                };
            };
            utils_1.perfmjs.base.prototype = {
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
            utils_1.perfmjs.base.defaults = {
                scope: 'singleton',
                end: 0
            };
            exports_1("base", base = utils_1.perfmjs.base);
            exports_1("perfmjs", perfmjs = utils_1.perfmjs);
        }
    }
});
