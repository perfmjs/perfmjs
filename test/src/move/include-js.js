/**
 * 按模块加载加载应用所需的js和css文件
 * sources e.g. [{n:'common',f:'http://s.no100.com/perfmjs/js/core2/include-common.js',t:'js',m:'jq;dlt',d:'http://s.no100.com'}]
 * combineUrls e.g. []
 * import loadres.js
 */
require(['loader'], function(loader) {
    loader.loadModules({name:'js-comm', type:'js', mdCallback:function(source, module, combineUrls) {
        if (module === 'ssqmodel') {
            combineUrls[combineUrls.length] = '/perfmjs/test/src/move/ssq.model.js';
            combineUrls[combineUrls.length] = '/perfmjs/test/src/move/lott.event.js';
            combineUrls[combineUrls.length] = '/perfmjs/test/src/move/ssq.opera.js';
            combineUrls[combineUrls.length] = '/perfmjs/test/src/move/ssqfsm.js';
        } else if (module === 'test') {
            combineUrls[combineUrls.length] = '/perfmjs/test/spec/move/move-spec.js';
        }
    }});
});