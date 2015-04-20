perfmjs.plugin('userConfig', function($$) {
    $$.base("appConfig.userConfig", {});
    $$.userConfig.defaults = {
        'amd.baseUrl': '/perfmjs/',
        'amd.app.modules': {
            'jquery': {'alias':'http://r.aicaicdn.com/js/skyjs/plugins/jquery/jquery-1.11.1.min.js','css':[],'js':[]},
            'less': {'alias':'/example/less/less','css':[],'js':[]},
            end: 0
        },
        'amd.app.shim': {
            'less':{
                'deps': [],
                'init': function() {
                    return {};
                }
            },
            end: 0
        },
        end: 0
    };
    //替换整个应用配置信息为该文件中的个性化配置
    $$.appConfig = $$.userConfig;
})