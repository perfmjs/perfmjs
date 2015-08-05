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
};System.register(['angular2/angular2', 'angular2/di', 'angular2/router', 'angular2/src/directives/class', 'angular2/src/change_detection/change_detection', '../services/common.service', 'perfmjs/utils', 'perfmjs/joquery', '../pipes/commonPipe', './betBaseSuanfa', './SsqBobao'], function(exports_1) {
    var angular2_1, di_1, router_1, class_1, change_detection_1, common_service_1, utils_1, joquery_1, commonPipe_1, betBaseSuanfa_1, SsqBobao_1;
    var betCountPipeObj, betInfoPipeObj, Ssq;
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
            function (_class_1) {
                class_1 = _class_1;
            },
            function (_change_detection_1) {
                change_detection_1 = _change_detection_1;
            },
            function (_common_service_1) {
                common_service_1 = _common_service_1;
            },
            function (_utils_1) {
                utils_1 = _utils_1;
            },
            function (_joquery_1) {
                joquery_1 = _joquery_1;
            },
            function (_commonPipe_1) {
                commonPipe_1 = _commonPipe_1;
            },
            function (_betBaseSuanfa_1) {
                betBaseSuanfa_1 = _betBaseSuanfa_1;
            },
            function (_SsqBobao_1) {
                SsqBobao_1 = _SsqBobao_1;
            }],
        execute: function() {
            //build pipe
            betCountPipeObj = new commonPipe_1.CommonPipeFactory();
            betCountPipeObj.transform = utils_1.utils.aop(this, betCountPipeObj.transform, function (value, args) {
                var betInfo = value;
                var selectedRedCount = joquery_1.joquery.newInstance(utils_1.utils.toArray(betInfo.get('red').values())).filter(function (item) {
                    return item.selected;
                }).toArray().length;
                var selectedBlueCount = joquery_1.joquery.newInstance(utils_1.utils.toArray(betInfo.get('blue').values())).filter(function (item) {
                    return item.selected;
                }).toArray().length;
                betInfo.set('betCount', betBaseSuanfa_1.betBaseSuanfa.getCodeNumber(6, selectedRedCount, selectedBlueCount));
                return betInfo.get('betCount');
            });
            betInfoPipeObj = new commonPipe_1.CommonPipeFactory();
            betInfoPipeObj.transform = utils_1.utils.aop(this, betInfoPipeObj.transform, function (value, args) {
                var betCount = value;
                return betCount < 1 ? '至少选择6个红球+1个蓝球' : '共' + betCount + '注，下一步';
            });
            Ssq = (function () {
                function Ssq(router, commonService) {
                    this.redCodes = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
                        "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23",
                        "24", "25", "26", "27", "28", "29", "30", "31", "32", "33"];
                    this.blueCodes = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16"];
                    this.betInfo = new Map();
                    this.page = 'bet';
                    this.router = router;
                    this.commonService = commonService;
                    this.betInfo.set('red', new Map());
                    this.betInfo.set('blue', new Map());
                    this.betInfo.set('betCount', 0);
                    var self = this;
                    utils_1.utils.forEach(this.redCodes, function (item) {
                        self.betInfo.get('red').set(item, { 'code': item, 'area': 'red', 'selected': false });
                    });
                    utils_1.utils.forEach(this.blueCodes, function (item) {
                        self.betInfo.get('blue').set(item, { 'code': item, 'area': 'blue', 'selected': false });
                    });
                }
                /**
                 * 手选号码
                 * @param code
                 */
                Ssq.prototype.xuanhao = function (code) {
                    code.selected = !code.selected;
                };
                /**
                 * 机选一注|清空
                 */
                Ssq.prototype.randomCode = function () {
                    if (this.betInfo.get('betCount') > 0) {
                        this.clearAllSelectedCode();
                        return;
                    }
                    var randomRedCodes = betBaseSuanfa_1.betBaseSuanfa.rndNumbersAndFormat(1, 33, 6, 0, -1, '', [], true).split(',');
                    var randomBlueCodes = betBaseSuanfa_1.betBaseSuanfa.rndNumbersAndFormat(1, 16, 1, 0, -1, '', [], true).split(',');
                    this.clearAllSelectedCode();
                    utils_1.utils.forEach(this.betInfo.get('red'), function (value, key) {
                        if (utils_1.utils.contain(randomRedCodes, key))
                            value.selected = true;
                    });
                    utils_1.utils.forEach(this.betInfo.get('blue'), function (value, key) {
                        if (utils_1.utils.contain(randomBlueCodes, key))
                            value.selected = true;
                    });
                };
                Ssq.prototype.clearAllSelectedCode = function () {
                    utils_1.utils.forEach(this.betInfo.get('red'), function (value, key) {
                        value.selected = false;
                    });
                    utils_1.utils.forEach(this.betInfo.get('blue'), function (value, key) {
                        value.selected = false;
                    });
                    this.betInfo.set('betCount', 0);
                };
                Ssq.prototype.betConfirm = function () {
                    var betPlanContent = this.commonService.betPlanContent;
                    betPlanContent.lottery = 'ssq';
                    if (this.betInfo.get('betCount') < 1) {
                        this.router.navigate('/ssqBetConfirm');
                        return;
                    }
                    var selectedRedCode = [];
                    joquery_1.joquery.newInstance(utils_1.utils.toArray(this.betInfo.get('red').values())).filter(function (item) {
                        if (item.selected) {
                            selectedRedCode[selectedRedCode.length] = item.code;
                        }
                    }).toArray();
                    var selectedBlueCode = [];
                    joquery_1.joquery.newInstance(utils_1.utils.toArray(this.betInfo.get('blue').values())).filter(function (item) {
                        if (item.selected) {
                            selectedBlueCode[selectedBlueCode.length] = item.code;
                        }
                    }).toArray();
                    betPlanContent.content[betPlanContent.content.length] = {
                        'red': selectedRedCode,
                        'blue': selectedBlueCode,
                        'betCount': this.betInfo.get('betCount')
                    };
                    var totalBetCount = 0;
                    utils_1.utils.forEach(betPlanContent.content, function (item, index) {
                        totalBetCount = totalBetCount + utils_1.utils.toNumber(item.betAccount);
                    });
                    betPlanContent.content.totalBetCount = totalBetCount;
                    betPlanContent.content.betAmount = betPlanContent.calcTotalAmount();
                    this.router.navigate('/ssqBetConfirm');
                };
                Ssq.prototype.messageEventCompleted = function (event) {
                    event.emit('SSQ#CALL BACK!');
                };
                Ssq = __decorate([
                    angular2_1.Component({
                        selector: 'ssq',
                        viewInjector: [
                            change_detection_1.Pipes.extend({
                                'betInfoPipe': commonPipe_1.CommonPipeFactory.toPipe(betInfoPipeObj),
                                'betCountPipe': commonPipe_1.CommonPipeFactory.toPipe(betCountPipeObj)
                            })
                        ]
                    }),
                    angular2_1.View({
                        templateUrl: 'templates/ssq/ssq.html',
                        directives: [angular2_1.coreDirectives, router_1.RouterOutlet, router_1.RouterLink, class_1.CSSClass, SsqBobao_1.SsqBobao]
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
