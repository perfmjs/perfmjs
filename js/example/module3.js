perfmjs.plugin('module3', function($$) {
	$$.base("base.module3", {
		init: function(eventproxy) {
            this.options['eventproxy'] = eventproxy;
			this.createHTML();
            this.options['eventproxy'].on($$.appconfig.events.heartbeat, this.create);
            this.options['eventproxy'].on($$.sysconfig.events.moduleIsReady, function() {$$.logger.debug("module3 is ready!");});
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
        eventproxy: {},
		scope: 'singleton',
		end: 0
	};
});