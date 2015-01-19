require(['loader'], function(loader) {
    loader.loadModules({mdCallback:function(source, module, combineUrls) {
        if (module === 'common') {
            combineUrls[combineUrls.length] = '/perfmjs/test/widget/angular/user-config.js?v=20141127002';
        } else if (module === 'test') {
            combineUrls[combineUrls.length] = '/perfmjs/example/angular/angular.js';
            combineUrls[combineUrls.length] = '/perfmjs/example/angular/angular-route.js';
            combineUrls[combineUrls.length] = '/perfmjs/test/widget/angular/angular-mocks.js';
            combineUrls[combineUrls.length] = '/perfmjs/test/widget/angular/spec.js';
        }
    }, afterLoadedCallback: function() {
    }});
});