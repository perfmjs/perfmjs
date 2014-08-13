!(function(){
    function importJS(src) {
    	document.write('<script type="text/javascript" src="' + src + '"></scr' + 'ipt>');
    }
    importJS('/perfmjs/lib/perfmjs/amd.js');
    importJS('/perfmjs/lib/perfmjs/perfmjs.js');
    importJS('/perfmjs/lib/perfmjs/sysconfig.js');
    importJS('/perfmjs/lib/perfmjs/browser.js');
    importJS('/perfmjs/lib/perfmjs/base.js');
    importJS('/perfmjs/lib/perfmjs/logger.js');
    importJS('/perfmjs/lib/perfmjs/joquery.js');
    importJS('/perfmjs/lib/perfmjs/head.load.js');
    importJS('/perfmjs/lib/perfmjs/includeres.js');
    importJS('/perfmjs/lib/perfmjs/event-proxy.js');
    importJS('/perfmjs/lib/perfmjs/fsm.js');
    importJS('/perfmjs/lib/perfmjs/app.js');
})();