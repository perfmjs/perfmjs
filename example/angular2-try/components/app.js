if (typeof __decorate !== "function") __decorate = function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
if (typeof __metadata !== "function") __metadata = function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
if (typeof __param !== "function") __param = function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var angular2_1 = require('angular2/angular2');
var di_1 = require('angular2/di');
var router_1 = require('angular2/router');
var login_1 = require('./login');
var start_1 = require('./start');
var common_service_1 = require('../services/common-service');
var App = (function () {
    function App(router, commonService) {
        this.router = router;
        this.commonService = commonService;
        this.commonService.setRootRouter(this.router);
        this.router.navigate('/login');
    }
    App = __decorate([
        angular2_1.Component({
            selector: 'app',
            appInjector: [router_1.routerInjectables, common_service_1.CommonService]
        }),
        angular2_1.View({
            template: "\n    <router-outlet>\n        <a router-link=\"start\">start</a>\n        <a router-link=\"login\">login</a>\n    </router-outlet>",
            directives: [router_1.RouterOutlet, router_1.RouterLink]
        }),
        router_1.RouteConfig([
            { path: '/11', as: 'foo', component: login_1.Login },
            { path: '/login', as: 'login', component: login_1.Login },
            { path: '/start', as: 'start', component: start_1.Start }
        ]),
        __param(0, di_1.Inject(router_1.Router)),
        __param(1, di_1.Inject(common_service_1.CommonService)), 
        __metadata('design:paramtypes', [(typeof Router !== 'undefined' && Router) || Object, common_service_1.CommonService])
    ], App);
    return App;
})();
exports.App = App;
