require(['loader'], function(loader) {
    loader.loadModules({mdCallback:function(source, module, combineUrls) {
        if (module === 'common') {
            combineUrls[combineUrls.length] = '/perfmjs/test/perfmjs-core/user-config.js?v=20141127002';
        } else if (module === 'ssqmodel') {
            combineUrls[combineUrls.length] = '/perfmjs/test/perfmjs-core/ssq.model.js';
            combineUrls[combineUrls.length] = '/perfmjs/test/perfmjs-core/lott.event.js';
            combineUrls[combineUrls.length] = '/perfmjs/test/perfmjs-core/ssq.opera.js';
        } else if (module === 'test') {
            combineUrls[combineUrls.length] = '/perfmjs/test/perfmjs-core/spec.js';
        }
    }, afterLoadedCallback: function () {
    }});
});