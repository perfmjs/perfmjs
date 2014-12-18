/**
 * 按模块加载加载应用所需的js和css文件
 * sources e.g. [{n:'common',f:'http://s.no100.com/perfmjs/js/core2/include-common.js',t:'js',m:'jq;dlt',d:'http://s.no100.com'}]
 * combineUrls e.g. []
 */
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
        require(['jquery', 'utils', 'app', 'bar', 'myModule'], function ($, utils, app, bar, myModule) {
            console.log('SKYJS版本/Amd获取jQuery的版本：' + utils.version + '/' + $.fn.jquery);
            app.registerAndStart(bar);
            console.log(bar.instance.sayHello('bar'));
            console.log('main: ' + myModule.getFoo());
        });
    }});
});