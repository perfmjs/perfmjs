require(['loader'], function(loader) {
    loader.loadModules({mdCallback:function(source, module, combineUrls) {
        if (module === 'common') {
            combineUrls[combineUrls.length] = '/perfmjs/test/widget/webdialog/user-config.js?v=20141127002';
        } else if (module === 'test') {
            combineUrls[combineUrls.length] = '/perfmjs/test/widget/webdialog/spec.js';
        }
    }, afterLoadedCallback: function() {
    }});
});