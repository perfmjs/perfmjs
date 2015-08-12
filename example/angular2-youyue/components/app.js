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
};System.register(['angular2/angular2', 'angular2/di', 'angular2/router', '../services/common-service', './main', './detail', './ToutiaoIndex'], function(exports_1) {
    var angular2_1, di_1, router_1, common_service_1, main_1, detail_1, ToutiaoIndex_1;
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
            function (_common_service_1) {
                common_service_1 = _common_service_1;
            },
            function (_main_1) {
                main_1 = _main_1;
            },
            function (_detail_1) {
                detail_1 = _detail_1;
            },
            function (_ToutiaoIndex_1) {
                ToutiaoIndex_1 = _ToutiaoIndex_1;
            }],
        execute: function() {
            App = (function () {
                function App(router, commonService) {
                    this.router = router;
                    this.commonService = commonService;
                    this.router.navigate('/');
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
                        { path: '/', as: 'index', component: ToutiaoIndex_1.ToutiaoIndex },
                        { path: '/index', as: 'main', component: main_1.Main },
                        { path: '/detail', as: 'detail', component: detail_1.Detail },
                        { path: '/toutiaoIndex', as: 'toutiaoIndex', component: ToutiaoIndex_1.ToutiaoIndex }
                    ]),
                    __param(0, di_1.Inject(router_1.Router)), 
                    __metadata('design:paramtypes', [(typeof Router !== 'undefined' && Router) || Object, common_service_1.CommonService])
                ], App);
                return App;
            })();
            exports_1("App", App);
        }
    }
});
