!(function() {
    perfmjs.includeRes.loadModules({mdCallback:function(source, module, combineUrls) {
        //按模块加载资源文件
        if (module === 'common') {
            combineUrls[combineUrls.length] = 'libs/global-ref.js';
        } else if (module === 'jquery') {
            combineUrls[combineUrls.length] = 'js/zhuanpan/jquery.min.js';
        } else if (module === 'zhuanpan') {
            combineUrls[combineUrls.length] = 'js/zhuanpan/jquery.rotate.min.js';
            combineUrls[combineUrls.length] = 'js/zhuanpan/jcMarquee.js';
        } else if (module === 'dianqiu') {
            combineUrls[combineUrls.length] = 'js/dianqiu/scrolltext.js';
        }
    }, afterLoadedCallback:function() {
        perfmjs.ready(function($$, app) {
            app.registerAndStart($$.globalRef);
            System.register('perfmjs/core', [], function($__export) {
                var Perfmjs;
                return {
                    setters: [
                        function($__m) {
                            Perfmjs = $__m.Perfmjs;
                            $__export('Perfmjs', $__m.Perfmjs);
                        }
                    ],
                    execute: function() {
                        Perfmjs = $$;
                        $__export("Perfmjs", Perfmjs);
                    }
                };
            });
            if (typeof $ !== 'undefined') {
                System.register('perfmjs/jquery', [], function ($__export) {
                    var JQuery;
                    return {
                        setters: [
                            function ($__m) {
                                JQuery = $__m.JQuery;
                                $__export('JQuery', $__m.JQuery);
                            }
                        ],
                        execute: function () {
                            JQuery = $;
                            $__export("JQuery", JQuery);
                        }
                    };
                });
            }

            //System.config({
            //    "baseURL": "/perfmjs/example/angular2-try/",
            //    "defaultJSExtensions": true,
            //    "transpiler": "typescript",
            //    "paths": {
            //        "github:*": "jspm_packages/github/*",
            //        "npm:*": "jspm_packages/npm/*"
            //    }
            //});
            System.import('./components/index');
        });
    }});
})();