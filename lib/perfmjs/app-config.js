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
        'amd.baseUrl': 'http://r.aicaicdn.com/js/',
        'amd.common.modules': {
            'jquery': {'alias':'skyjs/plugins/jquery/jquery-1.7.2.min','css':[],'js':[]},
            'webdialog': {'alias':'skyjs/plugins/webdialog/webdialog','version':'20141126002','css':[$$.appConfig.newInstance().option('amd.baseUrl') +  + 'skyjs/plugins/webdialog/webdialog.css?v=20141126002'],'js':[]},
            end: 0
        },
        'amd.app.modules': {},
        end: 0
    };
});