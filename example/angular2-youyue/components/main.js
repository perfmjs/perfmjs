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
};System.register(['angular2/angular2', './common'], function(exports_1) {
    var angular2_1, common_1;
    var Main;
    return {
        setters:[
            function (_angular2_1) {
                angular2_1 = _angular2_1;
            },
            function (_common_1) {
                common_1 = _common_1;
            }],
        execute: function() {
            Main = (function () {
                function Main() {
                }
                Main = __decorate([
                    angular2_1.Component({
                        selector: 'main'
                    }),
                    angular2_1.View({
                        templateUrl: 'templates/main/container.html',
                        directives: [common_1.MainHeader, common_1.MainFooter, common_1.MainRight]
                    }), 
                    __metadata('design:paramtypes', [])
                ], Main);
                return Main;
            })();
            exports_1("Main", Main);
        }
    }
});
