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
};System.register(['angular2/angular2', 'angular2/di', 'angular2/router', 'angular2/src/dom/browser_adapter', 'angular2/src/directives/class', '../services/common.service', 'perfmjs/utils'], function(exports_1) {
    var angular2_1, di_1, router_1, browser_adapter_1, class_1, common_service_1, utils_1;
    var Ssq;
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
            },
            function (_class_1) {
                class_1 = _class_1;
            },
            function (_common_service_1) {
                common_service_1 = _common_service_1;
            },
            function (_utils_1) {
                utils_1 = _utils_1;
            }],
        execute: function() {
            Ssq = (function () {
                function Ssq(router, commonService) {
                    this.redCodes = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
                        "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23",
                        "24", "25", "26", "27", "28", "29", "30", "31", "32", "33"];
                    this.blueCodes = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16"];
                    this.redCodeMap = [];
                    this.blueCodeMap = [];
                    this.selectedRedCodes = {};
                    this.selectedBlueCodes = {};
                    this.router = router;
                    this.dom = new browser_adapter_1.BrowserDomAdapter();
                    var self = this;
                    utils_1.utils.forEach(this.redCodes, function (item, index) {
                        self.redCodeMap[self.redCodeMap.length] = { 'code': item, 'area': 'red', 'selected': false };
                    });
                    utils_1.utils.forEach(this.blueCodes, function (item, index) {
                        self.blueCodeMap[self.blueCodeMap.length] = { 'code': item, 'area': 'blue', 'selected': false };
                    });
                }
                Ssq.prototype.xuanhao = function (code) {
                    code.selected = !code.selected;
                    console.log("code.area:" + code.area);
                };
                /**
                 * 仅作为演示用
                 * @param $event
                 * @param area
                 * @private
                 */
                Ssq.prototype._xuanhao = function ($event, area) {
                    var element = $event.currentTarget;
                    var code = this.dom.getText(element);
                    this.dom.hasClass(element, "active") ? this.dom.removeClass(element, "active") : this.dom.addClass(element, "active");
                    if (this.dom.hasClass(element, "active")) {
                        area === 'red' ? (this.selectedRedCodes[code] = true) : (this.selectedBlueCodes[code] = true);
                    }
                    else {
                        area === 'red' ? (delete this.selectedRedCodes[code]) : (delete this.selectedBlueCodes[code]);
                    }
                    console.log("红球：" + utils_1.utils.keys(this.selectedRedCodes) + "/蓝球：" + utils_1.utils.keys(this.selectedBlueCodes));
                };
                Ssq = __decorate([
                    angular2_1.Component({
                        selector: 'ssq'
                    }),
                    angular2_1.View({
                        templateUrl: 'templates/ssq/ssq.html',
                        directives: [angular2_1.coreDirectives, router_1.RouterOutlet, router_1.RouterLink, class_1.CSSClass]
                    }),
                    __param(0, di_1.Inject(router_1.Router)), 
                    __metadata('design:paramtypes', [(typeof Router !== 'undefined' && Router) || Object, common_service_1.CommonService])
                ], Ssq);
                return Ssq;
            })();
            exports_1("Ssq", Ssq);
        }
    }
});
