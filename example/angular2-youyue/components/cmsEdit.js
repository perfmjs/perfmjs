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
};System.register(['angular2/angular2', 'angular2/src/dom/browser_adapter', 'perfmjs/angular2/directives/ckeditor'], function(exports_1) {
    var angular2_1, browser_adapter_1, ckeditor_1;
    var CmsEdit;
    return {
        setters:[
            function (_angular2_1) {
                angular2_1 = _angular2_1;
            },
            function (_browser_adapter_1) {
                browser_adapter_1 = _browser_adapter_1;
            },
            function (_ckeditor_1) {
                ckeditor_1 = _ckeditor_1;
            }],
        execute: function() {
            CmsEdit = (function () {
                function CmsEdit() {
                    var dom = new browser_adapter_1.BrowserDomAdapter();
                    dom.setInnerHTML(dom.querySelectorAll(document, "title")[0], 'cms-edit');
                }
                CmsEdit.prototype.ng2ckeditorCompleted = function (event) {
                    console.log("ng2ckeditorCompleted...");
                };
                CmsEdit = __decorate([
                    angular2_1.Component({
                        selector: 'cms-edit'
                    }),
                    angular2_1.View({
                        styles: ["\n        .pure-form .pure-input-1-2, .pure-form .pure-button {\n            display: block;\n            width: 96%;\n            margin: 10px auto\n        }\n        .pure-group {\n            margin: 0 0 0 0\n        }\n    "],
                        templateUrl: "templates/cms/index.html",
                        directives: [angular2_1.CORE_DIRECTIVES, ckeditor_1.CKEditor]
                    }), 
                    __metadata('design:paramtypes', [])
                ], CmsEdit);
                return CmsEdit;
            })();
            exports_1("CmsEdit", CmsEdit);
        }
    }
});
