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
};System.register(['angular2/angular2', 'angular2/di', 'angular2/router', 'angular2/src/core/metadata', 'angular2/forms', '../services/common-service', 'perfmjs/utils', './betBaseSuanfa', '../directives/modal', './SsqBobao'], function(exports_1) {
    var angular2_1, di_1, router_1, metadata_1, forms_1, common_service_1, utils_1, betBaseSuanfa_1, modal_1, SsqBobao_1;
    var BetPlanPipe, SsqBetConfirm;
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
            function (_metadata_1) {
                metadata_1 = _metadata_1;
            },
            function (_forms_1) {
                forms_1 = _forms_1;
            },
            function (_common_service_1) {
                common_service_1 = _common_service_1;
            },
            function (_utils_1) {
                utils_1 = _utils_1;
            },
            function (_betBaseSuanfa_1) {
                betBaseSuanfa_1 = _betBaseSuanfa_1;
            },
            function (_modal_1) {
                modal_1 = _modal_1;
            },
            function (_SsqBobao_1) {
                SsqBobao_1 = _SsqBobao_1;
            }],
        execute: function() {
            BetPlanPipe = (function () {
                function BetPlanPipe() {
                }
                BetPlanPipe.prototype.transform = function (value, args) {
                    var betPlanContent = value, totalBetCount = 0;
                    utils_1.utils.forEach(betPlanContent.content, function (item, index) {
                        totalBetCount = totalBetCount + utils_1.utils.toNumber(item.betCount);
                    });
                    betPlanContent.totalBetCount = totalBetCount;
                    betPlanContent.betAmount = betPlanContent.calcTotalAmount();
                    return betPlanContent;
                };
                BetPlanPipe = __decorate([
                    metadata_1.Pipe({
                        name: 'betPlanPipe'
                    }), 
                    __metadata('design:paramtypes', [])
                ], BetPlanPipe);
                return BetPlanPipe;
            })();
            SsqBetConfirm = (function () {
                function SsqBetConfirm(router, commonService) {
                    this.readedProtocolControl = new forms_1.Control(true);
                    this.router = router;
                    this.betPlanContent = commonService.betPlanContent;
                }
                /**
                 * 机选5注
                 */
                SsqBetConfirm.prototype.random5zhu = function () {
                    for (var i = 0; i < 5; i++) {
                        var randomRedCodes = betBaseSuanfa_1.betBaseSuanfa.rndNumbersAndFormat(1, 33, 6, 0, -1, '', [], true).split(',');
                        var randomBlueCodes = betBaseSuanfa_1.betBaseSuanfa.rndNumbersAndFormat(1, 16, 1, 0, -1, '', [], true).split(',');
                        this.betPlanContent.content[this.betPlanContent.content.length] = {
                            'red': randomRedCodes,
                            'blue': randomBlueCodes,
                            'betCount': 1
                        };
                    }
                };
                /**
                 * 删除选号
                 * @param selectedCodeIndex
                 */
                SsqBetConfirm.prototype.delSelectedCode = function (selectedCodeIndex) {
                    this.betPlanContent.content.splice(selectedCodeIndex, 1);
                };
                SsqBetConfirm.prototype.gotoBetPage = function () {
                    this.router.navigate("/ssq");
                };
                /**
                 * 调整倍数
                 * @param operator
                 */
                SsqBetConfirm.prototype.adjustMultiple = function (operator) {
                    if (operator === 'add') {
                        if (this.betPlanContent.multiple < 99) {
                            this.betPlanContent.multiple += 1;
                        }
                    }
                    else if (operator === 'reduce') {
                        if (this.betPlanContent.multiple > 1) {
                            this.betPlanContent.multiple -= 1;
                        }
                    }
                };
                /**
                 * 调整期数
                 * @param operator
                 */
                SsqBetConfirm.prototype.adjustChaseItemCount = function (operator) {
                    if (operator === 'add') {
                        if (this.betPlanContent.chaseItemCount < 99) {
                            this.betPlanContent.chaseItemCount += 1;
                        }
                    }
                    else if (operator === 'reduce') {
                        if (this.betPlanContent.chaseItemCount > 1) {
                            this.betPlanContent.chaseItemCount -= 1;
                        }
                    }
                };
                /**
                 * 立即付款
                 */
                SsqBetConfirm.prototype.payNow = function () {
                    var self = this, agree = this.readedProtocolControl.value;
                    if (!agree || this.betPlanContent.totalBetCount < 1) {
                        var agreeModalParam = {
                            type: "",
                            dialogTitle: "",
                            dialogHead: false,
                            dialogInfo: {
                                'dialogType': 'fail',
                                'info1': '',
                                'info2': '',
                                'tips': '投注前请先阅读并选中投注协议，并至少有1个投注！！',
                                'cancel': '',
                                'ok': '继续投注'
                            },
                            beforeFunc: function () {
                                console.log('beforeFunc');
                            },
                            callbackFunc: function () {
                                console.log('回调函数接口');
                            }
                        };
                        this.event.emit({ 'modalParam': agreeModalParam });
                        return;
                    }
                    var confirmModalParam = {
                        type: "",
                        dialogTitle: "",
                        dialogHead: true,
                        dialogInfo: {
                            'dialogType': 'confirm',
                            'info1': '金额为' + self.betPlanContent.betAmount + '元，是否继续投注？',
                            'info2': '',
                            'tips': '',
                            'cancel': '放弃投注',
                            'ok': '确认投注'
                        },
                        beforeFunc: function () {
                            console.log('beforeFunc');
                        },
                        callbackFunc: function (data) {
                            console.log('回调函数接口:' + data);
                            if (data === 'ok') {
                                self.betPlanContent.init();
                                self.event.emit({ 'modalParam': successModalParam });
                            }
                        }
                    };
                    var successModalParam = {
                        type: "",
                        dialogTitle: "",
                        dialogHead: true,
                        dialogInfo: {
                            'dialogType': 'success',
                            'info1': '查看记录',
                            'info2': '分享',
                            'tips': '投注成功',
                            'cancel': '',
                            'ok': '继续投注'
                        },
                        beforeFunc: function () {
                            console.log('beforeFunc');
                        },
                        callbackFunc: function (data) {
                            console.log('回调函数接口-success:' + data);
                            self.gotoBetPage();
                        }
                    };
                    var tipsModalParam = {
                        type: "overlay",
                        dialogTitle: "提示3",
                        dialogHead: true,
                        dialogInfo: {
                            'dialogType': 'tips',
                            'info1': '',
                            'info2': '',
                            'tips': '',
                            'cancel': '关闭',
                            'ok': '提交保存'
                        },
                        beforeFunc: function () {
                            console.log('beforeFunc');
                        },
                        callbackFunc: function () {
                            console.log('回调函数接口');
                        }
                    };
                    var bizModalParam = {
                        type: "adsorb",
                        dialogTitle: "",
                        dialogHead: false,
                        dialogInfo: {
                            'dialogType': 'business',
                            'info1': '',
                            'info2': '',
                            'tips': '',
                            'cancel': '关闭',
                            'ok': '提交保存'
                        },
                        beforeFunc: function () {
                            console.log('beforeFunc');
                        },
                        callbackFunc: function () {
                            console.log('回调函数接口');
                        }
                    };
                    var failModalParam = {
                        type: "",
                        dialogTitle: "",
                        dialogHead: false,
                        dialogInfo: {
                            'dialogType': 'fail',
                            'info1': '查看记录',
                            'info2': '分享',
                            'tips': '投注失败',
                            'cancel': '',
                            'ok': '继续投注'
                        },
                        beforeFunc: function () {
                            console.log('beforeFunc');
                        },
                        callbackFunc: function () {
                            console.log('回调函数接口');
                        }
                    };
                    this.event.emit({ 'modalParam': confirmModalParam });
                };
                SsqBetConfirm.prototype.modalCompleted = function (event) {
                    this.event = event;
                };
                SsqBetConfirm = __decorate([
                    angular2_1.Component({
                        selector: 'ssqBetConfirm'
                    }),
                    angular2_1.View({
                        templateUrl: 'templates/ssq/ssqBetConfirm.html',
                        directives: [angular2_1.CORE_DIRECTIVES, router_1.RouterOutlet, forms_1.FORM_DIRECTIVES, modal_1.Modal, SsqBobao_1.SsqBobao],
                        pipes: [BetPlanPipe]
                    }),
                    __param(0, di_1.Inject(router_1.Router)), 
                    __metadata('design:paramtypes', [(typeof Router !== 'undefined' && Router) || Object, common_service_1.CommonService])
                ], SsqBetConfirm);
                return SsqBetConfirm;
            })();
            exports_1("SsqBetConfirm", SsqBetConfirm);
        }
    }
});
