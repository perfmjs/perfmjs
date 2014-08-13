perfmjs.plugin('module3', function($$) {
	$$.base("module3", {
		init: function(eventProxy) {
            this.option('eventProxy', eventProxy);
			this.createHTML();
            this.options['eventProxy'].on($$.appconfig.events.heartbeat, this.create);
            this.options['eventProxy'].on($$.sysconfig.events.moduleIsReady, function() {$$.logger.debug("module3 is ready!");});
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
	$$.module3.defaults = {
        eventProxy: {},
		scope: 'singleton',
		end: 0
	};
});