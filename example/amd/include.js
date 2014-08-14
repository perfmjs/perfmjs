/**
 * 按模块加载加载应用所需的js和css文件
 * sources e.g. [{n:'common',f:'http://s.no100.com/perfmjs/js/core2/include-common.js',t:'js',m:'jq;dlt',d:'http://s.no100.com'}]
 * combineUrls e.g. []
 */
require(['loader'], function(loader) {
    loader.loadModules({name: 'js-comm', type: 'js', mdCallback: function (source, module, combineUrls) {
        if (module === 'amd') {
            //combineUrls[combineUrls.length] = 'http://code.jquery.com/jquery-1.11.0.min.js';
            combineUrls[combineUrls.length] = '/perfmjs/example/amd/amd1/myModule3.js';
            combineUrls[combineUrls.length] = '/perfmjs/example/amd/amd1/myModule2.js';
            combineUrls[combineUrls.length] = '/perfmjs/example/amd/main.js';
        } else if (module === 'foo') {
            combineUrls[combineUrls.length] = '/perfmjs/example/amd/foo.js';
            combineUrls[combineUrls.length] = '/perfmjs/example/amd/bar.js';
        }
    }, afterLoadedCallback: function () {
        //alert('callback after loaded amd modules!');
        if (typeof define === "function" && define.amd && define.amd['async']) {
            define.config.baseUrl = 'http://localhost:63342/perfmjs/example/amd/';
            define.config.alias['jquery'] = 'plugins/jquery.min';
        }
        require(['perfmjs', 'app', 'bar'], function ($$, app, bar) {
            app.register("bar", bar);
            app.start('bar');
            alert(bar.instance.sayHello('bar'));
        });
    }});
});