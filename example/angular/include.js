require([ 'loader'], function(loader) {
    loader.loadModules({mdCallback: function (source, module, combineUrls) {
        if (module === 'common') {
            combineUrls[combineUrls.length] = '/perfmjs/example/angular/user-config.js';
        }
    }, afterLoadedCallback: function () {
        require(['angular', 'ng-app'], function (angular) {
        });
    }});
});