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
};System.register(['angular2/di'], function(exports_1) {
    var di_1;
    var CommonService;
    return {
        setters:[
            function (_di_1) {
                di_1 = _di_1;
            }],
        execute: function() {
            CommonService = (function () {
                function CommonService() {
                }
                CommonService = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], CommonService);
                return CommonService;
            })();
            exports_1("CommonService", CommonService);
        }
    }
});
