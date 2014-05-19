perfmjs.plugin('sysconfig', function($$) {
	$$.sysconfig.events = {
		lazyLoad: 'perfmjs/lazyload',
		moduleIsReady: 'perfmjs.ready',
		end:0
	};
});