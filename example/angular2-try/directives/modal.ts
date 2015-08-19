import {Component, View, Injectable, CORE_DIRECTIVES, Directive, ElementRef, Renderer} from 'angular2/angular2';
import {Inject, bind} from 'angular2/di';
import {utils} from 'perfmjs/utils';
import {BrowserDomAdapter} from 'angular2/src/dom/browser_adapter';
import {MessageEvent} from './message.event';


/**
 * from jquery.kmodal.js
 * 指令使用方法：<modal (message-event)="modalCompleted($event)"></modal>
 */
@Component({
    selector: 'modal',
    events: ['messageEvent'] //ref to: SsqBetConfirm.ts and ssqBetConfirm.html
})
@View({
    styles: [`
        .ng-showKModal {
            display:block;
        }
    `],
    template:`
<div [ng-class]="{'k-modal':true,'k-modal-overlay':kmodaloverlayClass,'k-modal-adsorb':kmodaladsorbClass,'ng-showKModal':true}" id="jq_modal" *ng-if="showModal">
    <div [ng-class]="{'k-modal-backdrop':kmodalbackdropClass}" *ng-if="showBackdrop"></div>
    <div class="k-modal-dialog">
        <div class="k-modal-content">
            <div class="k-modal-header" *ng-if="showModalHeader">
                <button  class="k-close k-jq_closeModal" (click)="closeHandler($event)">&times;</button>
                <h4 class="k-modal-title">{{modalTitle}}</h4>
            </div>
            <div [ng-switch]="dialogType">
                <template [ng-switch-when]="'confirm'">
                    <div id="jq_km_bd" [ng-class]="{'k-modal-body':kmodalbodyClass}">
                        <p class="tac pan_span"><span class="icon_danger"></span><span>{{dialogInfo.info1}}</span></p><p class="fs36 tac mt10">{{dialogInfo.info2}}</p><p class="mt10 c666">{{dialogInfo.tips}}</p>
                    </div>
                    <div id="jq_km_ft" [ng-class]="{'k-modal-footer':kmodalfooterClass}">
                        <ul class="flex_equal"><li><button class="k-btn k-btn-default k-btn-block k-jq_closeModal" (click)="closeHandler($event)">{{dialogInfo.cancel}}</button></li><li class="ml10"><button class="k-btn k-btn-success k-btn-block" (click)="closeHandler($event,'ok')">{{dialogInfo.ok}}</button></li></ul>
                    </div>
                </template>
                <template [ng-switch-when]="'success'">
                    <div id="jq_km_bd" [ng-class]="{'k-modal-body':kmodalbodyClass}">
                        <p class="tac"><span class="icon_success"></span></p><p class="fs36 tac mt10">{{dialogInfo.tips}}</p>
                    </div>
                    <div id="jq_km_ft" [ng-class]="{'k-modal-footer':kmodalfooterClass}">
                        <button class="k-btn k-btn-danger k-btn-block k-jq_closeModal" (click)="closeHandler($event)">{{dialogInfo.ok}}</button><ul class="mt10 flex_equal tac"><li><a class="icon_check" href="javascript:void(0)">{{dialogInfo.info1}}</a></li><li><a class="icon_share" href="javascript:void(0)">{{dialogInfo.info2}}</a></li></ul>
                    </div>
                </template>
                <template [ng-switch-when]="'fail'">
                    <div id="jq_km_bd" [ng-class]="{'k-modal-body':kmodalbodyClass}">
                        <p class="tac"><span class="icon_error"></span></p><p class="fs36 tac mt10">{{dialogInfo.tips}}</p>
                    </div>
                    <div id="jq_km_ft" [ng-class]="{'k-modal-footer':kmodalfooterClass}">
                        <button class="k-btn k-btn-danger k-btn-block k-jq_closeModal" (click)="closeHandler($event)">{{dialogInfo.ok}}</button><ul class="mt10 flex_equal tac"><li><a class="icon_check" href="javascript:void(0)">{{dialogInfo.info1}}</a></li><li><a class="icon_share" href="javascript:void(0)">{{dialogInfo.info2}}</a></li></ul>
                    </div>
                </template>
                <template [ng-switch-when]="'tips'">
                    <div id="jq_km_bd" [ng-class]="{'k-modal-body':kmodalbodyClass}">
                        <ul><li>1</li><li>2</li><li>3</li></ul><table><tr><td align="center">table</td><td align="center">table</td></tr><tr><td align="center">table</td><td align="center">table</td></tr></table>
                    </div>
                    <div id="jq_km_ft" [ng-class]="{'k-modal-footer':kmodalfooterClass}">
                        <div class="flex_equal"><li><button class="k-btn k-btn-info k-btn-block k-jq_closeModal">{{dialogInfo.cancel}}</button></li><li><button class="k-btn k-btn-warning k-btn-block ml10">{{dialogInfo.ok}}</button></li></div>
                    </div>
                </template>
                <template [ng-switch-when]="'business'">
                    <div id="jq_km_bd" [ng-class]="{'k-modal-body':kmodalbodyClass}">
                        <div><p>竞猜 <input class="inp_txt" type="text" value="100"> 猜豆，猜对可得<span class="red">185</span></p></div><div class="tac faq_list mt10"><ul class="flex_equal"><li><div class="dvm"><p>全压</p></div></li><li><div class="dvm"><p>10</p></div></li><li><div class="dvm"><p>100</p></div></li><li class="current"><div class="dvm"><p>1000</p></div></li></ul></div>
                    </div>
                    <div id="jq_km_ft" [ng-class]="{'k-modal-footer':kmodalfooterClass}">
                        <strong class="red">您已孤注一掷，请谨慎！</strong><button class="k-btn k-btn-success ml10 k-jq_closeModal" (click)="closeHandler($event)">确认竞猜</button>
                    </div>
                </template>
            </div>
        </div>
    </div>
</div>
    `,
    directives: [CORE_DIRECTIVES]
})
export class Modal {
    messageEvent:MessageEvent = new MessageEvent(this);
    elem:ElementRef;
    renderer:Renderer;
    dom:BrowserDomAdapter = new BrowserDomAdapter();
    params:any = {
        type: "modal",	//弹窗类型(modal为默认，overlay)
        dialogTitle: "默认头部",	//弹窗标题
        dialogHead: true, //弹窗头部k-modal-header
        callbackFunc: null,	//回调函数接口
        beforeFunc: null,
        dialogInfo: {'dialogType':''}
    };
    showModal:boolean = false;
    showBackdrop:boolean = false;
    showModalHeader:boolean = true;
    //below for css style
    kmodaloverlayClass = true;
    kmodalbackdropClass = true;
    kmodaladsorbClass = true;
    kmodalbodyClass = false;
    kmodalfooterClass = false;

    modalTitle:string = '';
    dialogType:string = 'confirm';  //dialogType： confirm-确认信息, success-成功, fail-失败, tips-提示信息, business－业务逻辑
    /**
     * e.g. dialogInfo: {
                'dialogType':'confirm',
                'info1':'你选择的已变为湖人[+4.5]胜1.85',
                'info2':'是否继续竞猜？',
                'tips':'默认竞猜所有让分值',
                'cancel':'放弃竞猜',
                'ok':'确认竞猜'
            }
     * @type {{dialogType: string}}
     */
    dialogInfo:any =  {'dialogType':''};

    constructor(@Inject(ElementRef) elem: ElementRef, @Inject(Renderer) renderer: Renderer) {
        this.elem = elem;
        this.renderer = renderer;
    }

    onMessage(message) {
        this.modal(message.modalParam);
    }

    modal(options) {
        this.params = utils.extend(this.params, options);
        //判断弹窗类型
        if (this.params.type == "overlay") {
            this.kmodaloverlayClass = true;
            this.kmodalbackdropClass = false;
            this.showBackdrop = false;
        }else if(this.params.type == "adsorb"){
            this.kmodaloverlayClass = false;
            this.showBackdrop = true;
            this.kmodaladsorbClass = true;
        } else {
            this.kmodaladsorbClass = false;
            this.kmodaloverlayClass = false;
            this.showBackdrop = true;
        }
        this.kmodalbodyClass = true;
        this.kmodalfooterClass = true;
        this.modalTitle = this.params.dialogTitle;
        this.dialogType = this.params.dialogInfo.dialogType;
        this.dialogInfo = utils.extend(this.dialogInfo, this.params.dialogInfo);

        if (!this.params.dialogHead) {
            this.showModalHeader = false;
        }
        if (this.params.beforeFunc) {
            this.params.beforeFunc();
        }

        this.showModal = true;
    }

    //关闭事件以及取消绑定事件和清除样式
    closeHandler(event, data) {
        this.showModal = false;
        this.kmodaloverlayClass = false;
        this.kmodaladsorbClass = false;
        this.showBackdrop = false;

        this.kmodalbodyClass = false;
        this.kmodalfooterClass = false;
        if (this.params.dialogHead == false) {
            this.showModalHeader = true;
        }
        if (this.params.callbackFunc) {
            this.params.callbackFunc(data);
        }
    }
}