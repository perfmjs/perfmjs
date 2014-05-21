perfmjs.plugin('module3', function($$) {
	$$.base("base.module3", {
		init: function(event) {
			this.eventproxy = event;
			this.createHTML();
			this.eventproxy.on($$.appconfig.events.heartbeat, this.create);
			this.eventproxy.on($$.sysconfig.events.moduleIsReady, function() {$$.logger.debug("module3 is ready!");});
			return this;
		},
		create: function(data) {
			alert("Module3 got the message:" + data.msg);
		},
		createHTML: function() {
			//alert("module3.createHTML");
		},
		end:0
	});
	$$.base.module3.defaults = {
		scope: 'singleton',
		end: 0
	};
});