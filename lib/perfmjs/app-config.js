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
        'amd.baseUrl': '/perfmjs/lib/amd/',
        'amd.common.modules': {
            'dialog': {'alias': '', version:'0.0.1', 'css': [], 'js': []},
            end: 0
        },
        'amd.app.modules': {},
        end: 0
    };
});