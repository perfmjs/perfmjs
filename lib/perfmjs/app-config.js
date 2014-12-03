perfmjs.plugin('appConfig', function($$) {
    $$.base("appConfig", {
        init: function(args) {
            this.options['amd.modules'] = $$.utils.extend(this.options['amd.common.modules'], this.options['amd.app.modules']);
            if ($$.utils.isAmdSupport()) {
                define.config.baseUrl = this.options['amd.baseUrl'];
            }
            return this;
        }
    });
    $$.appConfig.defaults = {
        'amd.baseUrl': '/perfmjs/',
        'amd.common.modules': {
            'jquery': {'alias':'lib/third-part-libs/jquery/jquery-1.11.1.min','css':[],'js':[]},
            'webdialog': {'alias':'lib/third-part-libs/webdialog/webdialog','version':'20141203001','css':[$$.appConfig.newInstance().option('amd.baseUrl') +  + 'lib/third-part-libs/webdialog/webdialog.css?v=20141203001'],'js':[]},
            end: 0
        },
        'amd.app.modules': {},
        end: 0
    };
});