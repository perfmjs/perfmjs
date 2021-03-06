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
};System.register(['angular2/angular2', 'angular2/di', 'angular2/router', 'angular2/src/dom/browser_adapter', 'perfmjs/utils'], function(exports_1) {
    var angular2_1, di_1, router_1, browser_adapter_1, utils_1;
    var ToutiaoIndex;
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
            function (_utils_1) {
                utils_1 = _utils_1;
            }],
        execute: function() {
            ToutiaoIndex = (function () {
                function ToutiaoIndex(router) {
                    this.dom = new browser_adapter_1.BrowserDomAdapter();
                    this.channelsMap = new Map();
                    this.cmsList = [];
                    this.router = router;
                    var elem = this.dom.querySelector(document, "body");
                    this.dom.addClass(elem, "withHeader");
                    this.dom.addClass(elem, "article");
                    this.dom.addClass(elem, "utms-toutiao");
                    this.dom.addClass(elem, "utmm-None");
                    this.dom.addClass(elem, "utmc-None");
                    this.dom.querySelector(document, "title").textContent = "悠阅空间 - 你要的知识和经验，才是头条！";
                    this.queryAllChannels();
                }
                ToutiaoIndex.prototype.refresh = function () {
                    window.location.reload();
                };
                ToutiaoIndex.prototype.queryAllChannels = function () {
                    var self = this;
                    utils_1.utils.fetch({
                        url: 'http://localhost:8888/youyue/channel/all',
                        method: 'GET'
                    }).then(function (jsonData) {
                        if (jsonData.status === 'success') {
                            var scrollLefts = '0,0,0,-19,34,87,140,193,246,299,352,426,426,426,426'.split(',');
                            utils_1.utils.forEach(jsonData.result.list, function (item, index) {
                                self.channelsMap.set(item, { 'name': item, 'selected': index < 1 ? true : false, 'scrollLeft': (index < scrollLefts.length - 1) ? scrollLefts[index] : 0 });
                            });
                        }
                    });
                    this.loadCms('科技');
                };
                ToutiaoIndex.prototype.gotoCms = function (cmsId) {
                    this.router.navigate("/detail/" + cmsId);
                };
                ToutiaoIndex.prototype.gotoLoginPage = function () {
                    this.router.navigate("/login/index");
                };
                ToutiaoIndex.prototype.loadCms = function (channel) {
                    var self = this;
                    utils_1.utils.fetch({
                        url: 'http://localhost:8888/youyue/cms/channel/' + channel
                    }).then(function (jsonData) {
                        if (jsonData.status === 'success') {
                            self.cmsList = jsonData.result.list;
                        }
                    });
                };
                ToutiaoIndex = __decorate([
                    angular2_1.Component({
                        selector: 'toutiao-index'
                    }),
                    angular2_1.View({
                        templateUrl: "templates/toutiao/index.html",
                        directives: [angular2_1.CORE_DIRECTIVES]
                    }),
                    __param(0, di_1.Inject(router_1.Router)), 
                    __metadata('design:paramtypes', [(typeof Router !== 'undefined' && Router) || Object])
                ], ToutiaoIndex);
                return ToutiaoIndex;
            })();
            exports_1("ToutiaoIndex", ToutiaoIndex);
        }
    }
});
