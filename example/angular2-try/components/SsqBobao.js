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
};System.register(['angular2/angular2', 'angular2/di', 'angular2/src/directives/class'], function(exports_1) {
    var angular2_1, di_1, class_1;
    var RedDec, SsqBobao;
    return {
        setters:[
            function (_angular2_1) {
                angular2_1 = _angular2_1;
            },
            function (_di_1) {
                di_1 = _di_1;
            },
            function (_class_1) {
                class_1 = _class_1;
            }],
        execute: function() {
            RedDec = (function () {
                function RedDec(el, renderer) {
                    renderer.setElementAttribute(el, 'class', 'red-better');
                }
                RedDec = __decorate([
                    angular2_1.Directive({ selector: '[red-better]' }),
                    __param(0, di_1.Inject(angular2_1.ElementRef)),
                    __param(1, di_1.Inject(angular2_1.Renderer)), 
                    __metadata('design:paramtypes', [(typeof ElementRef !== 'undefined' && ElementRef) || Object, (typeof Renderer !== 'undefined' && Renderer) || Object])
                ], RedDec);
                return RedDec;
            })();
            SsqBobao = (function () {
                function SsqBobao() {
                }
                SsqBobao = __decorate([
                    angular2_1.Component({
                        selector: 'ssq-bobao'
                    }),
                    angular2_1.View({
                        template: "\n    <p class=\"i-report\">2015001\u671F <span red-better>\u5468\u4E8C21:30\u5F00\u5956</span></p>\n    ",
                        directives: [angular2_1.coreDirectives, class_1.CSSClass, RedDec]
                    }), 
                    __metadata('design:paramtypes', [])
                ], SsqBobao);
                return SsqBobao;
            })();
            exports_1("SsqBobao", SsqBobao);
        }
    }
});
