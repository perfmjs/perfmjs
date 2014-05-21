perfmjs.plugin('module2', function($$) {
	$$.base("base.module2", {
		init: function(event) {
			this.eventproxy = event;
			this.createHTML();
			this.eventproxy.on($$.appconfig.events.heartbeat, this.create);
			this.eventproxy.on($$.sysconfig.events.moduleIsReady, function() {$$.logger.debug("module2 is ready!");});
			return this;
		},
		create: function(data) {
			alert("Module2 got the message:" + data.msg);
		},
		createHTML: function() {
			//alert("module2 called createHTML");
		},
		end:0
	});
	$$.base.module2.defaults = {
		scope: 'singleton',
		end: 0
	};
});