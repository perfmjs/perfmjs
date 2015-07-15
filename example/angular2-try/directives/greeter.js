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
var di_1 = require('angular2/di');
var Highlight = (function () {
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
exports.Highlight = Highlight;
var RedDec = (function () {
    function RedDec(el) {
        el.domElement.style.color = 'red';
    }
    RedDec = __decorate([
        angular2_1.Directive({ selector: 'red' }), 
        __metadata('design:paramtypes', [(typeof ElementRef !== 'undefined' && ElementRef) || Object])
    ], RedDec);
    return RedDec;
})();
exports.RedDec = RedDec;
var Tooltip = (function () {
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
exports.Tooltip = Tooltip;
var NeedsGreeter = (function () {
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
exports.NeedsGreeter = NeedsGreeter;
var Greeter = (function () {
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
exports.Greeter = Greeter;
