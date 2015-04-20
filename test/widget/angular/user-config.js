perfmjs.plugin('userConfig', function($$) {
    $$.base("appConfig.userConfig");
    $$.userConfig.defaults = {
        'amd.baseUrl': '/perfmjs/',
        'amd.app.modules': {
            'angular-route': {'alias':'example/angular/angular-route'},
            'ngResource': {'alias':'example/angular/angular-resource'},
            'ngCookies': {'alias':'example/angular/angular-cookies'},
            'angular-mock': {'alias':'test/widget/angular/angular-mocks'},
            'ng-infinite-scroll': {'alias':'example/angular/ng-infinite-scroll'},
            //具体业务类
            'angular': {'alias':'example/angular/angular'},
            'ng-app': {'alias':'example/angular/ng-app'},
            'ng-model': {'alias':'example/angular/ng-model'},
            'ng-service': {'alias':'example/angular/services/service'},
            'ng-directive': {'alias':'example/angular/directives/directive'},
            'ng-controller': {'alias':'example/angular/controllers/controller'},
            'ng-directive-money': {'alias':'example/angular/directives/money'},
            'ng-directive-login': {'alias':'example/angular/directives/login/login'},
            end: 0
        },
        'amd.app.shim': {
            'jquery':{
                'deps': [],
                'init': function() {
                    return jQuery;
                }
            },
            'angular':{
                'deps': [],
                'init': function($) {
                    return angular;
                }
            },
            'angular-route':{
                'deps': ['angular'],
                'init': function(angular) {
                    return angular;
                }
            },
            'angular-mock':{
                'deps': ['angular'],
                'init': function(angular) {
                    return angular;
                }
            },
            end: 0
        },
        end: 0
    };
    //替换整个应用配置信息为该文件中的个性化配置
    $$.appConfig = $$.userConfig;
});