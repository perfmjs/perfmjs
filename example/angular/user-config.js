perfmjs.plugin('userConfig', function($$) {
    $$.base("appConfig.userConfig", {});
    $$.userConfig.defaults = {
        'amd.baseUrl': '/perfmjs/',
        'amd.app.modules': {
            'angular': {'alias':'example/angular/angular'},
            'angular-route': {'alias':'example/angular/angular-route'},
            'ngResource': {'alias':'example/angular/angular-resource'},
            'ngCookies': {'alias':'example/angular/angular-cookies'},
            //具体业务类
            'ng-app': {'alias':'example/angular/ng-app'},
            'ng-model': {'alias':'example/angular/ng-model'},
            'ngServices': {'alias':'example/angular/services/service'},
            'ngDirectives': {'alias':'example/angular/directives/directive'},
            'ngControllers': {'alias':'example/angular/controllers/controller'},
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
                'deps': ['jquery'],
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
            'ngResource': {
                deps: ['angular'],
                exports: 'angularRoute'
            },
            'ngCookies': {
                deps: ['angular'],
                exports: 'angular'
            },
            end: 0
        },
        end: 0
    };
    //替换整个应用配置信息为该文件中的个性化配置
    $$.appConfig = $$.userConfig;
})