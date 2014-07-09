 /**
 * 日志模块 FIXME 待完善, 目前仅供Node.js环境下使用
 * 1）允许定义日志等级 -- "error", "warn", "info", "debug", "log"
 * 2）在Firefox中通过firebug控制台输出日志，在IE中通过在url中添加debug=true参数，将日志显示在页面底部。
 * 3）线上模式的错误日志，将记录到draggon监控系统，触发报警。
 * @date 2012-11-30
 * import perfmjs.js
 */
!(function($$){
	/**
	 * 	调试开发, 打开后将输出日志
	 *  online模式下，异常信息将记录到draggon服务器上报警
	 *  window.dmtrack 此变量只有online模式才存在，因此可以用于区分debug/online
	 *  注意拷贝线上html源码时请将不需要的相关代码删除。
	 */
	DEBUG_MOD = false;
	perfmjs.logger=function(){};
	perfmjs.logger.level=4; 	//default level
	//perfmjs.logger.errorUri="http://search.china.alibaba.com/rpc/dragoontrack/logError.json?msg="; 	//dragoon url
	//perfmjs.logger.errorUri="http://s.no100.com/rpc/dragoontrack/logError.json?msg="; 	//dragoon url
	perfmjs.logger.setLevel=function(level){//set logger level to filter the logger , so just show the logger level you focus.
		perfmjs.logger.level=level;
	};
   
	var prepared = false;
	var methods = [ "error", "warn", "info", "debug", "log"];//0-4 level
   
	perfmjs.utils.extend(perfmjs.logger.prototype, {
		level:perfmjs.logger.level,
		setEnableLevel: function(level) {
			if(level>4 || level<0) {
				this.error(['wrong level setting. level should be 0-4, the int type,you set ',level,", so stupided."].join(''));
			}
			this.level=parseInt(level);
		},
		enabled: function(lev) {
			if(lev>perfmjs.logger.level) {
				return false;
			}
			return true;
		},
		name: function() {
			return this._name;
		},
		log: function() {
			this._log(4, arguments);
		},
		debug: function() {
			this._log(3, arguments);
		},
		info: function() {
			this._log(2, arguments);
		},
		warn: function() {
			this._log(1, arguments);
		},
		error: function() {
			this._log(0, arguments);
		},
		_handler: function(level, name, msg){
            ////////////在此处返回/////////////////////////////
            return;
            /////////////////////////////////////////
			var method=methods[level];
			msg=[[method+"|"].join(" | ")].concat(Array.prototype.slice.call(msg));
			   
			if(self.console && !perfmjs.browser.msie()){
			   if(console.log.apply){
				  console[method].apply(console, msg);    	  
			   }else{
				  console[console[method]?method:'log'](msg);
			   }
			}else{
				//在IE下，如果url中添加debug=true，则日志窗口将被添加在页面的底部，帮助调试。
				if(perfmjs.browser.msie()) {
					if(/debug=true/i.test(location.search)) {
						!prepared && this._prepare();	
						var msgBox = perfmjs.utils.getJQuery()('#DEBUG ol');
						var color;
						switch(method){
							case "log":{
								color="#FFFFFF";
								break;
							}
							case "debug":{
								color="#C0C0C0";
								break;
							}
							case "info":{
								color="#EBF5FF";
								break;
							}
							case "warn":{
								color="#FFFFC8";
								break;
							}
							case "error":{
								color="#FE6947";
								break;
							}
							default:{
								color="#FFFFFF";
								break;
							}
						}
						perfmjs.utils.getJQuery()('<li style="background-color:'+ color +';">').text('' + msg).appendTo(msgBox);
					} 
				}
			}
//			//online模式下需要报警
//			if(!DEBUG_MOD){
//				if(level == 0 || level == 1){
//					(new Image()).src = perfmjs.logger.errorUri + this._getBrowserInfo() + msg;
//				}
//			}
		},
		_log: function(level, msg) {
			if (this.enabled(level)) {
				this._handler(level,this.name(),msg);
			}
		},
		_getBrowserInfo:function(){
			return perfmjs.browser.info();
		},
		_prepare:function() {
			perfmjs.utils.getJQuery()('#DEBUG').remove();
			//注意应该该js放在<head>标签内才有效果
			perfmjs.utils.getJQuery()(document.head).before('<div id="DEBUG" style="margin-top:10px;padding:8px;border:dashed 1px #FF7300;background-color:#EEE;color:#000;"><ol></ol></div>');
			prepared = true;
		},
		end:0
	});
   
	var logs={};//logs  instance container
	perfmjs.logger = function(name) {
       if (!logs[name]) {
           logs[name] = new perfmjs.logger(name);
           logs[name]._name=name;
       }
       return logs[name];
	}('perfmjs');
	if(DEBUG_MOD){
		perfmjs.logger.setEnableLevel(4);	
	}else{
		perfmjs.logger.setEnableLevel(2);
	}
	//try-catch 捕捉不到的异常使用onerror函数来记录日志
	/* window.onerror = function(msg,url,line){
		if(!DEBUG_MOD){
			(new Image()).src = perfmjs.logger.errorUri + perfmjs.logger._getBrowserInfo() + msg + ' |url:' +url + ' |line:'+line;
		}
		return false;
	}; */
})(window);