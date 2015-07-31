!(function() {
    perfmjs.includeRes.loadModules({mdCallback:function(source, module, combineUrls) {
        //按模块加载资源文件
        if (module === 'common') {
            combineUrls[combineUrls.length] = 'libs/global.ref.ts';
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
                        Perfmjs = $$
                        $__export("Perfmjs", Perfmjs);
                    }
                };
            });
            System.import('./components/index').catch(console.log.bind(console));
        });
    }});
})();