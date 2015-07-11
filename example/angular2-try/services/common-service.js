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
var di_1 = require('angular2/di');
var core_1 = require('perfmjs/core');
var CommonService = (function () {
    function CommonService() {
        this.rootRouter = core_1.Perfmjs.globalRef.newInstance().option('rootRouter');
        this.names = ["Aarav2", "Martin1", "Shannon1", "Ariana1", "Kai33"];
    }
    CommonService.prototype.getRootRouter = function () {
        return this.rootRouter;
    };
    CommonService.prototype.setRootRouter = function (rootRouter) {
        this.rootRouter = rootRouter;
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
//export let datacontextInjectables = [
//    httpInjectables,
//    Datacontext
//]; 
