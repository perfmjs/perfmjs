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
    var CommonService, BetPlanContent;
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
                Object.defineProperty(CommonService.prototype, "betPlanContent", {
                    get: function () {
                        return this.proxy.option('betPlanContent');
                    },
                    enumerable: true,
                    configurable: true
                });
                CommonService.prototype.request = function (url, handler) {
                    this.proxy.request(url, handler);
                };
                Object.defineProperty(CommonService.prototype, "serviceName", {
                    get: function () {
                        return this.proxy.option('serviceName');
                    },
                    set: function (name) {
                        this.proxy.option('serviceName', name);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CommonService.prototype, "names", {
                    get: function () {
                        return this.proxy.option('names');
                    },
                    enumerable: true,
                    configurable: true
                });
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
                names: [],
                serviceName: 'fooo',
                betPlanContent: {},
                scope: 'singleton',
                end: 0
            };
            BetPlanContent = (function () {
                function BetPlanContent() {
                    this._lottery = '';
                    this._content = [];
                    this._betCount = 0;
                    this._betAmount = 0;
                    this._multiple = 1; //倍数
                    this._chaseItemCount = 1; //追号期数
                }
                BetPlanContent.prototype.init = function () {
                    this._lottery = '';
                    this._content = [];
                    this._betCount = 0;
                    this._betAmount = 0;
                    this._multiple = 1;
                    this._chaseItemCount = 1;
                };
                Object.defineProperty(BetPlanContent.prototype, "lottery", {
                    get: function () {
                        return this._lottery;
                    },
                    set: function (game) {
                        this._lottery = game;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BetPlanContent.prototype, "content", {
                    get: function () {
                        return this._content;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BetPlanContent.prototype, "betCount", {
                    get: function () {
                        return this._betCount;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BetPlanContent.prototype, "betAmount", {
                    get: function () {
                        return this._betAmount;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BetPlanContent.prototype, "multiple", {
                    get: function () {
                        return this._multiple;
                    },
                    set: function (multiple) {
                        this._multiple = multiple;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BetPlanContent.prototype, "chaseItemCount", {
                    get: function () {
                        return this._chaseItemCount;
                    },
                    set: function (chaseItemCount) {
                        this._chaseItemCount = chaseItemCount;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BetPlanContent.prototype, "unitPrice", {
                    get: function () {
                        return 2; //注意：dlt可以追加到3元
                    },
                    enumerable: true,
                    configurable: true
                });
                return BetPlanContent;
            })();
        }
    }
});
