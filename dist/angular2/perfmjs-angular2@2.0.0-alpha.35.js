System.register('perfmjs/angular2/directives/message-event', ['angular2/src/facade/async'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        __.prototype = b.prototype;
        d.prototype = new __();
    };
    var async_1;
    var MessageEvent;
    return {
        setters: [
            function (_async_1) {
                async_1 = _async_1;
            }
        ],
        execute: function() {
            MessageEvent = (function (_super) {
                function MessageEvent(source) {
                    _super.call(this);
                    this._source = source;
                    this.initCompleted();
                }
                __extends(MessageEvent, _super);
                MessageEvent.prototype.initCompleted = function(source) {
                    var self = this;
                    if (source) {
                        this._source = source;
                    }
                    setTimeout(function () {
                        return self.next({'emit': self.emit,'source': self._source});
                    },0);
                };
                MessageEvent.prototype.emit = function(message) {
                    if (this.source && this.source.onMessage) {
                        this.source.onMessage(message);
                    } else {
                        this.onMessage(message);
                    }
                };
                MessageEvent.prototype.onMessage = function(message) {};
                return MessageEvent;
            })(async_1.EventEmitter);
            exports_1("MessageEvent", MessageEvent);
        }
    };
});

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
};System.register("perfmjs/angular2/directives/ckeditor", ['angular2/angular2', 'angular2/di', 'angular2/src/core/metadata/directives', 'perfmjs/angular2/directives/message-event'], function(exports_1) {
    var angular2_1, di_1, directives_1, message_event_1;
    var CKEditor;
    return {
        setters:[
            function (_angular2_1) {
                angular2_1 = _angular2_1;
            },
            function (_di_1) {
                di_1 = _di_1;
            },
            function (_directives_1) {
                directives_1 = _directives_1;
            },
            function (_message_event_1) {
                message_event_1 = _message_event_1;
            }],
        execute: function() {
            /**
             * ng2-ckeditor
             * 指令使用方法：<ng2ckeditor (message-event)="ng2ckeditorCompleted($event)"></ng2ckeditor>
             */
            CKEditor = (function () {
                function CKEditor(elem, renderer) {
                    this.messageEvent = new message_event_1.MessageEvent(this);
                    this.editorOptions = {
                        language: 'en',
                        uiColor: '#000000'
                    };
                    this.height = 150;
                    this.elem = elem;
                    this.renderer = renderer;
                }
                CKEditor.prototype.onInit = function () {
                    CKEDITOR.config.height = this.height;
                    CKEDITOR.config.width = 'auto';
                    if (CKEDITOR.revision == ('%RE' + 'V%') || !!CKEDITOR.plugins.get('wysiwygarea')) {
                        CKEDITOR.replace('ng2ckeditorElement');
                    }
                    else {
                        CKEDITOR.document.getById('ng2ckeditorElement').setAttribute('contenteditable', 'true');
                        CKEDITOR.inline('ng2ckeditorElement');
                    }
                };
                CKEditor.prototype.setData = function (html) {
                    CKEDITOR.instances.ng2ckeditorElement.setData(html);
                };
                CKEditor.prototype.getData = function () {
                    return CKEDITOR.instances.ng2ckeditorElement.getData();
                };
                CKEditor = __decorate([
                    angular2_1.Component({
                        selector: 'ng2ckeditor',
                        properties: ['height: ckheight'],
                        events: ['messageEvent'],
                        lifecycle: [directives_1.LifecycleEvent.onInit]
                    }),
                    angular2_1.View({
                        styles: ["\n        .ng-ckeditor {\n          border:0;\n        }\n    "],
                        template: "\n    <textarea id=\"ng2ckeditorElement\" name=\"ng2ckeditorElement\"></textarea>\n    ",
                        directives: [angular2_1.CORE_DIRECTIVES]
                    }),
                    __param(0, di_1.Inject(angular2_1.ElementRef)),
                    __param(1, di_1.Inject(angular2_1.Renderer)), 
                    __metadata('design:paramtypes', [(typeof ElementRef !== 'undefined' && ElementRef) || Object, (typeof Renderer !== 'undefined' && Renderer) || Object])
                ], CKEditor);
                return CKEditor;
            })();
            exports_1("CKEditor", CKEditor);
        }
    }
});

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
};System.register("perfmjs/angular2/directives/common-login", ['angular2/angular2', 'angular2/router', 'angular2/di', 'angular2/forms', 'perfmjs/angular2/directives/message-event', 'perfmjs/utils'], function(exports_1) {
    var angular2_1, router_1, di_1, forms_1, message_event_1, utils_1;
    var CommonLogin;
    return {
        setters:[
            function (_angular2_1) {
                angular2_1 = _angular2_1;
            },
            function (_router_1) {
                router_1 = _router_1;
            },
            function (_di_1) {
                di_1 = _di_1;
            },
            function (_forms_1) {
                forms_1 = _forms_1;
            },
            function (_message_event_1) {
                message_event_1 = _message_event_1;
            },
            function (_utils_1) {
                utils_1 = _utils_1;
            }],
        execute: function() {
            CommonLogin = (function () {
                function CommonLogin(router, location, routeParams) {
                    this.page = "login"; //login|register|registerOk|personInfo
                    this.messageEvent = new message_event_1.MessageEvent(this);
                    this.loginUserName = new forms_1.Control();
                    this.loginPasswd = new forms_1.Control();
                    this.registerUserName = new forms_1.Control();
                    this.registerPasswd = new forms_1.Control();
                    this.sourcePath = routeParams.get("sourcePath");
                    this.location = location;
                    this.router = router;
                    this.checkLogin();
                }
                CommonLogin.prototype.checkLogin = function () {
                    var self = this, token = localStorage.getItem("token");
                    this.page = 'login';
                    if (utils_1.utils.toBoolean(token)) {
                        if (localStorage.getItem('token')) {
                            utils_1.utils.fetch({
                                url: 'http://localhost:8888/youyue/user/checkToken',
                                method: 'POST'
                            }).then(function (jsonData) {
                                if (jsonData.status === 'success') {
                                    self.gotoPersonInfo();
                                }
                                else {
                                    localStorage.removeItem('token');
                                }
                            });
                        }
                    }
                };
                CommonLogin.prototype.login = function (userName, passwd) {
                    var self = this;
                    this.errorText = "";
                    if (userName.value === null || passwd.value === null) {
                        self.errorText = "用户名和密码不能为空！";
                        return;
                    }
                    utils_1.utils.fetch({
                        url: "http://localhost:8888/youyue/user/login",
                        method: 'POST',
                        jsonParam: { name: userName.value, passwd: passwd.value }
                    }).then(function (jsonData) {
                        if (jsonData.status === 'success') {
                            jsonData.result.token && localStorage.setItem('token', jsonData.result.token);
                            self.gotoPersonInfo();
                        }
                        else {
                            self.errorText = jsonData.msg;
                        }
                    });
                };
                CommonLogin.prototype.register = function (userName, passwd) {
                    var self = this;
                    this.errorText = "";
                    if (userName.value === null || passwd.value === null) {
                        self.errorText = "用户名和密码不能为空！";
                        return;
                    }
                    utils_1.utils.fetch({
                        url: "http://localhost:8888/youyue/user/register",
                        method: 'POST',
                        jsonParam: { name: userName.value, passwd: passwd.value }
                    }).then(function (jsonData) {
                        if (jsonData.status === 'success') {
                            var token = jsonData.result.token;
                            if (token.split('|').length > 1) {
                                self.loginedUser = token.split('|')[1];
                                localStorage.setItem('token', token);
                            }
                            self.gotoRegisterOk();
                        }
                        else {
                            self.errorText = jsonData.msg;
                        }
                    });
                };
                CommonLogin.prototype.goback = function () {
                    //this.location.back();
                    this.router.navigate("/" + this.sourcePath);
                };
                CommonLogin.prototype.gotoLogin = function () {
                    this.loginUserName.updateValue('');
                    this.loginPasswd.updateValue('');
                    localStorage.removeItem('token');
                    this.page = 'login';
                    this.errorText = "";
                    this.loginedUser = "";
                };
                CommonLogin.prototype.gotoRegister = function () {
                    this.registerUserName.updateValue('');
                    this.registerPasswd.updateValue('');
                    this.page = 'register';
                    this.errorText = "";
                    this.loginedUser = "";
                };
                CommonLogin.prototype.gotoRegisterOk = function () {
                    this.page = 'registerOk';
                    this.errorText = "";
                };
                CommonLogin.prototype.gotoPersonInfo = function () {
                    var token = localStorage.getItem("token");
                    if (token.split('|').length > 1) {
                        this.loginedUser = token.split('|')[1];
                    }
                    this.page = 'personInfo';
                    this.errorText = "";
                };
                CommonLogin = __decorate([
                    angular2_1.Component({
                        selector: 'common-login',
                        events: ['messageEvent']
                    }),
                    angular2_1.View({
                        styles: ["\n    .header {\n        height: 44px;\n        background: #fff;\n        box-shadow: 1px 1px 2px rgba(0,0,0,.2);\n        margin: 0 0 10px 0;\n    }\n    .clearfix {\n        zoom: 1;\n    }\n    .clearfix:after {\n        display: block;\n        clear: both;\n        height: 0;\n        visibility: hidden;\n        font-size: 0;\n        line-height: 0;\n        content: '';\n    }\n    body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, form, fieldset, input, textarea, p, blockquote, th, td {\n        padding: 0;\n        margin: 0;\n        -webkit-tap-highlight-color: rgba(255,255,255,0);\n    }\n    .top_left {\n        width: 20%;\n        text-align: left;\n    }\n    .fl {\n        float: left;\n    }\n    a:visited {\n        color: #007bed;\n    }\n    .topiconwidth {\n        width: 40px;\n        padding: 10px 0 5px 0;\n        display: inline-block;\n        text-align: center;\n    }\n    .topicon_back {\n        background-position: 0px -60px;\n    }\n    .topicon_back, .topicon_menu {\n        background-image: url(/perfmjs/example/angular2-try/images/directives/commonlogin/login_headericon.png?v=20141226001);\n        background-repeat: no-repeat;\n        width: 21px;\n        height: 21px;\n        display: inline-block;\n        margin: 0;\n        background-size: 21px 80px;\n    }\n    address, caption, cite, code, dfn, em, th, var, i {\n        font-weight: normal;\n        font-style: normal;\n    }\n    a {\n        color: #007bed;\n        text-decoration: none;\n    }\n    .top_center {\n        width: 60%;\n        text-align: center;\n        line-height: 44px;\n    }\n    .font16 {\n        font-size: 16px;\n    }\n    .fl {\n        float: left;\n    }\n    .loginbox {\n        width: 80%;\n        margin: 0px auto 0 auto;\n    }\n    .loginbox .tstxt {\n        height: 3px;\n        line-height: 35px;\n        text-align: center;\n    }\n    .loginbox dl {\n        width: 100%;\n    }\n    .loginbox dl dd {\n        width: 100%;\n        margin: 0 0 15px 0;\n    }\n    .loginbox .iptbd {\n        width: 95%;\n        border: 1px solid #e0e0e0;\n        height: 35px;\n        webkit-border-radius: 5px;\n        -moz-border-radius: 5px;\n        border-radius: 5px;\n        padding: 0 2%;\n        font-size: 12px;\n        color: #666;\n        box-shadow: 0px 0px 2px rgba(0,0,0,.2);\n    }\n    input[type=\"text\"], input[type=\"number\"], input[type=\"tel\"], input[type=\"password\"], textarea {\n        border: 1px solid #CFCFCF;\n    }\n    input[type=\"text\"], input[type=\"number\"], input[type=\"tel\"], input[type=\"password\"], input[type=\"submit\"], input[type=\"rest\"], input[type=\"button\"], button, textarea {\n        -webkit-border-radius: 0;\n        -webkit-appearance: none;\n        -moz-appearance: none;\n    }\n    input {\n        vertical-align: middle;\n    }\n    .loginbox .fltxt {\n        font-size: 12px;\n        color: #bbb;\n    }\n    .loginbox .fltxt a, .loginbox .fltxt a:visited {\n        color: #bbb;\n    }\n    .margin20 {\n        margin-top: 20px;\n    }\n    .center {\n        text-align: center;\n    }\n    .loginbox .loginbtn, .loginbox .loginbtn:visited {\n        display: inline-block;\n        width: 100%;\n        height: 36px;\n        line-height: 36px;\n        background-color: #e74c3c;\n        border-radius: 5px;\n        -webkit-border-radius: 5px;\n        -moz-border-radius: 5px;\n        color: #fff;\n        font-size: 18px;\n        text-align: center;\n        border: 1px solid #e74c3c;\n    }\n    .margin20 {\n        margin-top: 20px;\n    }\n    .center {\n        text-align: center;\n    }\n    .fontblue {\n        color: #007bed;\n    }\n    .margin_l5 {\n        margin-left: 5px;\n    }\n    .margin_r5 {\n        margin-right: 5px;\n    }\n    .gray9 {\n        color: #999;\n    }\n    .font12 {\n        font-size: 12px;\n    }\n    .loginOther {\n        width: 90%;\n        margin: 20px auto 0 auto;\n    }\n    .loginOther .loginOtherH3 {\n        color: #999;\n        line-height: 25px;\n    }\n    h1, h2, h3, h4, h5, h6 {\n        font-size: 100%;\n        font-weight: normal;\n    }\n    .loginOther ul {\n        width: 100%;\n        background-color: #fff;\n        border: 1px solid #e0e0e0;\n        padding: 4% 0 2% 0;\n        webkit-border-radius: 5px;\n        -moz-border-radius: 5px;\n        border-radius: 5px;\n    }\n    .loginOther ul li {\n        width: 23.9%;\n        display: inline-block;\n        text-align: center;\n        font-size: 12px;\n        color: #999;\n    }\n    .loginOther ul li a, .loginOther ul li a:visited {\n        color: #999;\n    }\n    /*below for personInfo*/\n    .info_list ul {\n        margin-top: .6rem;\n        border-top: 1px solid #e8e8e8;\n        border-bottom: 1px solid #e8e8e8;\n        padding-left: .23rem;\n        background: #f7f7f7;\n    }\n    .info_list li, .quit {\n        /*font-size: .3rem;*/\n        border-bottom: 1px solid #e8e8e8;\n        line-height: 3rem;\n        padding-right: .3rem;\n    }\n    ul, ol {\n        list-style-type: none;\n        list-style-image: none;\n    }\n    .info_list a {\n        display: block;\n        color: #000;\n        position: relative;\n    }\n    .info_list a:after {\n        content: \"\";\n        position: absolute;\n        top: 50%;\n        right: 0;\n        width: 0.8rem;\n        height: 0.8rem;\n        margin-top: -.1rem;\n        border-bottom: 1px solid #cac9ce;\n        border-right: 1px solid #cac9ce;\n        transform: rotate(-45deg);\n        -webkit-transform: rotate(-45deg);\n    }\n    .info_list li:last-child {\n        border-bottom: none;\n    }\n    .quit {\n        display: block;\n        text-align: center;\n        margin-top: .65rem;\n        border-top: 1px solid #e8e8e8;\n        color: #232323;\n        background: #f7f7f7;\n    }\n    "],
                        template: "\n    <div [ng-switch]=\"page\">\n    <template [ng-switch-when]=\"'login'\">\n        <header class=\"clearfix header\" style=\"margin-bottom:2px;\">\n            <div class=\"clearfix wrap2\">\n                <div class=\"fl top_left\">\n                <a href=\"javascript:void(0)\" class=\"topiconwidth\"><em class=\"topicon_back\" (^click)=\"goback()\"></em></a></div>\n                <div class=\"top_center fl font16\">\u767B\u5F55\u8D26\u6237</div>\n            </div>\n        </header>\n        <form target=\"_self\" name=\"myform\" method=\"post\">\n        <div class=\"loginbox\">\n            <div class=\"tstxt\">\n                </div>\n            <dl>\n                <dd><input class=\"iptbd\" type=\"text\" name=\"UserName\" [ng-form-control]='loginUserName' placeholder=\"\u8BF7\u8F93\u5165\u60A8\u7684\u7528\u6237\u540D\"></dd>\n                <dd><input class=\"iptbd\" type=\"password\" name=\"Passwd\" [ng-form-control]='loginPasswd' placeholder=\"\u8BF7\u8F93\u5165\u60A8\u7684\u5BC6\u7801\"></dd>\n            </dl>\n            <p style=\"color:red\">{{errorText}}</p>\n            <p><input class=\"loginbtn\" id=\"loginObj\" type=\"button\" value=\"\u767B \u5F55\" (click)=\"login(loginUserName, loginPasswd)\"></p>\n            <p class=\"center margin20\"><a href=\"javascript:void(0);\" class=\"fontblue\" (click)=\"gotoRegister()\">\u514D\u8D39\u6CE8\u518C</a></p>\n            <!--<p class=\"center margin20\"><a href=\"javascript:void(0);\" class=\"fontblue\" (click)=\"gotoRegister()\">\u514D\u8D39\u6CE8\u518C</a><em class=\"gray9 font12 margin_r5 margin_l5\">\u2502</em><a href=\"javascript:void(0)\" class=\"fontblue\">\u627E\u56DE\u5BC6\u7801</a></p>-->\n        </div>\n        </form>\n    </template>\n    <template [ng-switch-when]=\"'register'\">\n        <header class=\"clearfix header\" style=\"margin-bottom:2px;\">\n            <div class=\"clearfix wrap2\">\n                <div class=\"fl top_left\">\n                <a href=\"javascript:void(0)\" class=\"topiconwidth\"><em class=\"topicon_back\" (^click)=\"goback()\"></em></a></div>\n                <div class=\"top_center fl font16\">\u6CE8\u518C\u8D26\u6237</div>\n            </div>\n        </header>\n        <form target=\"_self\" name=\"myform\" method=\"post\">\n        <div class=\"loginbox\">\n            <div class=\"tstxt\">\n                </div>\n            <dl>\n                <dd><input class=\"iptbd\" type=\"text\" name=\"UserName\" [ng-form-control]='registerUserName' placeholder=\"\u8BF7\u8BBE\u7F6E\u7528\u6237\u540D(3-16\u4E2A\u5B57\u7B26)\"></dd>\n                <dd><input class=\"iptbd\" type=\"password\" name=\"Passwd\" [ng-form-control]='registerPasswd' placeholder=\"\u8BF7\u8BBE\u7F6E\u767B\u5F55\u5BC6\u7801(8-20\u4E2A\u5B57\u7B26)\"></dd>\n            </dl>\n            <p style=\"color:red\">{{errorText}}</p>\n            <p><input class=\"loginbtn\" id=\"loginObj\" type=\"button\" value=\"\u5B8C\u6210\u6CE8\u518C\" (click)=\"register(registerUserName, registerPasswd)\"></p>\n            <p class=\"fltxt\"><label><input name=\"StopTag\" type=\"checkbox\" disabled=\"\" value=\"1\" checked=\"checked\"><a href=\"javascript:void(0)\">\u6211\u5DF2\u9605\u8BFB\u76F8\u5173\u534F\u8BAE\u5E76\u540C\u610F\u63A5\u53D7\u300A\u6CD5\u5F8B\u58F0\u660E\u300B</a></label></p>\n            <p class=\"center\" style=\"margin-top:10px\"><a href=\"javascript:void(0);\" class=\"fontblue\" (click)=\"gotoLogin()\">\u5DF2\u6709\u5E10\u53F7\u767B\u5F55</a></p>\n        </div>\n        </form>\n    </template>\n    <template [ng-switch-when]=\"'registerOk'\">\n        <header class=\"clearfix header\" style=\"margin-bottom:2px;\">\n            <div class=\"clearfix wrap2\">\n                <div class=\"fl top_left\">\n                <a href=\"javascript:void(0)\" class=\"topiconwidth\"><em class=\"topicon_back\" (^click)=\"goback()\"></em></a></div>\n                <div class=\"top_center fl font16\">\u6CE8\u518C\u6210\u529F</div>\n            </div>\n        </header>\n        <div class=\"loginbox\" style=\"line-height:22px\">\n            <div style=\"color:blue\" (click)=\"gotoPersonInfo()\">{{loginedUser}}</div>\n            <div><b>\u606D\u559C\u4F60\u6CE8\u518C\u6210\u529F\uFF01</b></div>\n            <div><b>\u8BF7\u8BB0\u597D\u4F60\u7684\u6CE8\u518C\u5E10\u53F7\u548C\u767B\u5F55\u5BC6\u7801\uFF01</b></div>\n        </div>\n    </template>\n    <template [ng-switch-when]=\"'personInfo'\">\n        <header class=\"clearfix header\" style=\"margin-bottom:2px;\">\n            <div class=\"clearfix wrap2\">\n                <div class=\"fl top_left\">\n                <a href=\"javascript:void(0)\" class=\"topiconwidth\"><em class=\"topicon_back\" (^click)=\"goback()\"></em></a></div>\n                <div class=\"top_center fl font16\">\u4E2A\u4EBA\u4FE1\u606F</div>\n            </div>\n        </header>\n        <div>\n            <div class=\"info_list\">\n                <ul>\n                    <li><span class=\"tit\">\u6211\u7684\u6635\u79F0</span><span class=\"fr col6\">{{loginedUser}}</span></li>\n                    <li><a href=\"javascript:void(0);\"><span style=\"color:gray\">\u6211\u7684\u8D44\u6599</span></a></li>\n                </ul>\n                <ul>\n                    <li><a href=\"javascript:void(0);\"><span style=\"color:gray\">\u4F1A\u5458\u7B49\u7EA7</span>\n                    <div class=\"fr grade_box\">\n                        <span class=\"vicon v6\"></span>\n                    </div>\n                    </a></li>\n                </ul>\n            </div>\n            <a href=\"javascript:void(0);\" class=\"quit\" (click)=\"gotoLogin()\">\u9000\u51FA\u767B\u5F55</a>\n        </div>\n    </template>\n    </div>\n    <!--<section class=\"loginOther\">-->\n        <!--<h3 class=\"loginOtherH3\">\u4F7F\u7528\u5176\u5B83\u5E10\u53F7\u767B\u5F55(m.okooo.com)</h3>-->\n        <!--<ul class=\"clearfix\">-->\n              <!--<li><a href=\"/user/partner/?logintype=alipay&amp;FromUrl=%2Fuser%2F\" class=\"clickBtn loginAlipay \" name=\"\" ptype=\"\"><img src=\"/images/zfblogo.png?v=20141216001\" style=\"width:32px; height:32px;\"><br>\u652F\u4ED8\u5B9D</a></li>-->\n              <!--<li><a href=\"/user/partner/?logintype=qq&amp;FromUrl=%2Fuser%2F\" class=\"clickBtn loginQq\" name=\"\" ptype=\"\"><img src=\"/images/qqlogo.png\" style=\"width:32px; height:32px;\"><br>QQ</a></li>-->\n              <!--<li> <a href=\"/user/partner/?logintype=weibo&amp;FromUrl=%2Fuser%2F\" class=\"clickBtn loginWeibo\" name=\"\" ptype=\"\"><img src=\"/images/sinalogo.png\" style=\"width:32px; height:32px;\"><br>\u65B0\u6D6A\u5FAE\u535A</a></li>-->\n              <!--<li> <a href=\"/user/partner/?logintype=baidu&amp;FromUrl=%2Fuser%2F\" class=\"clickBtn loginbaidu\" name=\"\" ptype=\"\"><img src=\"/images/baidulogo.png\" style=\"width:32px; height:32px;\"><br>\u767E\u5EA6</a></li>-->\n        <!--</ul>-->\n    <!--</section>-->\n    ",
                        directives: [angular2_1.CORE_DIRECTIVES, forms_1.FORM_DIRECTIVES]
                    }),
                    __param(0, di_1.Inject(router_1.Router)),
                    __param(1, di_1.Inject(router_1.Location)),
                    __param(2, di_1.Inject(router_1.RouteParams)), 
                    __metadata('design:paramtypes', [(typeof Router !== 'undefined' && Router) || Object, (typeof Location !== 'undefined' && Location) || Object, (typeof RouteParams !== 'undefined' && RouteParams) || Object])
                ], CommonLogin);
                return CommonLogin;
            })();
            exports_1("CommonLogin", CommonLogin);
        }
    }
});

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
};System.register("perfmjs/angular2/directives/modal", ['angular2/angular2', 'angular2/di', 'perfmjs/utils', 'angular2/src/dom/browser_adapter', 'perfmjs/angular2/directives/message-event'], function(exports_1) {
    var angular2_1, di_1, utils_1, browser_adapter_1, message_event_1;
    var Modal;
    return {
        setters:[
            function (_angular2_1) {
                angular2_1 = _angular2_1;
            },
            function (_di_1) {
                di_1 = _di_1;
            },
            function (_utils_1) {
                utils_1 = _utils_1;
            },
            function (_browser_adapter_1) {
                browser_adapter_1 = _browser_adapter_1;
            },
            function (_message_event_1) {
                message_event_1 = _message_event_1;
            }],
        execute: function() {
            /**
             * from jquery.kmodal.js
             * 指令使用方法：<modal (message-event)="modalCompleted($event)"></modal>
             */
            Modal = (function () {
                function Modal(elem, renderer) {
                    this.messageEvent = new message_event_1.MessageEvent(this);
                    this.dom = new browser_adapter_1.BrowserDomAdapter();
                    this.params = {
                        type: "modal",
                        dialogTitle: "默认头部",
                        dialogHead: true,
                        callbackFunc: null,
                        beforeFunc: null,
                        dialogInfo: { 'dialogType': '' }
                    };
                    this.showModal = false;
                    this.showBackdrop = false;
                    this.showModalHeader = true;
                    //below for css style
                    this.kmodaloverlayClass = true;
                    this.kmodalbackdropClass = true;
                    this.kmodaladsorbClass = true;
                    this.kmodalbodyClass = false;
                    this.kmodalfooterClass = false;
                    this.modalTitle = '';
                    this.dialogType = 'confirm'; //dialogType： confirm-确认信息, success-成功, fail-失败, tips-提示信息, business－业务逻辑
                    /**
                     * e.g. dialogInfo: {
                                'dialogType':'confirm',
                                'info1':'你选择的已变为湖人[+4.5]胜1.85',
                                'info2':'是否继续竞猜？',
                                'tips':'默认竞猜所有让分值',
                                'cancel':'放弃竞猜',
                                'ok':'确认竞猜'
                            }
                     * @type {{dialogType: string}}
                     */
                    this.dialogInfo = { 'dialogType': '' };
                    this.elem = elem;
                    this.renderer = renderer;
                }
                Modal.prototype.onMessage = function (message) {
                    this.modal(message.modalParam);
                };
                Modal.prototype.modal = function (options) {
                    this.params = utils_1.utils.extend(this.params, options);
                    //判断弹窗类型
                    if (this.params.type == "overlay") {
                        this.kmodaloverlayClass = true;
                        this.kmodalbackdropClass = false;
                        this.showBackdrop = false;
                    }
                    else if (this.params.type == "adsorb") {
                        this.kmodaloverlayClass = false;
                        this.showBackdrop = true;
                        this.kmodaladsorbClass = true;
                    }
                    else {
                        this.kmodaladsorbClass = false;
                        this.kmodaloverlayClass = false;
                        this.showBackdrop = true;
                    }
                    this.kmodalbodyClass = true;
                    this.kmodalfooterClass = true;
                    this.modalTitle = this.params.dialogTitle;
                    this.dialogType = this.params.dialogInfo.dialogType;
                    this.dialogInfo = utils_1.utils.extend(this.dialogInfo, this.params.dialogInfo);
                    if (!this.params.dialogHead) {
                        this.showModalHeader = false;
                    }
                    if (this.params.beforeFunc) {
                        this.params.beforeFunc();
                    }
                    this.showModal = true;
                };
                //关闭事件以及取消绑定事件和清除样式
                Modal.prototype.closeHandler = function (event, data) {
                    this.showModal = false;
                    this.kmodaloverlayClass = false;
                    this.kmodaladsorbClass = false;
                    this.showBackdrop = false;
                    this.kmodalbodyClass = false;
                    this.kmodalfooterClass = false;
                    if (this.params.dialogHead == false) {
                        this.showModalHeader = true;
                    }
                    if (this.params.callbackFunc) {
                        this.params.callbackFunc(data);
                    }
                };
                Modal = __decorate([
                    angular2_1.Component({
                        selector: 'modal',
                        events: ['messageEvent'] //ref to: SsqBetConfirm.ts and ssqBetConfirm.html
                    }),
                    angular2_1.View({
                        styles: ["\n        .ng-showKModal {\n            display:block;\n        }\n    "],
                        template: "\n<div [ng-class]=\"{'k-modal':true,'k-modal-overlay':kmodaloverlayClass,'k-modal-adsorb':kmodaladsorbClass,'ng-showKModal':true}\" id=\"jq_modal\" *ng-if=\"showModal\">\n    <div [ng-class]=\"{'k-modal-backdrop':kmodalbackdropClass}\" *ng-if=\"showBackdrop\"></div>\n    <div class=\"k-modal-dialog\">\n        <div class=\"k-modal-content\">\n            <div class=\"k-modal-header\" *ng-if=\"showModalHeader\">\n                <button  class=\"k-close k-jq_closeModal\" (click)=\"closeHandler($event)\">&times;</button>\n                <h4 class=\"k-modal-title\">{{modalTitle}}</h4>\n            </div>\n            <div [ng-switch]=\"dialogType\">\n                <template [ng-switch-when]=\"'confirm'\">\n                    <div id=\"jq_km_bd\" [ng-class]=\"{'k-modal-body':kmodalbodyClass}\">\n                        <p class=\"tac pan_span\"><span class=\"icon_danger\"></span><span>{{dialogInfo.info1}}</span></p><p class=\"fs36 tac mt10\">{{dialogInfo.info2}}</p><p class=\"mt10 c666\">{{dialogInfo.tips}}</p>\n                    </div>\n                    <div id=\"jq_km_ft\" [ng-class]=\"{'k-modal-footer':kmodalfooterClass}\">\n                        <ul class=\"flex_equal\"><li><button class=\"k-btn k-btn-default k-btn-block k-jq_closeModal\" (click)=\"closeHandler($event)\">{{dialogInfo.cancel}}</button></li><li class=\"ml10\"><button class=\"k-btn k-btn-success k-btn-block\" (click)=\"closeHandler($event,'ok')\">{{dialogInfo.ok}}</button></li></ul>\n                    </div>\n                </template>\n                <template [ng-switch-when]=\"'success'\">\n                    <div id=\"jq_km_bd\" [ng-class]=\"{'k-modal-body':kmodalbodyClass}\">\n                        <p class=\"tac\"><span class=\"icon_success\"></span></p><p class=\"fs36 tac mt10\">{{dialogInfo.tips}}</p>\n                    </div>\n                    <div id=\"jq_km_ft\" [ng-class]=\"{'k-modal-footer':kmodalfooterClass}\">\n                        <button class=\"k-btn k-btn-danger k-btn-block k-jq_closeModal\" (click)=\"closeHandler($event)\">{{dialogInfo.ok}}</button><ul class=\"mt10 flex_equal tac\"><li><a class=\"icon_check\" href=\"javascript:void(0)\">{{dialogInfo.info1}}</a></li><li><a class=\"icon_share\" href=\"javascript:void(0)\">{{dialogInfo.info2}}</a></li></ul>\n                    </div>\n                </template>\n                <template [ng-switch-when]=\"'fail'\">\n                    <div id=\"jq_km_bd\" [ng-class]=\"{'k-modal-body':kmodalbodyClass}\">\n                        <p class=\"tac\"><span class=\"icon_error\"></span></p><p class=\"fs36 tac mt10\">{{dialogInfo.tips}}</p>\n                    </div>\n                    <div id=\"jq_km_ft\" [ng-class]=\"{'k-modal-footer':kmodalfooterClass}\">\n                        <button class=\"k-btn k-btn-danger k-btn-block k-jq_closeModal\" (click)=\"closeHandler($event)\">{{dialogInfo.ok}}</button><ul class=\"mt10 flex_equal tac\"><li><a class=\"icon_check\" href=\"javascript:void(0)\">{{dialogInfo.info1}}</a></li><li><a class=\"icon_share\" href=\"javascript:void(0)\">{{dialogInfo.info2}}</a></li></ul>\n                    </div>\n                </template>\n                <template [ng-switch-when]=\"'tips'\">\n                    <div id=\"jq_km_bd\" [ng-class]=\"{'k-modal-body':kmodalbodyClass}\">\n                        <ul><li>1</li><li>2</li><li>3</li></ul><table><tr><td align=\"center\">table</td><td align=\"center\">table</td></tr><tr><td align=\"center\">table</td><td align=\"center\">table</td></tr></table>\n                    </div>\n                    <div id=\"jq_km_ft\" [ng-class]=\"{'k-modal-footer':kmodalfooterClass}\">\n                        <div class=\"flex_equal\"><li><button class=\"k-btn k-btn-info k-btn-block k-jq_closeModal\">{{dialogInfo.cancel}}</button></li><li><button class=\"k-btn k-btn-warning k-btn-block ml10\">{{dialogInfo.ok}}</button></li></div>\n                    </div>\n                </template>\n                <template [ng-switch-when]=\"'business'\">\n                    <div id=\"jq_km_bd\" [ng-class]=\"{'k-modal-body':kmodalbodyClass}\">\n                        <div><p>\u7ADE\u731C <input class=\"inp_txt\" type=\"text\" value=\"100\"> \u731C\u8C46\uFF0C\u731C\u5BF9\u53EF\u5F97<span class=\"red\">185</span></p></div><div class=\"tac faq_list mt10\"><ul class=\"flex_equal\"><li><div class=\"dvm\"><p>\u5168\u538B</p></div></li><li><div class=\"dvm\"><p>10</p></div></li><li><div class=\"dvm\"><p>100</p></div></li><li class=\"current\"><div class=\"dvm\"><p>1000</p></div></li></ul></div>\n                    </div>\n                    <div id=\"jq_km_ft\" [ng-class]=\"{'k-modal-footer':kmodalfooterClass}\">\n                        <strong class=\"red\">\u60A8\u5DF2\u5B64\u6CE8\u4E00\u63B7\uFF0C\u8BF7\u8C28\u614E\uFF01</strong><button class=\"k-btn k-btn-success ml10 k-jq_closeModal\" (click)=\"closeHandler($event)\">\u786E\u8BA4\u7ADE\u731C</button>\n                    </div>\n                </template>\n            </div>\n        </div>\n    </div>\n</div>\n    ",
                        directives: [angular2_1.CORE_DIRECTIVES]
                    }),
                    __param(0, di_1.Inject(angular2_1.ElementRef)),
                    __param(1, di_1.Inject(angular2_1.Renderer)), 
                    __metadata('design:paramtypes', [(typeof ElementRef !== 'undefined' && ElementRef) || Object, (typeof Renderer !== 'undefined' && Renderer) || Object])
                ], Modal);
                return Modal;
            })();
            exports_1("Modal", Modal);
        }
    }
});

System.register("perfmjs/angular2/directives/popup", [], function(exports_1) {
    var Popup, popup;
    return {
        setters:[],
        execute: function() {
            Popup = (function () {
                function Popup() {
                }
                /**
                 * 参考：http://html5beta.com/jquery-2/popup-js-a-light-weight-jquery-popup-plugin/
                 * e.g.
                 * 在class中：import {popup} from 'perfmjs/angular2/directives/popup';
                 * 调用：popup.pop('弹出信息');
                 * @param msg, the html message,eg :  <p>弹出信息</p>
                 * @param timer, time before popout
                 */
                Popup.prototype.pop = function (msg, timer) {
                    var self = this, ht = '<div id="ng2popup" style="display:block;position:absolute;top:' + (document.documentElement.scrollTop + document.body.scrollTop + document.documentElement.clientHeight / 2) + 'px;left:10px;' +
                        //'left:' + Math.floor(document.documentElement.clientWidth/2-50)+ 'px;' +
                        'text-align:center;background:rgba(77,77,77,0.9);border:1px solid #999;z-index:1200;box-shadow:0 0 5px rgba(0,0,0,.4)">' +
                        '<div class="ng2popup-content" style="padding:10px;color:white"></div></div>';
                    this.removePop();
                    if (document.querySelectorAll('#ng2popupdiv').length < 1) {
                        var ng2popupDiv = document.createElement("div");
                        ng2popupDiv.setAttribute('id', 'ng2popupdiv');
                        document.body.appendChild(ng2popupDiv);
                    }
                    document.querySelectorAll('#ng2popupdiv')[0].innerHTML += ht;
                    document.querySelectorAll('#ng2popup .ng2popup-content')[0].innerHTML = msg;
                    setTimeout(function () { self.removePop(); }, timer ? timer : 1500);
                };
                Popup.prototype.removePop = function () {
                    var popupElement = document.querySelectorAll("#ng2popup");
                    if (popupElement.length > 0) {
                        popupElement[0].parentNode.removeChild(popupElement[0]);
                    }
                };
                return Popup;
            })();
            exports_1("popup", popup = new Popup());
        }
    }
});
