perfmjs.plugin('globalConfig', function($$) {
    $$.globalConfig = {
        'amd.modules': {
            'jquery': {'alias':'lib/third-part-libs/jquery/jquery-1.11.1.min','css':[],'js':[]},
            'webdialog': {'alias':'lib/widget/webdialog/webdialog','version':'20141203001','css':['lib/widget/webdialog/webdialog.css?v=20141203001'],'js':[]},
            end: 0
        },
        'amd.shim': {},
        end: 0
    };
    $$.appConfig.newInstance().extendConfig($$.globalConfig);
});