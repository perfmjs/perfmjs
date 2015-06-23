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
if (typeof __param !== "function") __param = function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var angular2_1 = require('angular2/angular2');
var di_1 = require('angular2/di');
var router_1 = require('angular2/router');
var zippy_1 = require('./zippy');
var start_1 = require('./start');
var FriendService_1 = require('../services/FriendService');
var RouterApp = (function () {
    function RouterApp(router, friendService) {
        this.myName = 'AngularJS2@爱彩';
        this.names = friendService.names;
        this.router = router;
        this.router.config([
            { path: '/start', component: start_1.Start, as: 'start' }
        ]);
    }
    RouterApp.prototype.myCtrlMethod = function (inputStr) {
        alert('call myControllerMethod:' + inputStr);
        this.router.navigate('/start');
    };
    RouterApp = __decorate([
        angular2_1.Component({
            selector: 'router-app',
            injectables: [FriendService_1.FriendService]
        }),
        angular2_1.View({
            templateUrl: 'templates/app.html',
            directives: [angular2_1.NgFor, angular2_1.NgIf, router_1.RouterOutlet, router_1.RouterLink, zippy_1.Zippy]
        }),
        __param(0, di_1.Inject(router_1.Router)), 
        __metadata('design:paramtypes', [(typeof Router !== 'undefined' && Router) || Object, FriendService_1.FriendService])
    ], RouterApp);
    return RouterApp;
})();
exports.RouterApp = RouterApp;
