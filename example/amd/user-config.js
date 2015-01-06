perfmjs.plugin('userConfig', function($$) {
    $$.base("appConfig.userConfig", {});
    $$.userConfig.defaults = {
        'amd.baseUrl': '/perfmjs/',
        'amd.app.modules': {
           'jquery': {'alias':'http://r.aicaicdn.com/js/??plugins/jquery.js','css':[],'js':[]},
            'myModule': {'alias':'example/amd/myModule',version:'20141127001','css':[],'js':[]},
            'amd1/myModule2': {'alias':'example/amd/amd1/myModule2',version:'20141127001','css':[],'js':[]},
            'amd1/myModule3': {'alias':'example/amd/amd1/myModule3',version:'20141127001','css':[],'js':[]},
            'foo': {'alias':'example/amd/foo',version:'20141127001','css':[],'js':[]},
            'bar': {'alias':'example/amd/bar',version:'20141127001','css':[],'js':[]},
            'underscore': {'alias':'http://underscorejs.org/underscore.js'},
            'angular': {'alias':'http://m.500.com/resource/js/vendor/??angular/angular.min.js'},
            'backbone': {'alias':'example/amd/backbone',version:'','css':[],'js':[]},
            end: 0
        },
        'amd.app.shim': {
            'jquery':{
                'deps': [],
                'init': function () {
                    return jQuery;
                }
            },
            'angular':{
                'deps': ['jquery'],
                'init': function ($) {
                    return angular;
                }
            },
            'backbone':{
                'deps': [
                    'underscore',
                    'jquery'
                ],
                'anonymousDefineId': ['underscore', 'jquery', 'exports'].join('-')
            }
        },
        end: 0
    };
    //替换整个应用配置信息为该文件中的个性化配置
    $$.appConfig = $$.userConfig;
})