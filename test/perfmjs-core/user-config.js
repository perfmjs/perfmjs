perfmjs.plugin('userConfig', function($$) {
    $$.base("appConfig.userConfig");
    $$.userConfig.defaults = {
        'amd.baseUrl': '/perfmjs/',
        'amd.app.modules': {
            'jquery': {'alias':'lib/third-part-libs/jquery/jquery-1.11.1.min','css':[],'js':[]},
            'webdialog': {'alias':'lib/widget/webdialog/webdialog','version':'20141203001','css':['lib/widget/webdialog/webdialog.css?v=20141203001'],'js':[]},
            'foo': {'alias': 'example/amd/foo', 'version':'20141127001', 'css': [], 'js': []},
            'bar': {'alias': 'example/amd/bar', 'version':'20141127001', 'css': [], 'js': []},
            end: 0
        },
        end: 0
    };
    //替换整个应用配置信息为该文件中的个性化配置
    $$.appConfig = $$.userConfig;
});