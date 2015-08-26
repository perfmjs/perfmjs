import {Component, View, Injectable, CORE_DIRECTIVES, Directive, ElementRef, Renderer} from 'angular2/angular2';
import {RouteConfig, Router, RouterOutlet, RouterLink, routerInjectables, Location, RouteParams} from 'angular2/router';
import {Inject, bind} from 'angular2/di';
import {FormBuilder, Validators, FORM_DIRECTIVES, ControlGroup, Control} from 'angular2/forms';

import {MessageEvent} from 'perfmjs/angular2/directives/message-event';
import {utils} from 'perfmjs/utils';

@Component({
    selector: 'common-login',
    events: ['messageEvent']
})
@View({
    styles: [`
    .header {
        height: 44px;
        background: #fff;
        box-shadow: 1px 1px 2px rgba(0,0,0,.2);
        margin: 0 0 10px 0;
    }
    .clearfix {
        zoom: 1;
    }
    .clearfix:after {
        display: block;
        clear: both;
        height: 0;
        visibility: hidden;
        font-size: 0;
        line-height: 0;
        content: '';
    }
    body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, form, fieldset, input, textarea, p, blockquote, th, td {
        padding: 0;
        margin: 0;
        -webkit-tap-highlight-color: rgba(255,255,255,0);
    }
    .top_left {
        width: 20%;
        text-align: left;
    }
    .fl {
        float: left;
    }
    a:visited {
        color: #007bed;
    }
    .topiconwidth {
        width: 40px;
        padding: 10px 0 5px 0;
        display: inline-block;
        text-align: center;
    }
    .topicon_back {
        background-position: 0px -60px;
    }
    .topicon_back, .topicon_menu {
        background-image: url(/perfmjs/example/angular2-try/images/directives/commonlogin/login_headericon.png?v=20141226001);
        background-repeat: no-repeat;
        width: 21px;
        height: 21px;
        display: inline-block;
        margin: 0;
        background-size: 21px 80px;
    }
    address, caption, cite, code, dfn, em, th, var, i {
        font-weight: normal;
        font-style: normal;
    }
    a {
        color: #007bed;
        text-decoration: none;
    }
    .top_center {
        width: 60%;
        text-align: center;
        line-height: 44px;
    }
    .font16 {
        font-size: 16px;
    }
    .fl {
        float: left;
    }
    .loginbox {
        width: 80%;
        margin: 0px auto 0 auto;
    }
    .loginbox .tstxt {
        height: 3px;
        line-height: 35px;
        text-align: center;
    }
    .loginbox dl {
        width: 100%;
    }
    .loginbox dl dd {
        width: 100%;
        margin: 0 0 15px 0;
    }
    .loginbox .iptbd {
        width: 95%;
        border: 1px solid #e0e0e0;
        height: 35px;
        webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        padding: 0 2%;
        font-size: 12px;
        color: #666;
        box-shadow: 0px 0px 2px rgba(0,0,0,.2);
    }
    input[type="text"], input[type="number"], input[type="tel"], input[type="password"], textarea {
        border: 1px solid #CFCFCF;
    }
    input[type="text"], input[type="number"], input[type="tel"], input[type="password"], input[type="submit"], input[type="rest"], input[type="button"], button, textarea {
        -webkit-border-radius: 0;
        -webkit-appearance: none;
        -moz-appearance: none;
    }
    input {
        vertical-align: middle;
    }
    .loginbox .fltxt {
        font-size: 12px;
        color: #bbb;
    }
    .loginbox .fltxt a, .loginbox .fltxt a:visited {
        color: #bbb;
    }
    .margin20 {
        margin-top: 20px;
    }
    .center {
        text-align: center;
    }
    .loginbox .loginbtn, .loginbox .loginbtn:visited {
        display: inline-block;
        width: 100%;
        height: 36px;
        line-height: 36px;
        background-color: #e74c3c;
        border-radius: 5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        color: #fff;
        font-size: 18px;
        text-align: center;
        border: 1px solid #e74c3c;
    }
    .margin20 {
        margin-top: 20px;
    }
    .center {
        text-align: center;
    }
    .fontblue {
        color: #007bed;
    }
    .margin_l5 {
        margin-left: 5px;
    }
    .margin_r5 {
        margin-right: 5px;
    }
    .gray9 {
        color: #999;
    }
    .font12 {
        font-size: 12px;
    }
    .loginOther {
        width: 90%;
        margin: 20px auto 0 auto;
    }
    .loginOther .loginOtherH3 {
        color: #999;
        line-height: 25px;
    }
    h1, h2, h3, h4, h5, h6 {
        font-size: 100%;
        font-weight: normal;
    }
    .loginOther ul {
        width: 100%;
        background-color: #fff;
        border: 1px solid #e0e0e0;
        padding: 4% 0 2% 0;
        webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
    }
    .loginOther ul li {
        width: 23.9%;
        display: inline-block;
        text-align: center;
        font-size: 12px;
        color: #999;
    }
    .loginOther ul li a, .loginOther ul li a:visited {
        color: #999;
    }
    /*below for personInfo*/
    .info_list ul {
        margin-top: .6rem;
        border-top: 1px solid #e8e8e8;
        border-bottom: 1px solid #e8e8e8;
        padding-left: .23rem;
        background: #f7f7f7;
    }
    .info_list li, .quit {
        /*font-size: .3rem;*/
        border-bottom: 1px solid #e8e8e8;
        line-height: 3rem;
        padding-right: .3rem;
    }
    ul, ol {
        list-style-type: none;
        list-style-image: none;
    }
    .info_list a {
        display: block;
        color: #000;
        position: relative;
    }
    .info_list a:after {
        content: "";
        position: absolute;
        top: 50%;
        right: 0;
        width: 0.8rem;
        height: 0.8rem;
        margin-top: -.1rem;
        border-bottom: 1px solid #cac9ce;
        border-right: 1px solid #cac9ce;
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
    }
    .info_list li:last-child {
        border-bottom: none;
    }
    .quit {
        display: block;
        text-align: center;
        margin-top: .65rem;
        border-top: 1px solid #e8e8e8;
        color: #232323;
        background: #f7f7f7;
    }
    `],
    template: `
    <div [ng-switch]="page">
    <template [ng-switch-when]="'login'">
        <header class="clearfix header" style="margin-bottom:2px;">
            <div class="clearfix wrap2">
                <div class="fl top_left">
                <a href="javascript:void(0)" class="topiconwidth"><em class="topicon_back" (^click)="goback()"></em></a></div>
                <div class="top_center fl font16">登录账户</div>
            </div>
        </header>
        <form target="_self" name="myform" method="post">
        <div class="loginbox">
            <div class="tstxt">
                </div>
            <dl>
                <dd><input class="iptbd" type="text" name="UserName" [ng-form-control]='loginUserName' placeholder="请输入您的用户名"></dd>
                <dd><input class="iptbd" type="password" name="Passwd" [ng-form-control]='loginPasswd' placeholder="请输入您的密码"></dd>
            </dl>
            <p style="color:red">{{errorText}}</p>
            <p><input class="loginbtn" id="loginObj" type="button" value="登 录" (click)="login(loginUserName, loginPasswd)"></p>
            <p class="center margin20"><a href="javascript:void(0);" class="fontblue" (click)="gotoRegister()">免费注册</a></p>
            <!--<p class="center margin20"><a href="javascript:void(0);" class="fontblue" (click)="gotoRegister()">免费注册</a><em class="gray9 font12 margin_r5 margin_l5">│</em><a href="javascript:void(0)" class="fontblue">找回密码</a></p>-->
        </div>
        </form>
    </template>
    <template [ng-switch-when]="'register'">
        <header class="clearfix header" style="margin-bottom:2px;">
            <div class="clearfix wrap2">
                <div class="fl top_left">
                <a href="javascript:void(0)" class="topiconwidth"><em class="topicon_back" (^click)="goback()"></em></a></div>
                <div class="top_center fl font16">注册账户</div>
            </div>
        </header>
        <form target="_self" name="myform" method="post">
        <div class="loginbox">
            <div class="tstxt">
                </div>
            <dl>
                <dd><input class="iptbd" type="text" name="UserName" [ng-form-control]='registerUserName' placeholder="请设置用户名(3-16个字符)"></dd>
                <dd><input class="iptbd" type="password" name="Passwd" [ng-form-control]='registerPasswd' placeholder="请设置登录密码(8-20个字符)"></dd>
            </dl>
            <p style="color:red">{{errorText}}</p>
            <p><input class="loginbtn" id="loginObj" type="button" value="完成注册" (click)="register(registerUserName, registerPasswd)"></p>
            <p class="fltxt"><label><input name="StopTag" type="checkbox" disabled="" value="1" checked="checked"><a href="javascript:void(0)">我已阅读相关协议并同意接受《法律声明》</a></label></p>
            <p class="center" style="margin-top:10px"><a href="javascript:void(0);" class="fontblue" (click)="gotoLogin()">已有帐号登录</a></p>
        </div>
        </form>
    </template>
    <template [ng-switch-when]="'registerOk'">
        <header class="clearfix header" style="margin-bottom:2px;">
            <div class="clearfix wrap2">
                <div class="fl top_left">
                <a href="javascript:void(0)" class="topiconwidth"><em class="topicon_back" (^click)="goback()"></em></a></div>
                <div class="top_center fl font16">注册成功</div>
            </div>
        </header>
        <div class="loginbox" style="line-height:22px">
            <div style="color:blue" (click)="gotoPersonInfo()">{{loginedUser}}</div>
            <div><b>恭喜你注册成功！</b></div>
            <div><b>请记好你的注册帐号和登录密码！</b></div>
        </div>
    </template>
    <template [ng-switch-when]="'personInfo'">
        <header class="clearfix header" style="margin-bottom:2px;">
            <div class="clearfix wrap2">
                <div class="fl top_left">
                <a href="javascript:void(0)" class="topiconwidth"><em class="topicon_back" (^click)="goback()"></em></a></div>
                <div class="top_center fl font16">个人信息</div>
            </div>
        </header>
        <div>
            <div class="info_list">
                <ul>
                    <li><span class="tit">我的昵称</span><span class="fr col6">{{loginedUser}}</span></li>
                    <li><a href="javascript:void(0);"><span style="color:gray">我的资料</span></a></li>
                </ul>
                <ul>
                    <li><a href="javascript:void(0);"><span style="color:gray">会员等级</span>
                    <div class="fr grade_box">
                        <span class="vicon v6"></span>
                    </div>
                    </a></li>
                </ul>
            </div>
            <a href="javascript:void(0);" class="quit" (click)="gotoLogin()">退出登录</a>
        </div>
    </template>
    </div>
    <!--<section class="loginOther">-->
        <!--<h3 class="loginOtherH3">使用其它帐号登录(m.okooo.com)</h3>-->
        <!--<ul class="clearfix">-->
              <!--<li><a href="/user/partner/?logintype=alipay&amp;FromUrl=%2Fuser%2F" class="clickBtn loginAlipay " name="" ptype=""><img src="/images/zfblogo.png?v=20141216001" style="width:32px; height:32px;"><br>支付宝</a></li>-->
              <!--<li><a href="/user/partner/?logintype=qq&amp;FromUrl=%2Fuser%2F" class="clickBtn loginQq" name="" ptype=""><img src="/images/qqlogo.png" style="width:32px; height:32px;"><br>QQ</a></li>-->
              <!--<li> <a href="/user/partner/?logintype=weibo&amp;FromUrl=%2Fuser%2F" class="clickBtn loginWeibo" name="" ptype=""><img src="/images/sinalogo.png" style="width:32px; height:32px;"><br>新浪微博</a></li>-->
              <!--<li> <a href="/user/partner/?logintype=baidu&amp;FromUrl=%2Fuser%2F" class="clickBtn loginbaidu" name="" ptype=""><img src="/images/baidulogo.png" style="width:32px; height:32px;"><br>百度</a></li>-->
        <!--</ul>-->
    <!--</section>-->
    `,
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class CommonLogin {
    page:string = "login"; //login|register|registerOk|personInfo
    messageEvent:MessageEvent = new MessageEvent(this);
    sourcePath:string;
    location:Location;
    router:Router;
    loginUserName:Control = new Control();
    loginPasswd:Control = new Control();
    registerUserName: Control = new Control();
    registerPasswd: Control = new Control();
    errorText:string;
    registerOkInfo:string;
    loginedUser:string;

    constructor(@Inject(Router) router:Router, @Inject(Location) location:Location, @Inject(RouteParams) routeParams:RouteParams) {
        this.sourcePath = routeParams.get("sourcePath");
        this.location = location;
        this.router = router;
        this.checkLogin();
    }

    checkLogin() {
        var self = this, token = localStorage.getItem("token");
        this.page = 'login';
        if (utils.toBoolean(token)) {
            if (localStorage.getItem('token')) {
                utils.fetch({
                    url: 'http://localhost:8888/youyue/user/checkToken',
                    method: 'POST'
                }).then(function(jsonData) {
                    if (jsonData.status === 'success') {
                        self.gotoPersonInfo();
                    }
                });
            }
        }
    }
    login(userName:Control, passwd:Control):void {
        var self = this;
        this.errorText = "";
        if (userName.value === null || passwd.value === null) {
            self.errorText = "用户名和密码不能为空！";
            return;
        }
        utils.fetch({
            url: "http://localhost:8888/youyue/user/login",
            method: 'POST',
            jsonParam: {name:userName.value, passwd:passwd.value}
        }).then(function(jsonData) {
            if (jsonData.status === 'success') {
                jsonData.result.token && localStorage.setItem('token', jsonData.result.token);
                self.gotoPersonInfo();
            } else {
                self.errorText = jsonData.msg;
            }
        });
    }

    register(userName:Control, passwd:Control):void {
        var self = this;
        this.errorText = "";
        if (userName.value === null || passwd.value === null) {
            self.errorText = "用户名和密码不能为空！";
            return;
        }
        utils.fetch({
            url: "http://localhost:8888/youyue/user/register",
            method: 'POST',
            jsonParam: {name:userName.value, passwd:passwd.value}
        }).then(function(jsonData) {
            if (jsonData.status === 'success') {
                var token = jsonData.result.token;
                if (token.split('|').length>1) {
                    self.loginedUser = token.split('|')[1];
                    localStorage.setItem('token', token);
                }
                self.gotoRegisterOk();
            } else {
                self.errorText = jsonData.msg;
            }
        });
    }

    goback() {
        //this.location.back();
        this.router.navigate("/" + this.sourcePath);
    }
    gotoLogin() {
        this.loginUserName.updateValue('');
        this.loginPasswd.updateValue('');
        localStorage.removeItem('token');
        this.page = 'login';
        this.errorText = "";
        this.loginedUser = "";
    }
    gotoRegister() {
        this.registerUserName.updateValue('');
        this.registerPasswd.updateValue('');
        this.page = 'register';
        this.errorText = "";
        this.loginedUser = "";
    }
    gotoRegisterOk() {
        this.page = 'registerOk';
        this.errorText = "";
    }
    gotoPersonInfo() {
        var token = localStorage.getItem("token");
        if (token.split('|').length>1) {
            this.loginedUser = token.split('|')[1];
        }
        this.page = 'personInfo';
        this.errorText = "";
    }
}