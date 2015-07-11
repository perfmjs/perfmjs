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
            //System.config({
            //    "map": {
            //        "angular2": "npm:angular2@2.0.0-alpha.27",
            //        "typescript": "github:mhegazy/typescript@v1.5-beta2",
            //        "github:jspm/nodelibs-assert@0.1.0": {
            //            "assert": "npm:assert@1.3.0"
            //        },
            //        "github:jspm/nodelibs-path@0.1.0": {
            //            "path-browserify": "npm:path-browserify@0.0.0"
            //        },
            //        "github:jspm/nodelibs-process@0.1.1": {
            //            "process": "npm:process@0.10.1"
            //        },
            //        "github:jspm/nodelibs-url@0.1.0": {
            //            "url": "npm:url@0.10.3"
            //        },
            //        "github:jspm/nodelibs-util@0.1.0": {
            //            "util": "npm:util@0.10.3"
            //        },
            //        "npm:angular2@2.0.0-alpha.27": {
            //            "fs": "github:jspm/nodelibs-fs@0.1.2",
            //            "path": "github:jspm/nodelibs-path@0.1.0",
            //            "process": "github:jspm/nodelibs-process@0.1.1",
            //            "reflect-metadata": "npm:reflect-metadata@0.1.0",
            //            "rx": "npm:rx@2.5.1",
            //            "url": "github:jspm/nodelibs-url@0.1.0",
            //            "zone.js": "npm:zone.js@0.5.1"
            //        },
            //        "npm:assert@1.3.0": {
            //            "util": "npm:util@0.10.3"
            //        },
            //        "npm:inherits@2.0.1": {
            //            "util": "github:jspm/nodelibs-util@0.1.0"
            //        },
            //        "npm:path-browserify@0.0.0": {
            //            "process": "github:jspm/nodelibs-process@0.1.1"
            //        },
            //        "npm:punycode@1.3.2": {
            //            "process": "github:jspm/nodelibs-process@0.1.1"
            //        },
            //        "npm:reflect-metadata@0.1.0": {
            //            "assert": "github:jspm/nodelibs-assert@0.1.0"
            //        },
            //        "npm:rx@2.5.1": {
            //            "process": "github:jspm/nodelibs-process@0.1.1"
            //        },
            //        "npm:url@0.10.3": {
            //            "assert": "github:jspm/nodelibs-assert@0.1.0",
            //            "punycode": "npm:punycode@1.3.2",
            //            "querystring": "npm:querystring@0.2.0",
            //            "util": "github:jspm/nodelibs-util@0.1.0"
            //        },
            //        "npm:util@0.10.3": {
            //            "inherits": "npm:inherits@2.0.1",
            //            "process": "github:jspm/nodelibs-process@0.1.1"
            //        },
            //        "npm:zone.js@0.5.1": {
            //            "process": "github:jspm/nodelibs-process@0.1.1"
            //        }
            //    }
            //});
            System.import('./components/index');
        });
    }});
})();