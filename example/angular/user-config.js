perfmjs.plugin('userConfig', function($$) {
    $$.base("appConfig.userConfig", {});
    $$.userConfig.defaults = {
        'amd.baseUrl': '/perfmjs/',
        'amd.app.modules': {
            'jquery': {'alias':'http://r.aicaicdn.com/js/skyjs/plugins/jquery/jquery-1.11.1.min.js','css':[],'js':[]},
            'angular': {'alias':'example/angular/angular'},
            'angular-route': {'alias':'example/angular/angular-route'},
            'ngResource': {'alias':'example/angular/angular-resource'},
            'ngCookies': {'alias':'example/angular/angular-cookies'},
            //具体业务类
            'ng-app': {'alias':'example/angular/ng-app'},
            'ng-model': {'alias':'example/angular/ng-model'},
            'ng-service': {'alias':'example/angular/services/service'},
            'ng-directive': {'alias':'example/angular/directives/directive'},
            'ng-controller': {'alias':'example/angular/controllers/controller'},
            'ng-directive-money': {'alias':'example/angular/directives/money'},
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
            'ngResource': {
                'deps': ['angular'],
                'exports': 'angularRoute'
            },
            'ngCookies': {
                'deps': ['angular'],
                'exports': 'angular'
            },
            end: 0
        },
        end: 0
    };
    //替换整个应用配置信息为该文件中的个性化配置
    $$.appConfig = $$.userConfig;
})