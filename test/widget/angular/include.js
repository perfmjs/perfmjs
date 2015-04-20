require(['loader'], function(loader) {
    loader.loadModules({mdCallback:function(source, module, combineUrls) {
        if (module === 'common') {
            combineUrls[combineUrls.length] = '/perfmjs/lib/perfmjs/global-config.js?v=2015042003';
            combineUrls[combineUrls.length] = '/perfmjs/test/widget/angular/user-config.js?v=2015042001';
        } else if (module === 'test') {
            combineUrls[combineUrls.length] = '/perfmjs/test/widget/angular/spec.js';
        }
    }, afterLoadedCallback: function() {
        require(['angular-test-spec', 'webdialog'], function(spec, webdialog) {
            webdialog({title:'this is a dialog'});
        });
    }});
});