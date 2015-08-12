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
};System.register(['angular2/di', 'perfmjs/base'], function(exports_1) {
    var di_1, base_1;
    var CommonService;
    return {
        setters:[
            function (_di_1) {
                di_1 = _di_1;
            },
            function (_base_1) {
                base_1 = _base_1;
            }],
        execute: function() {
            CommonService = (function () {
                function CommonService() {
                }
                CommonService.prototype.request = function (url, handler) {
                    this.proxy.request(url, handler);
                };
                Object.defineProperty(CommonService.prototype, "proxy", {
                    get: function () {
                        return base_1.base.commonService.newInstance();
                    },
                    enumerable: true,
                    configurable: true
                });
                CommonService = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], CommonService);
                return CommonService;
            })();
            exports_1("CommonService", CommonService);
            base_1.base("commonService", {
                init: function (args) {
                    this.option('names', ["Aarav", "Martin", "Shannon", "Ariana", "Kai"]);
                    this.option('betPlanContent', new BetPlanContent());
                    return this;
                },
                request: function (url, handler) {
                    fetch(url).then(function (res) { return res.json(); })
                        .then(function (json) {
                        handler(json);
                    }).catch(function (ex) {
                        console.log('request:' + url + ' failed:', ex);
                    });
                },
                end: 0
            });
            base_1.base.commonService.defaults = {
                scope: 'singleton',
                end: 0
            };
        }
    }
});
