System.register(['angular2/router', 'angular2/angular2', 'angular2/di', './app', '../services/common-service'], function(exports_1) {
    var router_1, angular2_1, di_1, app_1, common_service_1;
    return {
        setters:[
            function (_router_1) {
                router_1 = _router_1;
            },
            function (_angular2_1) {
                angular2_1 = _angular2_1;
            },
            function (_di_1) {
                di_1 = _di_1;
            },
            function (_app_1) {
                app_1 = _app_1;
            },
            function (_common_service_1) {
                common_service_1 = _common_service_1;
            }],
        execute: function() {
            angular2_1.bootstrap(app_1.App, [
                router_1.routerInjectables,
                common_service_1.CommonService,
                di_1.bind(router_1.LocationStrategy).toClass(router_1.HTML5LocationStrategy)
            ]);
        }
    }
});
