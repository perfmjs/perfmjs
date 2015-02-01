require([ 'loader'], function(loader) {
    loader.loadModules({mdCallback: function (source, module, combineUrls) {
        if (module === 'common') {
            combineUrls[combineUrls.length] = '/perfmjs/example/bootstrap/user-config.js';
        }
    }, afterLoadedCallback: function() {
        require(['jquery', 'bootstrap'], function($, bootstrap) {
        });
    }});
});