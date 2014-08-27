perfmjs.plugin('sysConfig', function($$) {
    $$.utils.namespace('sysConfig');
    $$.sysConfig.events = {
        moduleIsReady: 'perfmjs.ready',
        end:0
    };
});