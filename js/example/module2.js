perfmjs.plugin('module2', function($$) {
	$$.base("base.module2", {
		init: function(eventproxy) {
            this.options['eventproxy'] = eventproxy;
			this.createHTML();
            this.options['eventproxy'].on($$.appconfig.events.heartbeat, this.create);
            this.options['eventproxy'].on($$.sysconfig.events.moduleIsReady, function() {$$.logger.debug("module2 is ready!");});
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
        eventproxy: {},
		scope: 'singleton',
		end: 0
	};
});