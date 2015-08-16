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
};System.register(['angular2/angular2', 'angular2/di', 'angular2/router', 'angular2/src/dom/browser_adapter'], function(exports_1) {
    var angular2_1, di_1, router_1, browser_adapter_1;
    var ToutiaoDetail;
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
            function (_browser_adapter_1) {
                browser_adapter_1 = _browser_adapter_1;
            }],
        execute: function() {
            ToutiaoDetail = (function () {
                function ToutiaoDetail(router) {
                    this.dom = new browser_adapter_1.BrowserDomAdapter();
                    this.router = router;
                    var elem = this.dom.querySelector(document, "body");
                    this.dom.removeClass(elem, "withHeader");
                    this.dom.removeClass(elem, "article");
                    this.dom.removeClass(elem, "utms-toutiao");
                    this.dom.removeClass(elem, "utmm-None");
                    this.dom.removeClass(elem, "utmc-None");
                    this.dom.querySelector(document, "title").textContent = "新闻明细内容";
                }
                ToutiaoDetail.prototype.goto = function (page) {
                    //this.router.navigate("/toutiaoDetail");
                };
                ToutiaoDetail = __decorate([
                    angular2_1.Component({
                        selector: 'toutiao-detail'
                    }),
                    angular2_1.View({
                        templateUrl: "templates/toutiao/detail.html"
                    }),
                    __param(0, di_1.Inject(router_1.Router)), 
                    __metadata('design:paramtypes', [(typeof Router !== 'undefined' && Router) || Object])
                ], ToutiaoDetail);
                return ToutiaoDetail;
            })();
            exports_1("ToutiaoDetail", ToutiaoDetail);
        }
    }
});
