!(function() {
    perfmjs.loader.loadModules({mdCallback:function(source, module, combineUrls) {
        //按模块加载资源文件
        if (module === 'common') {
            //do nothing
        } else if (module === 'jquery') {
            combineUrls[combineUrls.length] = 'js/zhuanpan/jquery.min.js';
        } else if (module === 'zhuanpan') {
            combineUrls[combineUrls.length] = 'js/zhuanpan/jquery.rotate.min.js';
            combineUrls[combineUrls.length] = 'js/zhuanpan/jcMarquee.js';
        } else if (module === 'dianqiu') {
            combineUrls[combineUrls.length] = 'js/dianqiu/scrolltext.js';
        }
    }, afterLoadedCallback:function() {
        perfmjs.utils.ready(function($$, app) {
            if (typeof $ !== 'undefined') {
                System.register('perfmjs/jquery', [], function ($__export) {
                    var JQuery;
                    return {
                        setters: [
                        ],
                        execute: function () {
                            JQuery = $;
                            $__export("JQuery", JQuery);
                        }
                    };
                });
            }
            System.import('./components/index');
        });
    }});
})();