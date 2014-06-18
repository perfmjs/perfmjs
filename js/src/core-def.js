!(function(){
    function importJS(src) {
    	document.write('<script type="text/javascript" src="' + src + '"></scr' + 'ipt>');
    }
    importJS('/perfmjs/js/core/perfmjs.js');
    importJS('/perfmjs/js/core/sysconfig.js');
    importJS('/perfmjs/js/core/browser.js');
    importJS('/perfmjs/js/core/base.js');
    importJS('/perfmjs/js/core/logger.js');
    importJS('/perfmjs/js/core/joquery.js');
    importJS('/perfmjs/js/core/head.load.js');
    importJS('/perfmjs/js/core/includeres.js');
    importJS('/perfmjs/js/core/event-proxy.js');
    importJS('/perfmjs/js/core/fsm.js');
    importJS('/perfmjs/js/core/app.js');
})();