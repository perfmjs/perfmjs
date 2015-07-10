import {Component, View, coreDirectives} from 'angular2/angular2';
import {Inject} from 'angular2/di';
import {RouteConfig, Router, RouterOutlet, RouterLink, routerInjectables} from 'angular2/router';
import {FormBuilder, Validators, formDirectives, ControlGroup, Control} from 'angular2/forms';

import {Start} from './start';
import {CommonService} from '../services/common-service';
import {NeedsGreeter, Greeter, Tooltip} from '../directives/greeter';

@Component({
    selector: 'login',
    appInjector: [routerInjectables],
    viewInjector: [Greeter]
})
@View({
    templateUrl: 'templates/login.html',
    directives: [coreDirectives, RouterOutlet, RouterLink, formDirectives, NeedsGreeter, Tooltip]
})
export class Login {
    router: Router;
    loginControl: LoginControl;
    commonService: CommonService;

    constructor(@Inject(Router) router: Router, commonService: CommonService) {
        this.loginControl = new LoginControl();
        this.router = router;
        this.commonService = commonService;
    }

    login(loginControl: LoginControl) {
        if (loginControl.passwd.value === '123') {
            console.log("登录成功！");
            this.router.navigate('/zhuanpan');
        } else {
            console.log("请输入正确的密码！");
        }
    }

    reset() {
        this.loginControl.reset();
    }
}

class LoginControl {

    email: Control = new Control('conghui.shen@xxx.com');
    passwd: Control = new Control('123');
    checkCode: Control = new Control('selse');
    rememberMe: Control = new Control(true);

    constructor() {
    }

    reset() {
        this.email.updateValue("conghui.shen@qq.com");
        this.passwd.updateValue("123");
        this.checkCode.updateValue("selse");
        this.rememberMe.updateValue(true);

    }
}
