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
};System.register(['angular2/angular2', 'angular2/di', 'angular2/router', '../services/common.service', './zippy'], function(exports_1) {
    var angular2_1, di_1, router_1, common_service_1, zippy_1;
    var Start;
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
            function (_zippy_1) {
                zippy_1 = _zippy_1;
            }],
        execute: function() {
            Start = (function () {
                function Start(router, commonService) {
                    this.myName = 'AngularJS2@爱彩';
                    commonService.serviceName = "app-bbb";
                    this.names = commonService.names;
                    this.router = router;
                }
                Start.prototype.myCtrlMethod = function (inputStr) {
                    console.log('call myControllerMethod:' + inputStr);
                    this.router.navigate('/login');
                };
                Start = __decorate([
                    angular2_1.Component({
                        selector: 'start'
                    }),
                    angular2_1.View({
                        templateUrl: 'templates/start.html',
                        directives: [angular2_1.coreDirectives, router_1.RouterOutlet, router_1.RouterLink, zippy_1.Zippy]
                    }),
                    __param(0, di_1.Inject(router_1.Router)), 
                    __metadata('design:paramtypes', [(typeof Router !== 'undefined' && Router) || Object, common_service_1.CommonService])
                ], Start);
                return Start;
            })();
            exports_1("Start", Start);
        }
    }
});
