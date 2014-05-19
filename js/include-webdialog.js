/**
 * 按模块加载加载应用所需的js和css文件
 * sources e.g. [{n:'common',f:'http://s.no100.com/perfmjs/js/core2/include-common.js',t:'js',m:'jq;dlt',d:'http://s.no100.com'}]
 * combineUrls e.g. []
 * import loadres.js
 */
!(function() {
	perfmjs.includeres.loadModules({name:'js-webdialog', type:'js', mdCallback:function(source, module, combineUrls) {
		//按模块加载资源文件
		if (module === 'webdialog') {
            combineUrls[combineUrls.length] = 'http://r.aicaicdn.com/min/b=js&f=plugins/webdialog/webDialog.js';
		}
	}, afterLoadedCallback:function(){
        webAlert({content:'WebDialogCSS弹窗被延迟加载调用！', left:'right', top:'bottom', time:'100', fixed:true});
    }}).loadModules({name:'css-webdialog', type:'css', mdCallback:function(source, module, combineUrls) {
        //按模块加载资源文件
        if (module === 'common') {
            combineUrls[combineUrls.length] = "css/common/common.css?v=20121204001";
        } else if (module === 'webdialog') {
            combineUrls[combineUrls.length] = 'http://r.aicaicdn.com/js/plugins/webdialog/skin/new2010/new2010.css?v=20121204001';
        }
    }, afterLoadedCallback:function(){
        webAlert({content:'WebDialogJS弹窗被延迟加载调用！', left:'right', top:'bottom', time:'100', fixed:true});
    }});
})();