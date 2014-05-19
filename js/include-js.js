/**
 * 按模块加载加载应用所需的js和css文件
 * sources e.g. [{n:'common',f:'http://s.no100.com/perfmjs/js/core2/include-common.js',t:'js',m:'jq;dlt',d:'http://s.no100.com'}]
 * combineUrls e.g. []
 * import loadres.js
 */
!(function() {
	perfmjs.includeres.loadModules({name:'js-comm', type:'js', mdCallback:function(source, module, combineUrls) {
		//按模块加载资源文件
		if (module === 'jq') {
			//combineUrls[combineUrls.length] = '/perfmjs/js/src/jquery/jquery-1.11.1.min.js';
		} else if (module === 'ajax') {
            combineUrls[combineUrls.length] = '/perfmjs/js/widget/ajax/ajaxcall.js';
        } else if (module === 'webdialog') {
			combineUrls[combineUrls.length] = 'http://r.aicaicdn.com/min/b=js&f=plugins/webdialog/webDialog.js';
		} else if (module === 'form') {
			combineUrls[combineUrls.length] = '/perfmjs/js/widget/ui/form/jquery.form.js';
		} else if (module === 'app') {
			//装载应用需要的资源
			combineUrls[combineUrls.length] = '/perfmjs/js/example/appconfig.js';
			combineUrls[combineUrls.length] = '/perfmjs/js/example/module1.js';
			combineUrls[combineUrls.length] = '/perfmjs/js/example/module2.js';
			combineUrls[combineUrls.length] = '/perfmjs/js/example/module3.js';
			combineUrls[combineUrls.length] = '/perfmjs/js/example/start.js';
		}
	}, afterLoadedCallback:function() {
        //alert('afterLoadedCallback');
    }}).loadModules({name:'widget-comm', type:'js', mdCallback:function(source, module, combineUrls) {
		//按模块加载资源文件
        if (module === 'dlt') {
            combineUrls[combineUrls.length] = 'http://r.aicaicdn.com/min/b=js&f=plugins/webdialog/webDialog.js';
        }
	}}).loadModules({name:'css-comm', type:'css', mdCallback:function(source, module, combineUrls) {
        //按模块加载资源文件
        if (module === 'common') {
            combineUrls[combineUrls.length] = "/perfmjs/js/example/common.css?v=20121204001";
        } else if (module === 'webdialog') {
            combineUrls[combineUrls.length] = 'http://r.aicaicdn.com/js/plugins/webdialog/skin/new2010/new2010.css?v=20121204001';
        }
    }});
})();