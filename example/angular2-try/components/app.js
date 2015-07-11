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
var zhuanpan_1 = require('./zhuanpan');
var dianqiu_1 = require('./dianqiu');
var common_service_1 = require('../services/common-service');
var App = (function () {
    function App(router, commonService) {
        this.router = router;
        this.commonService = commonService;
        this.commonService.setRootRouter(this.router);
        this.router.navigate('/start');
    }
    App = __decorate([
        angular2_1.Component({
            selector: 'app',
            appInjector: [router_1.routerInjectables, common_service_1.CommonService]
        }),
        angular2_1.View({
            template: "\n    <router-outlet>\n        <a [router-link]=\"['/start']\">\u9996\u9875</a>\n        <a [router-link]=\"['/login']\">\u767B\u5F55</a>\n        <a [router-link]=\"['/zhuanpan']\">\u8F6C\u76D8</a>\n        <a [router-link]=\"['/dianqiu']\">\u70B9\u7403</a>\n    </router-outlet>",
            directives: [router_1.RouterOutlet, router_1.RouterLink]
        }),
        router_1.RouteConfig([
            //{path: '/',    as: 'start',   component: Start},
            { path: '/login', as: 'login', component: login_1.Login },
            { path: '/start', as: 'start', component: start_1.Start },
            { path: '/zhuanpan', as: 'zhuanpan', component: zhuanpan_1.Zhuanpan },
            { path: '/dianqiu', as: 'dianqiu', component: dianqiu_1.Dianqiu }
        ]),
        __param(0, di_1.Inject(router_1.Router)), 
        __metadata('design:paramtypes', [(typeof Router !== 'undefined' && Router) || Object, common_service_1.CommonService])
    ], App);
    return App;
})();
exports.App = App;
