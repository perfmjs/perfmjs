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
};System.register(['angular2/angular2', 'angular2/src/dom/browser_adapter', 'angular2/forms', 'perfmjs/utils', 'perfmjs/angular2/directives/ckeditor', 'perfmjs/angular2/directives/popup'], function(exports_1) {
    var angular2_1, browser_adapter_1, forms_1, utils_1, ckeditor_1, popup_1;
    var CmsEdit, CmsFormControls;
    return {
        setters:[
            function (_angular2_1) {
                angular2_1 = _angular2_1;
            },
            function (_browser_adapter_1) {
                browser_adapter_1 = _browser_adapter_1;
            },
            function (_forms_1) {
                forms_1 = _forms_1;
            },
            function (_utils_1) {
                utils_1 = _utils_1;
            },
            function (_ckeditor_1) {
                ckeditor_1 = _ckeditor_1;
            },
            function (_popup_1) {
                popup_1 = _popup_1;
            }],
        execute: function() {
            CmsEdit = (function () {
                function CmsEdit() {
                    this.dom = new browser_adapter_1.BrowserDomAdapter();
                    this.cmsControls = new CmsFormControls(this);
                    this.dom.setInnerHTML(this.dom.querySelectorAll(document, "title")[0], 'cms-edit');
                }
                CmsEdit.prototype.editCms = function () {
                    var self = this, jsonParam = this.cmsControls.toJSON();
                    utils_1.utils.fetch({
                        url: 'http://localhost:8888/youyue/cms/add',
                        method: 'POST',
                        jsonParam: jsonParam
                    }).then(function (jsonData) {
                        if (jsonData.status === 'success') {
                            self.cmsControls.clear();
                            popup_1.popup.pop('提交成功');
                        }
                        else {
                            console.log(jsonData.msg);
                        }
                    });
                };
                CmsEdit.prototype.ng2ckeditorCompleted = function (event) {
                    this.event = event;
                };
                CmsEdit = __decorate([
                    angular2_1.Component({
                        selector: 'cms-edit'
                    }),
                    angular2_1.View({
                        styles: ["\n        .pure-form .pure-input-1-2, .pure-form .pure-button {\n            display: block;\n            width: 96%;\n            margin: 10px auto\n        }\n        .pure-group {\n            margin: 0 0 0 0\n        }\n    "],
                        templateUrl: "templates/cms/index.html",
                        directives: [angular2_1.CORE_DIRECTIVES, forms_1.FORM_DIRECTIVES, ckeditor_1.CKEditor]
                    }), 
                    __metadata('design:paramtypes', [])
                ], CmsEdit);
                return CmsEdit;
            })();
            exports_1("CmsEdit", CmsEdit);
            CmsFormControls = (function () {
                function CmsFormControls(global) {
                    this.channel = new forms_1.Control('科技');
                    this.title = new forms_1.Control('深汕高速惊魂车祸原因查明,大家以后坐车一定要做好这件事!!');
                    this.hasBigImg = new forms_1.Control(false);
                    this.img1 = new forms_1.Control('http://p2.pstatp.com/list/7383/3883450298');
                    this.img2 = new forms_1.Control('http://p3.pstatp.com/list/7381/5558595450');
                    this.img3 = new forms_1.Control('http://p3.pstatp.com/list/7379/7061490063');
                    this.label = new forms_1.Control('古今周刊');
                    this.source = new forms_1.Control('潮州韩水之家');
                    this.sourceUrl = new forms_1.Control("");
                    this.global = global;
                }
                CmsFormControls.prototype.clear = function () {
                    this.channel.updateValue("");
                    this.title.updateValue("");
                    this.hasBigImg.updateValue(false);
                    this.img1.updateValue("");
                    this.img2.updateValue("");
                    this.img3.updateValue("");
                    this.label.updateValue("");
                    this.source.updateValue("");
                    this.sourceUrl.updateValue("");
                    this.global.event.source.setData("");
                };
                CmsFormControls.prototype.toJSON = function () {
                    var result = {};
                    result['channelName'] = this.channel.value;
                    result['title'] = this.title.value;
                    result['hasBigImg'] = this.hasBigImg.value;
                    result['img1'] = this.img1.value;
                    result['img2'] = this.img2.value;
                    result['img3'] = this.img3.value;
                    result['label'] = this.label.value;
                    result['source'] = this.source.value;
                    result['sourceUrl'] = this.sourceUrl.value;
                    result['content'] = this.global.event.source.getData();
                    return result;
                };
                return CmsFormControls;
            })();
        }
    }
});
