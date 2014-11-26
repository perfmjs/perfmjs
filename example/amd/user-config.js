perfmjs.plugin('userConfig', function($$) {
    $$.base("appConfig.userConfig", {
        init: function(args) {
            this._super('init', args);
            return this;
        }
    });
    $$.userConfig.defaults = {
        'amd.baseUrl': '/perfmjs/example/amd/',
        'amd.app.modules': {
            'foo': {'alias': 'foo', version:'1.0', 'css': [], 'js': []},
            'bar1': {'alias': 'amd/bar', version:'2.0', 'css': [], 'js': []},
            end: 0
        },
        end: 0
    };
    //替换整个应用配置信息为该文件中的个性化配置
    $$.appConfig = $$.userConfig;
})