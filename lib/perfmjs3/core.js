System.register(['perfmjs/utils', 'perfmjs/base', 'perfmjs/app', 'perfmjs/loader'], function(exports_1) {
    var utils_1, base_1, app_1, loader_1;
    var _perfmjs, perfmjs;
    return {
        setters:[
            function (_utils_1) {
                utils_1 = _utils_1;
            },
            function (_base_1) {
                base_1 = _base_1;
            },
            function (_app_1) {
                app_1 = _app_1;
            },
            function (_loader_1) {
                loader_1 = _loader_1;
            }],
        execute: function() {
            _perfmjs = utils_1.utils.root;
            _perfmjs.base = base_1.base;
            _perfmjs.app = app_1.app;
            _perfmjs.loader = loader_1.loader;
            exports_1("perfmjs", perfmjs = _perfmjs);
        }
    }
});
