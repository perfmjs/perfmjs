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
    var Highlight, RedDec, Tooltip, NeedsGreeter, Greeter;
    return {
        setters:[
            function (_angular2_1) {
                angular2_1 = _angular2_1;
            },
            function (_di_1) {
                di_1 = _di_1;
            }],
        execute: function() {
            Highlight = (function () {
                function Highlight(element) {
                    this.element = element;
                }
                Highlight.prototype.onMouseEnter = function () {
                    this.outline('#f00 solid 1px');
                };
                Highlight.prototype.onMouseLeave = function () {
                    this.outline();
                };
                Highlight.prototype.outline = function (outline) {
                    if (outline === void 0) { outline = ""; }
                    this.element.domElement.style.outline = outline;
                };
                Highlight = __decorate([
                    angular2_1.Directive({
                        selector: 'hightlight',
                        hostListeners: {
                            'mouseenter': 'onMouseEnter()',
                            'mouseleave': 'onMouseLeave()'
                        }
                    }), 
                    __metadata('design:paramtypes', [(typeof ElementRef !== 'undefined' && ElementRef) || Object])
                ], Highlight);
                return Highlight;
            })();
            exports_1("Highlight", Highlight);
            RedDec = (function () {
                function RedDec(el) {
                    el.domElement.style.color = 'red';
                }
                RedDec = __decorate([
                    angular2_1.Directive({ selector: 'red' }), 
                    __metadata('design:paramtypes', [(typeof ElementRef !== 'undefined' && ElementRef) || Object])
                ], RedDec);
                return RedDec;
            })();
            exports_1("RedDec", RedDec);
            Tooltip = (function () {
                function Tooltip() {
                }
                Object.defineProperty(Tooltip.prototype, "text", {
                    set: function (value) {
                        console.log("Tooltip Directive new value: " + value);
                    },
                    enumerable: true,
                    configurable: true
                });
                Tooltip = __decorate([
                    angular2_1.Directive({
                        selector: '[tooltip]',
                        properties: ['text: tooltip']
                    }), 
                    __metadata('design:paramtypes', [])
                ], Tooltip);
                return Tooltip;
            })();
            exports_1("Tooltip", Tooltip);
            NeedsGreeter = (function () {
                //constructor(greeter: Greeter) {
                //    this.greeter = greeter;
                //}
                function NeedsGreeter() {
                    //this.greeter = greeter;
                }
                NeedsGreeter = __decorate([
                    angular2_1.Directive({ selector: 'needs-greeter' }), 
                    __metadata('design:paramtypes', [])
                ], NeedsGreeter);
                return NeedsGreeter;
            })();
            exports_1("NeedsGreeter", NeedsGreeter);
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
