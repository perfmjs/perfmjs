require(['loader'], function(loader) {
    loader.loadModules({mdCallback:function(source, module, combineUrls) {
		if (module === 'foo') {
			combineUrls[combineUrls.length] = '/perfmjs/lib/third-part-libs/jquery/jquery-1.11.1.min.js';
		}
	}, afterLoadedCallback:function() {
    }});
});