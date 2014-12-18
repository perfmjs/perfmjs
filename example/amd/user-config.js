perfmjs.plugin('userConfig', function($$) {
    $$.base("appConfig.userConfig", {});
    $$.userConfig.defaults = {
        'amd.baseUrl': '/perfmjs/',
        'amd.app.modules': {
            'myModule': {'alias':'example/amd/myModule',version:'20141127001','css':[],'js':[]},
            'amd1/myModule2': {'alias':'example/amd/amd1/myModule2',version:'20141127001','css':[],'js':[]},
            'amd1/myModule3': {'alias':'example/amd/amd1/myModule3',version:'20141127001','css':[],'js':[]},
            'foo': {'alias':'example/amd/foo',version:'20141127001','css':[],'js':[]},
            'bar': {'alias':'example/amd/bar',version:'20141127001','css':[],'js':[]},
            end: 0
        },
        end: 0
    };
    //替换整个应用配置信息为该文件中的个性化配置
    $$.appConfig = $$.userConfig;
})