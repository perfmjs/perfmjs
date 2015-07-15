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
var browser_adapter_1 = require('angular2/src/dom/browser_adapter');
var common_service_1 = require('../services/common-service');
var core_1 = require('perfmjs/core');
var Ssq = (function () {
    function Ssq(router, commonService) {
        this.redCodes = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
            "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23",
            "24", "25", "26", "27", "28", "29", "30", "31", "32", "33"];
        this.blueCodes = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16"];
        this.selectedRedCodes = {};
        this.selectedBlueCodes = {};
        this.router = router;
        //BrowserDomAdapter.makeCurrent();
        this.dom = new browser_adapter_1.BrowserDomAdapter();
    }
    Ssq.prototype.xuanhao = function ($event, area) {
        var element = $event.currentTarget;
        var code = this.dom.getText(element);
        this.dom.hasClass(element, "active") ? this.dom.removeClass(element, "active") : this.dom.addClass(element, "active");
        if (this.dom.hasClass(element, "active")) {
            area === 'red' ? (this.selectedRedCodes[code] = true) : (this.selectedBlueCodes[code] = true);
        }
        else {
            area === 'red' ? (delete this.selectedRedCodes[code]) : (delete this.selectedBlueCodes[code]);
        }
        console.log("红球：" + core_1.Perfmjs.utils.keys(this.selectedRedCodes) + "/蓝球：" + core_1.Perfmjs.utils.keys(this.selectedBlueCodes));
    };
    Ssq = __decorate([
        angular2_1.Component({
            selector: 'ssq',
            appInjector: [router_1.routerInjectables, common_service_1.CommonService]
        }),
        angular2_1.View({
            templateUrl: 'templates/ssq/ssq.html',
            directives: [angular2_1.coreDirectives, router_1.RouterOutlet, router_1.RouterLink]
        }),
        __param(0, di_1.Inject(router_1.Router)), 
        __metadata('design:paramtypes', [(typeof Router !== 'undefined' && Router) || Object, common_service_1.CommonService])
    ], Ssq);
    return Ssq;
})();
exports.Ssq = Ssq;
