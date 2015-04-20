perfmjs.plugin('appConfig', function($$) {
    $$.base("appConfig", {
        init: function(args) {
            this.extendConfig($$.globalConfig);
            $$.utils.extend(this.options['amd.shim'], this.options['amd.app.shim']);
            $$.utils.extend(this.options['amd.modules'], this.options['amd.app.modules']);
            if ($$.utils.isAmdSupport()) {
                define.config.baseUrl = this.options['amd.baseUrl'];
            }
            return this;
        },
        extendConfig: function(options) {
            if (!this.option('globalConfigLoaded')) {
                this.option('globalConfigLoaded', true);
                $$.utils.extend(this.options, options);
            }
        },
        end: 0
    });
    $$.appConfig.defaults = {
        'globalConfigLoaded': false,
        'amd.baseUrl': '/perfmjs/',
        'amd.modules': {
            'jquery': {'alias':'lib/third-part-libs/jquery/jquery-1.11.1.min','css':[],'js':[]},
            end: 0
        },
        'amd.shim': {},
        'amd.app.modules': {},
        'amd.app.shim': {},
        end: 0
    };
});