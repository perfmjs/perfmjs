/**
 * 按模块加载加载应用所需的js和css文件
 * sources e.g. [{n:'common',f:'http://s.no100.com/perfmjs/js/core2/include-common.js',t:'js',m:'jq;dlt',d:'http://s.no100.com'}]
 * combineUrls e.g. []
 */
require(['loader'], function(loader) {
    loader.loadModules({name:'js-default', mdCallback:function(source, module, combineUrls) {
		if (module === 'jq') {
			combineUrls[combineUrls.length] = '/perfmjs/lib/third-part-libs/jquery/jquery-1.11.1.min.js';
		} else if (module === 'ajax') {
            combineUrls[combineUrls.length] = '/perfmjs/lib/widget/ajax/ajaxcall.js';
        } else if (module === 'webdialog') {
			combineUrls[combineUrls.length] = 'http://r.aicaicdn.com/min/b=lib&f=plugins/webdialog/webDialog.js';
		} else if (module === 'form') {
			combineUrls[combineUrls.length] = '/perfmjs/lib/widget/form/jquery.form.js';
		} else if (module === 'app') {
			//装载应用需要的资源
			combineUrls[combineUrls.length] = '/perfmjs/example/core/appconfig.js';
			combineUrls[combineUrls.length] = '/perfmjs/example/core/module1.js';
			combineUrls[combineUrls.length] = '/perfmjs/example/core/module2.js';
			combineUrls[combineUrls.length] = '/perfmjs/example/core/module3.js';
			combineUrls[combineUrls.length] = '/perfmjs/example/core/start.js';
		}
	}, afterLoadedCallback:function() {
        //alert('afterLoadedCallback');
    }}).loadModules({name:'widget-comm', mdCallback:function(source, module, combineUrls) {
        if (module === 'dlt') {
            combineUrls[combineUrls.length] = 'http://r.aicaicdn.com/min/b=lib&f=plugins/webdialog/webDialog.js';
        }
	}}).loadModules({name:'css-comm', type:'css', mdCallback:function(source, module, combineUrls) {
        if (module === 'common') {
            combineUrls[combineUrls.length] = "/perfmjs/example/core/common.css?v=20121204001";
        } else if (module === 'webdialog') {
            combineUrls[combineUrls.length] = 'http://r.aicaicdn.com/lib/plugins/webdialog/skin/new2010/new2010.css?v=20121204001';
        }
    }});
});