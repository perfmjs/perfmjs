require([ 'loader'], function(loader) {
    loader.loadModules({mdCallback: function (source, module, combineUrls) {
        if (module === 'common') {
            combineUrls[combineUrls.length] = '/perfmjs/example/amd/user-config.js';
        } else if (module === 'amd') {
            combineUrls[combineUrls.length] = '/perfmjs/example/amd/amd1/myModule3.js';
            combineUrls[combineUrls.length] = '/perfmjs/example/amd/amd1/myModule2.js';
            combineUrls[combineUrls.length] = '/perfmjs/example/amd/main.js';
        }
    }, afterLoadedCallback: function () {
        require(['jquery', 'utils', 'app', 'bar', 'myModule', 'backbone', 'angular'], function ($, utils, app, bar, myModule, backbone, angular) {
            console.log("backbone=" + Backbone.VERSION);
            console.log("angular=" + angular);
            console.log('SKYJS版本/Amd获取jQuery的版本：' + utils.version + '/' + $.fn.jquery);
            app.registerAndStart(bar);
            console.log(bar.instance.sayHello('bar'));
            console.log('main: ' + myModule.getFoo());
        });
    }});
});