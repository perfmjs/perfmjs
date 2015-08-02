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
};System.register(['angular2/angular2', 'angular2/di'], function(exports_1) {
    var angular2_1, di_1;
    var RedDec, Greeter;
    return {
        setters:[
            function (_angular2_1) {
                angular2_1 = _angular2_1;
            },
            function (_di_1) {
                di_1 = _di_1;
            }],
        execute: function() {
            //@Directive({
            //    selector: 'hightlight',
            //    hostListeners: {
            //        'mouseenter': 'onMouseEnter()',
            //        'mouseleave': 'onMouseLeave()'
            //    }
            //})
            //export class Highlight {
            //
            //    constructor(private element:ElementRef) {
            //    }
            //
            //    onMouseEnter() {
            //        this.outline('#f00 solid 1px');
            //    }
            //
            //    onMouseLeave() {
            //        this.outline();
            //    }
            //
            //    private outline(outline:string = "") {
            //        this.element.domElement.style.outline = outline;
            //    }
            //}
            RedDec = (function () {
                // ElementRef is always injectable and it wraps the element on which the
                // directive was found by the compiler.
                function RedDec(el, renderer) {
                    renderer.setElementStyle(el, 'color', 'red');
                }
                RedDec = __decorate([
                    angular2_1.Directive({ selector: '[red]' }), 
                    __metadata('design:paramtypes', [(typeof ElementRef !== 'undefined' && ElementRef) || Object, (typeof Renderer !== 'undefined' && Renderer) || Object])
                ], RedDec);
                return RedDec;
            })();
            //@Directive({
            //    selector: '[tooltip]',
            //    properties: ['text: tooltip']
            //})
            //export class Tooltip {
            //    set text(value: string) {
            //        console.log("Tooltip Directive new value: " + value);
            //    }
            //}
            //@Directive({selector: 'needs-greeter'})
            //export class NeedsGreeter {
            //  greeter: Greeter;
            //
            //  //constructor(greeter: Greeter) {
            //  //    this.greeter = greeter;
            //  //}
            //    constructor() {
            //        //this.greeter = greeter;
            //    }
            //}
            Greeter = (function () {
                function Greeter() {
                }
                Greeter.prototype.greet = function (name) {
                    return 'Hello ' + name + '!';
                };
                Greeter = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], Greeter);
                return Greeter;
            })();
            exports_1("Greeter", Greeter);
        }
    }
});
