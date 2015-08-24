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
};System.register(['angular2/angular2', 'angular2/src/core/metadata/directives', 'angular2/di', 'perfmjs/angular2/directives/message-event'], function(exports_1) {
    var angular2_1, directives_1, di_1, message_event_1;
    var CKEditor;
    return {
        setters:[
            function (_angular2_1) {
                angular2_1 = _angular2_1;
            },
            function (_directives_1) {
                directives_1 = _directives_1;
            },
            function (_di_1) {
                di_1 = _di_1;
            },
            function (_message_event_1) {
                message_event_1 = _message_event_1;
            }],
        execute: function() {
            /**
             * ng2-ckeditor
             * 指令使用方法：<ng2ckeditor (message-event)="ng2ckeditorCompleted($event)"></ng2ckeditor>
             */
            CKEditor = (function () {
                function CKEditor(elem, renderer) {
                    this.messageEvent = new message_event_1.MessageEvent(this);
                    this.editorOptions = {
                        language: 'en',
                        uiColor: '#000000'
                    };
                    this.height = 150;
                    this.elem = elem;
                    this.renderer = renderer;
                }
                CKEditor.prototype.onInit = function () {
                    CKEDITOR.config.height = this.height;
                    CKEDITOR.config.width = 'auto';
                    if (CKEDITOR.revision == ('%RE' + 'V%') || !!CKEDITOR.plugins.get('wysiwygarea')) {
                        CKEDITOR.replace('ng2ckeditorElement');
                    }
                    else {
                        CKEDITOR.document.getById('ng2ckeditorElement').setAttribute('contenteditable', 'true');
                        CKEDITOR.inline('ng2ckeditorElement');
                    }
                };
                CKEditor.prototype.setData = function (html) {
                    CKEDITOR.instances.ng2ckeditorElement.setData(html);
                };
                CKEditor.prototype.getData = function () {
                    return CKEDITOR.instances.ng2ckeditorElement.getData();
                };
                CKEditor = __decorate([
                    angular2_1.Component({
                        selector: 'ng2ckeditor',
                        properties: ['height: ckheight'],
                        events: ['messageEvent'],
                        lifecycle: [directives_1.LifecycleEvent.onInit]
                    }),
                    angular2_1.View({
                        styles: ["\n        .ng-ckeditor {\n          border:0;\n        }\n    "],
                        template: "\n    <textarea id=\"ng2ckeditorElement\" name=\"ng2ckeditorElement\"></textarea>\n    ",
                        directives: [angular2_1.CORE_DIRECTIVES]
                    }),
                    __param(0, di_1.Inject(angular2_1.ElementRef)),
                    __param(1, di_1.Inject(angular2_1.Renderer)), 
                    __metadata('design:paramtypes', [(typeof ElementRef !== 'undefined' && ElementRef) || Object, (typeof Renderer !== 'undefined' && Renderer) || Object])
                ], CKEditor);
                return CKEditor;
            })();
            exports_1("CKEditor", CKEditor);
        }
    }
});
