/**
 * 按模块加载加载应用所需的js和css文件
 * sources e.g. [{n:'common',f:'http://s.no100.com/perfmjs/js/core2/include-common.js',t:'js',m:'jq;dlt',d:'http://s.no100.com'}]
 * combineUrls e.g. []
 */
require(['utils', 'loader'], function(utils, loader) {
    loader.loadModules({name: 'js-comm', type: 'js', mdCallback: function (source, module, combineUrls) {
        if (module === 'amd') {
            combineUrls[combineUrls.length] = '/perfmjs/example/amd/amd1/myModule3.js';
            combineUrls[combineUrls.length] = '/perfmjs/example/amd/amd1/myModule2.js';
            combineUrls[combineUrls.length] = '/perfmjs/example/amd/main.js';
        } else if (module === 'foo') {
//            combineUrls[combineUrls.length] = '/perfmjs/example/amd/bar.js';
//            combineUrls[combineUrls.length] = '/perfmjs/example/amd/foo.js';
        }
    }, afterLoadedCallback: function () {
        if (typeof define === "function" && define.amd && define.amd['async']) {
            define.config.baseUrl = 'http://localhost:63342/perfmjs/example/amd/';
            define.config.alias['jquery'] = 'plugins/jquery.min';
        }
        require(['app', 'bar', 'myModule'], function (app, bar, myModule) {
            app.registerAndStart(bar);
            console.log(bar.instance.sayHello('bar'));
            console.log('main: ' + myModule.getFoo());
        });
    }});
});