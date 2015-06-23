if (typeof __decorate !== "function") __decorate = function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
if (typeof __metadata !== "function") __metadata = function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var GreetingService = (function () {
    function GreetingService() {
        this.greeting = 'hello';
    }
    return GreetingService;
})();
var RedDec = (function () {
    function RedDec(el) {
        el.domElement.style.color = 'red';
    }
    RedDec = __decorate([
        angular2_1.Directive({ selector: '[red]' }), 
        __metadata('design:paramtypes', [(typeof ElementRef !== 'undefined' && ElementRef) || Object])
    ], RedDec);
    return RedDec;
})();
var HelloCmp = (function () {
    function HelloCmp(service) {
        this.greeting = service.greeting;
    }
    HelloCmp.prototype.changeGreeting = function () { this.greeting = 'howdy'; };
    HelloCmp = __decorate([
        angular2_1.Component({
            selector: 'hello-app',
            appInjector: [GreetingService]
        }),
        angular2_1.View({
            template: "<div class=\"greeting\">{{greeting}} <span red>world</span>!</div>\n           <button class=\"changeButton\" (click)=\"changeGreeting()\">change greeting</button>",
            directives: [RedDec]
        }), 
        __metadata('design:paramtypes', [GreetingService])
    ], HelloCmp);
    return HelloCmp;
})();
exports.HelloCmp = HelloCmp;
