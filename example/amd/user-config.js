perfmjs.plugin('userConfig', function($$) {
    $$.base("appConfig.userConfig", {});
    $$.userConfig.defaults = {
        'amd.baseUrl': '/perfmjs/',
        'amd.app.modules': {
            'jquery': {'alias':'http://r.aicaicdn.com/js/??plugins/jquery.js','css':[],'js':[],
                'shim':{
                    'deps': [],
                    'init': function () {
                        return jQuery;
                    }
                }
            },
            'myModule': {'alias':'example/amd/myModule',version:'20141127001','css':[],'js':[]},
            'amd1/myModule2': {'alias':'example/amd/amd1/myModule2',version:'20141127001','css':[],'js':[]},
            'amd1/myModule3': {'alias':'example/amd/amd1/myModule3',version:'20141127001','css':[],'js':[]},
            'foo': {'alias':'example/amd/foo',version:'20141127001','css':[],'js':[]},
            'bar': {'alias':'example/amd/bar',version:'20141127001','css':[],'js':[]},
            'underscore': {'alias':'http://underscorejs.org/underscore.js'},
            'angular': {'alias':'http://m.500.com/resource/js/vendor/??angular/angular.min.js',
                'shim':{
                    'deps': ['jquery'],
                    'init': function ($) {
                        return angular;
                    }
                }
            },
            'backbone': {'alias':'example/amd/backbone',version:'','css':[],'js':[],
                'shim':{
                    'deps': [
                        'underscore',
                        'jquery'
                    ]
//                'init':function(_, $) {
//                    alert(_.VERSION  + "/" + $.fn.jquery + "/" + $$.utils.getGlobal('Backbone'));
//                    return $$.utils.getGlobal('Backbone');
//                },
//                'exports':'Backbone',
                },
                'anonymousDefineId': ['underscore', 'jquery', 'exports'].join('-')
            },
            end: 0
        },
        end: 0
    };
    //替换整个应用配置信息为该文件中的个性化配置
    $$.appConfig = $$.userConfig;
})