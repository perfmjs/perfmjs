var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};System.register(['angular2/angular2', 'angular2/di', 'angular2/router', './login', './start', './zhuanpan', './dianqiu', './ssq', './SsqBetConfirm'], function(exports_1) {
    var angular2_1, di_1, router_1, login_1, start_1, zhuanpan_1, dianqiu_1, ssq_1, SsqBetConfirm_1;
    var App;
    return {
        setters:[
            function (_angular2_1) {
                angular2_1 = _angular2_1;
            },
            function (_di_1) {
                di_1 = _di_1;
            },
            function (_router_1) {
                router_1 = _router_1;
            },
            function (_login_1) {
                login_1 = _login_1;
            },
            function (_start_1) {
                start_1 = _start_1;
            },
            function (_zhuanpan_1) {
                zhuanpan_1 = _zhuanpan_1;
            },
            function (_dianqiu_1) {
                dianqiu_1 = _dianqiu_1;
            },
            function (_ssq_1) {
                ssq_1 = _ssq_1;
            },
            function (_SsqBetConfirm_1) {
                SsqBetConfirm_1 = _SsqBetConfirm_1;
            }],
        execute: function() {
            App = (function () {
                function App(router) {
                    this.router = router;
                }
                App = __decorate([
                    angular2_1.Component({
                        selector: 'app'
                    }),
                    angular2_1.View({
                        template: "\n    <router-outlet>\n    </router-outlet>",
                        directives: [router_1.RouterOutlet, router_1.RouterLink]
                    }),
                    router_1.RouteConfig([
                        { path: '/', as: 'index', component: start_1.Start, data: { adminOnly: false } },
                        { path: '/login', as: 'login', component: login_1.Login },
                        { path: '/start', as: 'start', component: start_1.Start, data: { adminOnly: true } },
                        { path: '/zhuanpan', as: 'zhuanpan', component: zhuanpan_1.Zhuanpan },
                        { path: '/dianqiu', as: 'dianqiu', component: dianqiu_1.Dianqiu },
                        { path: '/ssq', as: 'ssq', component: ssq_1.Ssq },
                        { path: '/ssqBetConfirm', as: 'ssqBetConfirm', component: SsqBetConfirm_1.SsqBetConfirm }
                    ]),
                    __param(0, di_1.Inject(router_1.Router)), 
                    __metadata('design:paramtypes', [(typeof Router !== 'undefined' && Router) || Object])
                ], App);
                return App;
            })();
            exports_1("App", App);
        }
    }
});
