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
};System.register(['angular2/angular2', 'angular2/di', 'angular2/router', 'angular2/forms', '../services/common.service', '../directives/greeter'], function(exports_1) {
    var angular2_1, di_1, router_1, forms_1, common_service_1, greeter_1;
    var Login, LoginControl;
    return {
        setters:[
            function (_angular2_1) {
                angular2_1 = _angular2_1;
            },
            function (_di_1) {
                di_1 = _di_1;
            },
            function (_router_1) {
                router_1 = _router_1;
            },
            function (_forms_1) {
                forms_1 = _forms_1;
            },
            function (_common_service_1) {
                common_service_1 = _common_service_1;
            },
            function (_greeter_1) {
                greeter_1 = _greeter_1;
            }],
        execute: function() {
            Login = (function () {
                function Login(router, commonService) {
                    this.loginControl = new LoginControl();
                    this.router = router;
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
                        viewInjector: [greeter_1.Greeter]
                    }),
                    angular2_1.View({
                        templateUrl: 'templates/login.html',
                        directives: [angular2_1.coreDirectives, router_1.RouterOutlet, router_1.RouterLink, forms_1.formDirectives, greeter_1.NeedsGreeter, greeter_1.Tooltip]
                    }),
                    __param(0, di_1.Inject(router_1.Router)), 
                    __metadata('design:paramtypes', [(typeof Router !== 'undefined' && Router) || Object, common_service_1.CommonService])
                ], Login);
                return Login;
            })();
            exports_1("Login", Login);
            LoginControl = (function () {
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
        }
    }
});
