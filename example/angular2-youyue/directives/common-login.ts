import {Component, View, Injectable, CORE_DIRECTIVES, Directive, ElementRef, Renderer} from 'angular2/angular2';
import {RouteConfig, Router, RouterOutlet, RouterLink, routerInjectables, Location, RouteParams} from 'angular2/router';
import {Inject, bind} from 'angular2/di';
import {FormBuilder, Validators, FORM_DIRECTIVES, ControlGroup, Control} from 'angular2/forms';

import {MessageEvent} from './message-event';
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
    `],
    template: `
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
            <dd><input class="iptbd" type="text" name="UserName" [ng-form-control]='userName' placeholder="请输入您的用户名"></dd>
            <dd><input class="iptbd" type="password" name="Passwd" [ng-form-control]='passwd' placeholder="请输入您的密码"></dd>
        </dl>
        <p style="color:red">{{errorText}}</p>
        <p><input class="loginbtn" id="loginObj" type="button" value="登 录" (click)="register(userName, passwd)"></p>
        <p class="center margin20"><a href="/user/reg.php?FromUrl=%2Fuser%2F" class="fontblue">免费注册</a><em class="gray9 font12 margin_r5 margin_l5">│</em><a href="./findpassword.php?FromUrl=%2Fuser%2F" class="fontblue">找回密码</a></p>
    </div>
    </form>
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
    messageEvent:MessageEvent = new MessageEvent(this);
    sourcePath:string;
    location:Location;
    router:Router;
    userName: Control = new Control();
    passwd: Control = new Control();
    errorText:string;

    constructor(@Inject(Router) router:Router, @Inject(Location) location:Location, @Inject(RouteParams) routeParams:RouteParams) {
        this.sourcePath = routeParams.get("sourcePath");
        this.location = location;
        this.router = router;
    }

    register(userName:Control, passwd:Control):boolean {
        var self = this;
        this.errorText = "";
        if (userName.value === null || passwd.value === null) {
            self.errorText = "用户名和密码不能为空！";
            return;
        }
        utils.fetch("http://localhost:8888/youyue/user/register", function(jsonData) {
            if (jsonData.status === 'success') {
                localStorage.setItem('loginUser', jsonData.result.name);
                self.goback();
            } else {
                self.errorText = jsonData.msg;
            }
        }, {name:userName.value, passwd:passwd.value}, 'POST');
        return true;
    }

    goback() {
        //this.location.back();
        this.router.navigate("/" + this.sourcePath);
    }
}