perfmjs.plugin('userConfig', function($$) {
    $$.base("appConfig.userConfig");
    $$.userConfig.defaults = {
        'amd.baseUrl': '/perfmjs/',
        'amd.app.modules': {
            'ng-model': {'alias':'example/angular/ng-model'},
            'angular-route': {'alias':'example/angular/angular-route'},
            'ngResource': {'alias':'example/angular/angular-resource'},
            'ngCookies': {'alias':'example/angular/angular-cookies'},
            //具体业务类
            'angular': {'alias':'example/angular/angular'},
            'ng-app': {'alias':'example/angular/ng-app'},
            'ngServices': {'alias':'example/angular/services/service'},
            'ngDirectives': {'alias':'example/angular/directives/directive'},
            'ngControllers': {'alias':'example/angular/controllers/controller'},
            'angular-mock': {'alias':'test/widget/angular/angular-mocks'},
            //测试类
            'angular-test-spec': {'alias':'test/widget/angular/spec'},
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