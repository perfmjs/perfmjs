/**
 * app core 作用：
 * 1）控制各个模块的生命周期，创建及销毁
 * 2）允许模块间的通信
 * 3）负责对系统错误的处理
 * @date 2012-11-30
 * import logger.js
 * import eventProxy.js
 * import base.js
 */
perfmjs.plugin('app', function($$) {
	$$.base("app", {
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
		register: function(moduleId, creator, opt) {
			if (opt == null) opt = {};
			try {
			  this._addModule(moduleId, creator, opt);
			  if(opt.init){
					return this.start(moduleId);
			  }
			  return moduleId;
			} catch (ex) {
				if(!DEBUG_MOD){
					perfmjs.logger.error("could not register " + moduleId + " because: " + ex.message);
				}else{
					throw ex;
				}
			  return undefined;
			}
		},

        /**
         * register动作与start动作合二为一
         * @param moduleId
         * @param creator
         * @param opt
         */
        registerAndStart: function(moduleId, creator, opt) {
            return this.start(this.register(moduleId, creator, opt));
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
            if (!moduleId) {
                return false;
            }
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
        return module.creator.newInstance($$.eventProxy.newInstance(), opt);

			//debug模式下try catch不起作用，交由浏览器自己处理错误。
			//online模式下可以把错误信息记录在日志服务器上。
//          var name, method;
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
	});
	$$.app.defaults = {
		scope: 'singleton',
		end: 0
	};
});