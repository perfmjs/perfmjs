perfmjs.plugin('userConfig', function($$) {
    $$.base("appConfig.userConfig", {
        init: function(args) {
            this._super('init', args);
            return this;
        }
    });
    $$.userConfig.defaults = {
        'amd.baseUrl': 'http://localhost:63342/perfmjs/example/amd/',
        'amd.app.modules': {
            'foo1': {'alias': 'amd/foo', 'css': [], 'js': []},
            'bar1': {'alias': 'amd/bar', 'css': [], 'js': []},
            end: 0
        },
        end: 0
    };
    //替换整个应用配置信息为该文件中的个性化配置
    $$.appConfig = $$.userConfig;
})