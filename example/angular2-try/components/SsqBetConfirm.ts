import {Component, View, Injectable, coreDirectives, Directive, ElementRef, Renderer} from 'angular2/angular2';
import {Inject, bind} from 'angular2/di';
import {Router, RouterOutlet, RouterLink, routerInjectables} from 'angular2/router';
import {CSSClass} from 'angular2/src/directives/class';
import {Pipes} from 'angular2/src/change_detection/change_detection';
import {formDirectives, Control} from 'angular2/forms';

import {CommonService, BetPlanContent} from '../services/common.service';
import {utils} from 'perfmjs/utils';
import {joquery} from 'perfmjs/joquery';
import {CommonPipeFactory} from '../pipes/commonPipe';
import {betBaseSuanfa} from './betBaseSuanfa';
import {Modal} from '../directives/modal';
import {SsqBobao} from './SsqBobao';

//build pipe
var betPlanPipeObj = new CommonPipeFactory();
betPlanPipeObj.transform = utils.aop(this, betPlanPipeObj.transform, function(value, args) {
    var betPlanContent = value, totalBetCount = 0;
    utils.forEach(betPlanContent.content, function(item, index) {
        totalBetCount = totalBetCount + utils.toNumber(item.betCount);
    });
    betPlanContent.totalBetCount = totalBetCount;
    betPlanContent.betAmount = betPlanContent.calcTotalAmount();
    return betPlanContent;
});

@Component({
    selector: 'ssqBetConfirm',
    viewInjector: [
        Pipes.extend({
            'betPlanPipe': CommonPipeFactory.toPipe(betPlanPipeObj)
        })
    ]
})
@View({
    templateUrl: 'templates/ssq/ssqBetConfirm.html',
    directives: [coreDirectives, RouterOutlet, CSSClass, formDirectives, Modal, SsqBobao]
})
export class SsqBetConfirm {
    router:Router;
    betPlanContent:BetPlanContent;
    readedProtocolControl: Control = new Control(true);
    event:any;

    constructor(@Inject(Router) router: Router, commonService: CommonService) {
        this.router = router;
        this.betPlanContent = commonService.betPlanContent;

    }

    /**
     * 机选5注
     */
    random5zhu() {
        for (var i = 0; i < 5; i++) {
            var randomRedCodes = betBaseSuanfa.rndNumbersAndFormat(1,33,6,0,-1,'',[],true).split(',');
            var randomBlueCodes = betBaseSuanfa.rndNumbersAndFormat(1,16,1,0,-1,'',[],true).split(',');
            this.betPlanContent.content[this.betPlanContent.content.length] = {
                'red': randomRedCodes,
                'blue': randomBlueCodes,
                'betCount': 1
            }
        }
    }

    /**
     * 删除选号
     * @param selectedCodeIndex
     */
    delSelectedCode(selectedCodeIndex:number) {
        this.betPlanContent.content.splice(selectedCodeIndex, 1);
    }

    gotoBetPage() {
        this.router.navigate("/ssq");
    }

    /**
     * 调整倍数
     * @param operator
     */
    adjustMultiple(operator) {
        if (operator === 'add') {
            if (this.betPlanContent.multiple < 99) {
                this.betPlanContent.multiple += 1;
            }
        } else if (operator === 'reduce') {
            if (this.betPlanContent.multiple > 1) {
                this.betPlanContent.multiple -= 1;
            }
        }
    }

    /**
     * 调整期数
     * @param operator
     */
    adjustChaseItemCount(operator) {
        if (operator === 'add') {
            if (this.betPlanContent.chaseItemCount < 99) {
                this.betPlanContent.chaseItemCount += 1;
            }
        } else if (operator === 'reduce') {
            if (this.betPlanContent.chaseItemCount > 1) {
                this.betPlanContent.chaseItemCount -= 1;
            }
        }
    }

    /**
     * 立即付款
     */
    payNow() {
        var self = this, agree = this.readedProtocolControl.value;
        if (!agree) {
            var agreeModalParam = {
                type:"",
                dialogTitle: "",
                dialogHead: false,
                dialogInfo: {
                    'dialogType':'fail',
                    'info1':'查看记录',
                    'info2':'分享',
                    'tips':'投注前请先阅读并选中投注协议！',
                    'cancel':'',
                    'ok':'继续投注'
                },
                beforeFunc:function(){
                    console.log('beforeFunc');
                },
                callbackFunc: function() {
                    console.log('回调函数接口');
                }
            };
            this.event.emit({'modal': agreeModalParam});
            return;
        }
        var confirmModalParam = {
            type:"",
            dialogTitle: "",
            dialogHead: true,
            dialogInfo: {
                'dialogType':'confirm',
                'info1':'金额为'+self.betPlanContent.betAmount,
                'info2':'是否继续投注？',
                'tips':'默认投注所有让分值',
                'cancel':'放弃投注',
                'ok':'确认投注'
            },
            beforeFunc:function(){
                console.log('beforeFunc');
            },
            callbackFunc: function() {
                console.log('回调函数接口');
                self.event.emit({'modal': successModalParam});
            }
        };
        var successModalParam = {
            type:"",
            dialogTitle: "",
            dialogHead: true,
            dialogInfo: {
                'dialogType':'success',
                'info1':'查看记录',
                'info2':'分享',
                'tips':'投注成功',
                'cancel':'',
                'ok':'继续投注'
            },
            beforeFunc:function(){
                console.log('beforeFunc');
            },
            callbackFunc: function() {
                console.log('回调函数接口');
            }
        };
        var tipModalParam = {
            type:"overlay",
            dialogTitle: "提示3",
            dialogHead: true,
            dialogInfo: {
                'dialogType':'tip',
                'info1':'',
                'info2':'',
                'tips':'',
                'cancel':'关闭',
                'ok':'提交保存'
            },
            beforeFunc:function(){
                console.log('beforeFunc');
            },
            callbackFunc: function() {
                console.log('回调函数接口');
            }
        };
        var bizModalParam = {
            type:"adsorb",
            dialogTitle: "",
            dialogHead: false,
            dialogInfo: {
                'dialogType':'business',
                'info1':'',
                'info2':'',
                'tips':'',
                'cancel':'关闭',
                'ok':'提交保存'
            },
            beforeFunc:function(){
                console.log('beforeFunc');
            },
            callbackFunc: function() {
                console.log('回调函数接口');
            }
        };
        var failModalParam = {
            type:"",
            dialogTitle: "",
            dialogHead: false,
            dialogInfo: {
                'dialogType':'fail',
                'info1':'查看记录',
                'info2':'分享',
                'tips':'投注失败',
                'cancel':'',
                'ok':'继续投注'
            },
            beforeFunc:function(){
                console.log('beforeFunc');
            },
            callbackFunc: function() {
                console.log('回调函数接口');
            }
        };

        this.event.emit({'modal': confirmModalParam});
    }

    messageEventCompleted(event) {
        this.event = event;
    }

}