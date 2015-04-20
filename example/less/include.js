require([ 'loader'], function(loader) {
    loader.loadModules({mdCallback: function (source, module, combineUrls) {
        if (module === 'common') {
            combineUrls[combineUrls.length] = '/perfmjs/example/less/user-config.js';
            combineUrls[combineUrls.length] = '/perfmjs/example/less/less.js';
        }
    }, afterLoadedCallback: function() {
        require(['less'], function(less) {
        });
    }});
});