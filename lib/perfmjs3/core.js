System.register(['perfmjs/utils'], function(exports_1) {
    var utils_1;
    var _perfmjs, perfmjs;
    return {
        setters:[
            function (_utils_1) {
                utils_1 = _utils_1;
            }],
        execute: function() {
            //import {base} from 'perfmjs/base';
            //import {app} from 'perfmjs/app';
            //import {loader} from 'perfmjs/loader';
            _perfmjs = utils_1.utils.root;
            //_perfmjs.base = base;
            //_perfmjs.app = app;
            //_perfmjs.loader = loader;
            exports_1("perfmjs", perfmjs = _perfmjs);
        }
    }
});
