import {Component, View, Injectable, CORE_DIRECTIVES, Directive, ElementRef, Renderer} from 'angular2/angular2';
import {Inject, bind} from 'angular2/di';
import {Router, RouterOutlet, RouterLink, routerInjectables} from 'angular2/router';
import {Pipes} from 'angular2/src/core/pipes/pipes';
import {Pipe} from 'angular2/src/core/metadata';
import {FORM_DIRECTIVES, Control} from 'angular2/forms';

import {MessageEvent} from 'perfmjs/angular2/directives/message-event';
import {CommonService, BetPlanContent} from '../services/common-service';
import {utils} from 'perfmjs/utils';
import {joquery} from 'perfmjs/joquery';
import {betBaseSuanfa} from './betBaseSuanfa';
import {Modal} from 'perfmjs/angular2/directives/modal';
import {SsqBobao} from './SsqBobao';


@Pipe({
    name: 'betPlanPipe'
})
class BetPlanPipe {
    transform(value:any, args:any):any {
        var betPlanContent = value, totalBetCount = 0;
        utils.forEach(betPlanContent.content, function(item, index) {
            totalBetCount = totalBetCount + utils.toNumber(item.betCount);
        });
        betPlanContent.totalBetCount = totalBetCount;
        betPlanContent.betAmount = betPlanContent.calcTotalAmount();
        return betPlanContent;
    }
}

@Component({
    selector: 'ssqBetConfirm'
})
@View({
    templateUrl: 'templates/ssq/ssqBetConfirm.html',
    directives: [CORE_DIRECTIVES, RouterOutlet, FORM_DIRECTIVES, Modal, SsqBobao],
    pipes: [BetPlanPipe]
})
export class SsqBetConfirm {
    router:Router;
    betPlanContent:BetPlanContent;
    readedProtocolControl: Control = new Control(true);
    event:MessageEvent;

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
        if (!agree || this.betPlanContent.totalBetCount < 1) {
            var agreeModalParam = {
                type:"",
                dialogTitle: "",
                dialogHead: false,
                dialogInfo: {
                    'dialogType':'fail',
                    'info1':'',
                    'info2':'',
                    'tips':'投注前请先阅读并选中投注协议，并至少有1个投注！！',
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
            this.event.emit({'modalParam': agreeModalParam});
            return;
        }
        var confirmModalParam = {
            type:"",
            dialogTitle: "",
            dialogHead: true,
            dialogInfo: {
                'dialogType':'confirm',
                'info1':'金额为' +self.betPlanContent.betAmount +'元，是否继续投注？',
                'info2':'',
                'tips':'',
                'cancel':'放弃投注',
                'ok':'确认投注'
            },
            beforeFunc:function(){
                console.log('beforeFunc');
            },
            callbackFunc: function(data) {
                console.log('回调函数接口:' + data);
                if (data === 'ok') {
                    self.betPlanContent.init();
                    self.event.emit({'modalParam': successModalParam});
                }
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
            callbackFunc: function(data) {
                console.log('回调函数接口-success:' + data);
                self.gotoBetPage();
            }
        };
        var tipsModalParam = {
            type:"overlay",
            dialogTitle: "提示3",
            dialogHead: true,
            dialogInfo: {
                'dialogType':'tips',
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

        this.event.emit({'modalParam': confirmModalParam});
    }

    modalCompleted(event) {
        this.event = event;
    }

}