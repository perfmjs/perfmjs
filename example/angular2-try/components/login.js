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
var forms_1 = require('angular2/forms');
var common_service_1 = require('../services/common-service');
var greeter_1 = require('../directives/greeter');
var Login = (function () {
    function Login(router, commonService) {
        this.loginControl = new LoginControl();
        this.router = router;
        this.commonService = commonService;
    }
    Login.prototype.login = function (loginControl) {
        if (loginControl.passwd.value === '123') {
            console.log("登录成功！");
            this.router.navigate('/zhuanpan');
        }
        else {
            console.log("请输入正确的密码！");
        }
    };
    Login.prototype.reset = function () {
        this.loginControl.reset();
    };
    Login = __decorate([
        angular2_1.Component({
            selector: 'login',
            appInjector: [router_1.routerInjectables],
            viewInjector: [greeter_1.Greeter]
        }),
        angular2_1.View({
            templateUrl: 'templates/Login.html?v=' + (new Date()),
            directives: [angular2_1.coreDirectives, router_1.RouterOutlet, router_1.RouterLink, forms_1.formDirectives, greeter_1.NeedsGreeter, greeter_1.Tooltip]
        }),
        __param(0, di_1.Inject(router_1.Router)), 
        __metadata('design:paramtypes', [(typeof Router !== 'undefined' && Router) || Object, common_service_1.CommonService])
    ], Login);
    return Login;
})();
exports.Login = Login;
var LoginControl = (function () {
    function LoginControl() {
        this.email = new forms_1.Control('conghui.shen@xxx.com');
        this.passwd = new forms_1.Control('123');
        this.checkCode = new forms_1.Control('selse');
        this.rememberMe = new forms_1.Control(true);
    }
    LoginControl.prototype.reset = function () {
        this.email.updateValue("conghui.shen@qq.com");
        this.passwd.updateValue("123");
        this.checkCode.updateValue("selse");
        this.rememberMe.updateValue(true);
    };
    return LoginControl;
})();
