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
};System.register(['angular2/angular2', 'angular2/di', 'perfmjs/utils', 'angular2/src/directives/class', 'angular2/src/dom/browser_adapter', './MessageEvent'], function(exports_1) {
    var angular2_1, di_1, utils_1, class_1, browser_adapter_1, MessageEvent_1;
    var Modal;
    return {
        setters:[
            function (_angular2_1) {
                angular2_1 = _angular2_1;
            },
            function (_di_1) {
                di_1 = _di_1;
            },
            function (_utils_1) {
                utils_1 = _utils_1;
            },
            function (_class_1) {
                class_1 = _class_1;
            },
            function (_browser_adapter_1) {
                browser_adapter_1 = _browser_adapter_1;
            },
            function (_MessageEvent_1) {
                MessageEvent_1 = _MessageEvent_1;
            }],
        execute: function() {
            /**
             * from jquery.kmodal.js
             * 指令使用方法：<modal (message-event)="messageEventCompleted($event)"></modal>
             */
            Modal = (function () {
                function Modal(elem, renderer) {
                    this.messageEvent = new MessageEvent_1.MessageEvent(this);
                    this.dom = new browser_adapter_1.BrowserDomAdapter();
                    this.params = {
                        type: "modal",
                        dialogTitle: "默认头部",
                        dialogHead: true,
                        callbackFunc: null,
                        beforeFunc: null,
                        dialogInfo: { 'dialogType': '' }
                    };
                    this.showModal = false;
                    this.showBackdrop = false;
                    this.showModalHeader = true;
                    //below for css style
                    this.kmodaloverlayClass = true;
                    this.kmodalbackdropClass = true;
                    this.kmodaladsorbClass = true;
                    this.kmodalbodyClass = false;
                    this.kmodalfooterClass = false;
                    this.modalTitle = '';
                    this.dialogType = 'confirm'; //dialogType： confirm-确认信息, success-成功, fail-失败, tips-提示信息, business－业务逻辑
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
                    this.dialogInfo = { 'dialogType': '' };
                    this.elem = elem;
                    this.renderer = renderer;
                }
                Modal.prototype.onMessage = function (message) {
                    this.modal(message.modal);
                };
                Modal.prototype.modal = function (options) {
                    this.params = utils_1.utils.extend(this.params, options);
                    //判断弹窗类型
                    if (this.params.type == "overlay") {
                        this.kmodaloverlayClass = true;
                        this.kmodalbackdropClass = false;
                        this.showBackdrop = false;
                    }
                    else if (this.params.type == "adsorb") {
                        this.kmodaloverlayClass = false;
                        this.showBackdrop = true;
                        this.kmodaladsorbClass = true;
                    }
                    else {
                        this.kmodaladsorbClass = false;
                        this.kmodaloverlayClass = false;
                        this.showBackdrop = true;
                    }
                    this.kmodalbodyClass = true;
                    this.kmodalfooterClass = true;
                    this.modalTitle = this.params.dialogTitle;
                    this.dialogType = this.params.dialogInfo.dialogType;
                    this.dialogInfo = utils_1.utils.extend(this.dialogInfo, this.params.dialogInfo);
                    if (!this.params.dialogHead) {
                        this.showModalHeader = false;
                    }
                    if (this.params.beforeFunc) {
                        this.params.beforeFunc();
                    }
                    this.showModal = true;
                };
                //关闭事件以及取消绑定事件和清除样式
                Modal.prototype.closeHandler = function (event) {
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
                        this.params.callbackFunc();
                    }
                };
                Modal = __decorate([
                    angular2_1.Component({
                        selector: 'modal',
                        events: ['messageEvent'] //ref to: SsqBetConfirm.ts and ssqBetConfirm.html
                    }),
                    angular2_1.View({
                        template: "\n<style>\n    .ng-showKModal {\n        display:block;\n    }\n</style>\n<div [class]=\"{'k-modal':true,'k-modal-overlay':kmodaloverlayClass,'k-modal-adsorb':kmodaladsorbClass,'ng-showKModal':true}\" id=\"jq_modal\" *ng-if=\"showModal\">\n    <div [class]=\"{'k-modal-backdrop':kmodalbackdropClass}\" *ng-if=\"showBackdrop\"></div>\n    <div class=\"k-modal-dialog\">\n        <div class=\"k-modal-content\">\n            <div class=\"k-modal-header\" *ng-if=\"showModalHeader\">\n                <button  class=\"k-close k-jq_closeModal\" (click)=\"closeHandler($event)\">&times;</button>\n                <h4 class=\"k-modal-title\">{{modalTitle}}</h4>\n            </div>\n            <div [ng-switch]=\"dialogType\">\n                <template [ng-switch-when]=\"'confirm'\">\n                    <div id=\"jq_km_bd\" [class]=\"{'k-modal-body':kmodalbodyClass}\">\n                        <p class=\"tac pan_span\"><span class=\"icon_danger\"></span><span>{{dialogInfo.info1}}</span></p><p class=\"fs36 tac mt10\">{{dialogInfo.info2}}</p><p class=\"mt10 c666\">{{dialogInfo.tips}}</p>\n                    </div>\n                    <div id=\"jq_km_ft\" [class]=\"{'k-modal-footer':kmodalfooterClass}\">\n                        <ul class=\"flex_equal\"><li><button class=\"k-btn k-btn-default k-btn-block k-jq_closeModal\">{{dialogInfo.cancel}}</button></li><li class=\"ml10\"><button class=\"k-btn k-btn-success k-btn-block\">{{dialogInfo.ok}}</button></li></ul>\n                    </div>\n                </template>\n                <template [ng-switch-when]=\"'success'\">\n                    <div id=\"jq_km_bd\" [class]=\"{'k-modal-body':kmodalbodyClass}\">\n                        <p class=\"tac\"><span class=\"icon_success\"></span></p><p class=\"fs36 tac mt10\">{{dialogInfo.tips}}</p>\n                    </div>\n                    <div id=\"jq_km_ft\" [class]=\"{'k-modal-footer':kmodalfooterClass}\">\n                        <button class=\"k-btn k-btn-danger k-btn-block k-jq_closeModal\" (click)=\"closeHandler($event)\">{{dialogInfo.ok}}</button><ul class=\"mt10 flex_equal tac\"><li><a class=\"icon_check\" href=\"javascript:void(0)\">{{dialogInfo.info1}}</a></li><li><a class=\"icon_share\" href=\"javascript:void(0)\">{{dialogInfo.info2}}</a></li></ul>\n                    </div>\n                </template>\n                <template [ng-switch-when]=\"'fail'\">\n                    <div id=\"jq_km_bd\" [class]=\"{'k-modal-body':kmodalbodyClass}\">\n                        <p class=\"tac\"><span class=\"icon_error\"></span></p><p class=\"fs36 tac mt10\">{{dialogInfo.tips}}</p>\n                    </div>\n                    <div id=\"jq_km_ft\" [class]=\"{'k-modal-footer':kmodalfooterClass}\">\n                        <button class=\"k-btn k-btn-danger k-btn-block k-jq_closeModal\" (click)=\"closeHandler($event)\">{{dialogInfo.ok}}</button><ul class=\"mt10 flex_equal tac\"><li><a class=\"icon_check\" href=\"javascript:void(0)\">{{dialogInfo.info1}}</a></li><li><a class=\"icon_share\" href=\"javascript:void(0)\">{{dialogInfo.info2}}</a></li></ul>\n                    </div>\n                </template>\n                <template [ng-switch-when]=\"'tips'\">\n                    <div id=\"jq_km_bd\" [class]=\"{'k-modal-body':kmodalbodyClass}\">\n                        <ul><li>1</li><li>2</li><li>3</li></ul><table><tr><td align=\"center\">table</td><td align=\"center\">table</td></tr><tr><td align=\"center\">table</td><td align=\"center\">table</td></tr></table>\n                    </div>\n                    <div id=\"jq_km_ft\" [class]=\"{'k-modal-footer':kmodalfooterClass}\">\n                        <div class=\"flex_equal\"><li><button class=\"k-btn k-btn-info k-btn-block k-jq_closeModal\">{{dialogInfo.cancel}}</button></li><li><button class=\"k-btn k-btn-warning k-btn-block ml10\">{{dialogInfo.ok}}</button></li></div>\n                    </div>\n                </template>\n                <template [ng-switch-when]=\"'business'\">\n                    <div id=\"jq_km_bd\" [class]=\"{'k-modal-body':kmodalbodyClass}\">\n                        <div><p>\u7ADE\u731C <input class=\"inp_txt\" type=\"text\" value=\"100\"> \u731C\u8C46\uFF0C\u731C\u5BF9\u53EF\u5F97<span class=\"red\">185</span></p></div><div class=\"tac faq_list mt10\"><ul class=\"flex_equal\"><li><div class=\"dvm\"><p>\u5168\u538B</p></div></li><li><div class=\"dvm\"><p>10</p></div></li><li><div class=\"dvm\"><p>100</p></div></li><li class=\"current\"><div class=\"dvm\"><p>1000</p></div></li></ul></div>\n                    </div>\n                    <div id=\"jq_km_ft\" [class]=\"{'k-modal-footer':kmodalfooterClass}\">\n                        <strong class=\"red\">\u60A8\u5DF2\u5B64\u6CE8\u4E00\u63B7\uFF0C\u8BF7\u8C28\u614E\uFF01</strong><button class=\"k-btn k-btn-success ml10 k-jq_closeModal\" (click)=\"closeHandler($event)\">\u786E\u8BA4\u7ADE\u731C</button>\n                    </div>\n                </template>\n            </div>\n        </div>\n    </div>\n</div>\n    ",
                        //templateUrl: './directives/modal.html',
                        directives: [angular2_1.coreDirectives, class_1.CSSClass]
                    }),
                    __param(0, di_1.Inject(angular2_1.ElementRef)),
                    __param(1, di_1.Inject(angular2_1.Renderer)), 
                    __metadata('design:paramtypes', [(typeof ElementRef !== 'undefined' && ElementRef) || Object, (typeof Renderer !== 'undefined' && Renderer) || Object])
                ], Modal);
                return Modal;
            })();
            exports_1("Modal", Modal);
        }
    }
});
