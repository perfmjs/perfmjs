/**
 * 按模块加载加载应用所需的js和css文件
 * sources e.g. [{n:'common',f:'http://s.no100.com/perfmjs/js/core2/include-common.js',t:'js',m:'jq;dlt',d:'http://s.no100.com'}]
 * combineUrls e.g. []
 */
require(['loader'], function(loader) {
    loader.loadModules({name: 'js-comm', type: 'js', mdCallback: function (source, module, combineUrls) {
        if (module === 'async') {
//            combineUrls[combineUrls.length] = '111';
//            combineUrls[combineUrls.length] = '/perfmjs/example/async/async.js';
        }
    }, afterLoadedCallback: function () {
        require(['utils', 'async'], function(utils, async) {
            var deferred = async.defer();
            utils.nextTick(function() {
                deferred.resolve('ok');
            });
            deferred.promise.then(function(result) {
                alert('result=' + result);
            }, function(result) {
                alert('error:' + result);
            });
        });
    }});
});