perfmjs.plugin('module2', function($$) {
	$$.base("base.module2", {
		init: function(eventProxy) {
            this.options['eventProxy'] = eventProxy;
			this.createHTML();
            this.options['eventProxy'].on($$.appconfig.events.heartbeat, this.create);
            this.options['eventProxy'].on($$.sysconfig.events.moduleIsReady, function() {$$.logger.debug("module2 is ready!");});
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
        eventProxy: {},
		scope: 'singleton',
		end: 0
	};
});