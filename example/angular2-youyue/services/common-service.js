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
var di_1 = require('angular2/di');
var core_1 = require('perfmjs/core');
var CommonService = (function () {
    function CommonService() {
        this.globalRef = core_1.Perfmjs.globalRef.newInstance();
    }
    CommonService.prototype.getRootRouter = function () {
        return this.globalRef.option('rootRouter');
    };
    CommonService.prototype.setRootRouter = function (rootRouter) {
        this.globalRef.option('rootRouter', rootRouter);
    };
    CommonService.prototype.gotoMainPage = function () {
        this.getRootRouter().navigate("/main");
    };
    CommonService.prototype.gotoDetailPage = function () {
        this.getRootRouter().navigate("/detail");
    };
    CommonService.prototype.request = function (url, handler) {
        fetch(url).then(function (res) { return res.json(); })
            .then(function (json) {
            handler(json);
        }).catch(function (ex) {
            console.log('request:' + url + ' failed:', ex);
        });
    };
    CommonService = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], CommonService);
    return CommonService;
})();
exports.CommonService = CommonService;
