perfmjs.plugin('sysconfig', function($$) {
    $$.sysconfig.events = {
        moduleIsReady: 'perfmjs.ready',
        end:0
    };
});