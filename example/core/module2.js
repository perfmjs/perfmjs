perfmjs.plugin('module2', function($$) {
	$$.base("module2", {
		init: function(eventProxy) {
            this.option('eventProxy', eventProxy);
			this.createHTML();
            this.options['eventProxy'].on($$.appconfig.events.heartbeat, this.create);
            this.options['eventProxy'].on($$.sysConfig.events.moduleIsReady, function() {$$.logger.debug("module2 is ready!");});
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
	$$.module2.defaults = {
        eventProxy: {},
		scope: 'singleton',
		end: 0
	};
});