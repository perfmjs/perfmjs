/**
 * ajax请求插件
 * import jquery.xxx.js
 */
perfmjs.plugin('ajaxcall', function($$) {
	$$.ajaxcall = {
		/*
		 * invoke as: 
			perfmjs.ajaxcall.syncAjax(function(jsonMsg) {
                if (jsonMsg.status == 'success') {
                    alert(jsonMsg.result);
                } else {
                    alert("获取xx数据失败!" + jsonMsg.msg);
                }
            }, '/ajaxform/get');
		*/
		syncAjax: function(callback, url, urlParams, ajaxType, cache) {
			this.syncAjaxRequest(function(jsonResponse) {
				callback.call(this, $$.utils.fmtJSONMsg(jsonResponse));
			}, url, urlParams, ajaxType, cache);
		},
		getjsonp: function(callback, url, data, remoteCallbackVar) {
			remoteCallbackVar = remoteCallbackVar || 'callback';
			if (url.indexOf('?')>=0) {
				url = url + "&" + remoteCallbackVar + "=?";
			} else {
				url = url + "?" + remoteCallbackVar + "=?";
			}
			return $$.utils.getJQuery().getJSON(url, data, callback);
		},
		syncAjaxRequest: function(callback, url, data, type, cache) {
			if (cache == undefined) cache = true;
			$$.utils.getJQuery().ajax({
                cache: cache,
			    url: url,
			    data: data,
			    type : type || "GET",
			    dataType : 'json/xml/html',
			    success : callback,
			    error: function(xhr) {
			    	alert('由于网络原因,以致未能成功处理ajax请求!' + xhr.status);
			    }
			});
		}
	};
});