import {Component, View, Injectable, CORE_DIRECTIVES, ElementRef, Renderer, Directive} from 'angular2/angular2';
import {Inject} from 'angular2/di';
import {RouteConfig, Router, RouterOutlet, RouterLink, routerInjectables} from 'angular2/router';
import {FormBuilder, Validators, FORM_DIRECTIVES, ControlGroup, Control} from 'angular2/forms';

import {Start} from './start';
import {CommonService} from '../services/common-service';

@Directive({selector: '[red]'})
class RedDec {
    constructor(@Inject(ElementRef) el: ElementRef, @Inject(Renderer) renderer: Renderer) {
        renderer.setElementStyle(el, 'color', 'blue');
    }
}

@Component({
    selector: 'login'
})
@View({
    templateUrl: 'templates/login.html',
    directives: [CORE_DIRECTIVES, RouterOutlet, RouterLink, FORM_DIRECTIVES, RedDec]
})
export class Login {
    router:Router;
    loginControl:LoginControl;

    constructor(@Inject(Router) router: Router, commonService: CommonService) {
        this.loginControl = new LoginControl();
        this.router = router;
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
