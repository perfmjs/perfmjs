/**
 * eventProxy
 * 单实例，实现模块间通信的代理类, 每个模块都有自己的 eventProxy，用来降低模块间耦合度，各模块只能直接和eventProxy打交道。
 * @date 2012-11-30
 * import base.js
 */
perfmjs.plugin('eventProxy', function($$) {
	$$.base("eventProxy", {
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
	});
	$$.eventProxy.defaults = {
		scope: 'singleton',
		end: 0
	};
});