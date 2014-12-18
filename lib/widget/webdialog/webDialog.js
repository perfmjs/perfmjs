(function () {
    "use strict";
    var win = window, doc = document;
    //工具对象
	var utils = {
		isIE: navigator.userAgent.indexOf("MSIE")>0,
        isIE6: !('minWidth' in doc.documentElement.style),
        getStyle: win.getComputedStyle ? function (ele, name){ return getComputedStyle(ele, false)[name];} : function (ele, name){ return ele.currentStyle[name];},
        getEvent: function (b) {
            return b || win.event;
        },
        getTarget: function (b) {
            return b.srcElement || b.target;
        },
        clsSelect:'getSelection' in win ? function () {
			win.getSelection().removeAllRanges();
		} : function () {
			try {
				doc.selection.empty();
			} catch (e) {}
		},
        each : function (obj, callback) {
		    var name, i = 0,
		        length = obj.length,
		        isObj = length === undefined;

		    if (isObj) {
		        for (name in obj) {
		            if (callback.call(obj[name], name, obj[name]) === false) {
                        break;
                    }
		        }
		    } else {
		        for (var value = obj[0];
				i < length && callback.call(value, i, value)!== false;
				value = obj[++i]) {}
		    }
			
			return obj;
		},
		addEvent: win.addEventListener ? function (elem, type, callback) { elem.addEventListener(type, callback, false)} : function (elem, type, callback) { elem.attachEvent('on' + type, callback);},
        removeEvent: win.removeEventListener ? function (elem, type, callback) { elem.removeEventListener(type, callback, false)} : function (elem, type, callback) { elem.detachEvent('on' + type, callback);}
  	};
  	//弹出方法定义
	var Dialog = function(config){
		if(!(this instanceof Dialog)){
			config = config || {};
			if (typeof config === 'string' || config.nodeType === 1) {
				config = {content:config};
			}

			for (var i in Dialog.defaults) {
				if (config[i] === undefined) {config[i] = Dialog.defaults[i];}
			}
			
			config.id = config.id || 'Dialog-' + + new Date;

			if(Dialog.list[config.id]){
				return Dialog.list[config.id].zIndex();
			}else{
				return Dialog.list[config.id] = new Dialog(config);
			}
		}

		this.config = config;
		this.init();
	};

	Dialog.prototype = {
		version: '1.7',
		constructor:Dialog,
		//初始化
		init:function(){
			var that = this,
			config = that.config;
			that.DOM = that._getDOM();
			if(config.lock){			
				that.lock();
			}

			if(config.style){			
				that.DOM.layer.className += " dialogSkin_"+config.style;
			}

			if(!config.drag){
				that.DOM.title.style.cursor = "default";
			}

			if(!config.autoMiddle){
				that.DOM.body.style.verticalAlign = "top";
				that.DOM.content.style.display = "block";
			}

			that.closed = false;	

			that
			.button(config.button)
			.ad(config.ad)			
			.title(config.title)
			.icon(config.icon)
			.content(config.content,true)
			.size(config.width, config.height)
			.position(config.left,config.top)
			.zIndex()
			.time(config.time);			
			that.DOM.wrap.className ="md_dialog_wrap";

			that._addEvent();
			config.init && config.init.call(that, window);
			return that;
		},
		//Z轴控制
		zIndex:function(){
			var that = this,
			wrap = that.DOM.wrap;
			Dialog.defaults.zIndex += 1;
			wrap.style.zIndex=Dialog.defaults.zIndex;
			return that;
		},
		//标题
		title:function(text){
			var that = this,
			DOM = that.DOM;
			if(text){
				DOM.title.innerHTML = text;
			}else{
				DOM.head.style.display = "none";
			}			
			return that;
		},
		//图标
		icon:function(icon){
			var that = this,
			DOM =that.DOM;
			if (icon) {
				DOM.content.className ="md_dialog_content "+"md_dialog_"+icon;
			}else{
				DOM.content.className ="md_dialog_content md_dialog_noIcon";
			}
			return that;
		},
		//弹出内容
		content:function(con){
			var that = this,display,prev,next,str,url,
			config = that.config,
			DOM = that.DOM,
			wrap = DOM.wrap,
			width = wrap.offsetWidth,
			height = wrap.offsetHeight,
			left = parseInt(wrap.style.left),
			top = parseInt(wrap.style.top);

			that._elemBack && that._elemBack();

			wrap.style.width = "auto";
			wrap.style.height = "auto";

			if (typeof con === 'string') {
				str=con.replace(/(^\s*)/g,'').substring(0,4)
				if(str === "url:"){
					if(that.iframe){
						that.iframe.className="";
						that.iframe.src =null;
						that.iframe.parentNode.removeChild(that.iframe);
						that.iframe=null;
					}
					url = con.substr(4);
					that.iframe = document.createElement("iframe");
					that.iframe.src = url;
					that.iframe.setAttribute('frameborder', '0', 0);
					that.iframe.className ="md_dialog_iframe";
					DOM.txt.innerHTML = "";
					DOM.content.style.display="block";
					DOM.content.style.height ="100%";
					DOM.txt.style.height ="100%";
					DOM.txt.appendChild(that.iframe);
				}else{
					DOM.txt.innerHTML = con;
				}
			} else if (con && con.nodeType === 1) {
				display = utils.getStyle(con,"display");
				prev = con.previousSibling;
				next = con.nextSibling;

				that._elemBack = function () {
					if (prev && prev.parentNode) {
						prev.parentNode.insertBefore(con, prev.nextSibling);
					} else if (next && next.parentNode) {
						next.parentNode.insertBefore(con, next);
					} else if (parent) {
						parent.appendChild(con);
					}
					con.style.display = display;
					that._elemBack = null;
				};
				DOM.txt.innerHTML = "";
				DOM.txt.appendChild(con);
				con.style.display = 'block';
			}
			
			if (!arguments[1]) {
				width = wrap.offsetWidth - width;
				height = wrap.offsetHeight - height;
				left = left - width / 2;
				top = top - height / 2;
				wrap.style.left = Math.max(left, 0) + 'px';
				wrap.style.top = Math.max(top, 0) + 'px';
			}

			//设置对话框外层大小
			that._setWrapSize();

			return that;
		},		
		//弹出大小
		size:function(width,height){
			var that = this,maxWidth, maxHeight,
			config = that.config,
			DOM = that.DOM;

			DOM.body.style.padding = config.padding;

			if (width && width!=="auto") {
				maxWidth = doc.documentElement.clientWidth;
				width = that._percenttoNumber(width, maxWidth);
				
				if (typeof width === 'number') {
					DOM.body.style.width = width+"px";						
				}
				if (typeof width === 'string') {
					DOM.body.style.width = width;				
				}
				DOM.wrap.style.width = DOM.wrap.offsetWidth +"px";
			}else{
				DOM.body.style.width = "auto";
			}
			
			if (height && height!=="auto") {
				maxHeight = doc.documentElement.clientHeight;
				height = that._percenttoNumber(height, maxHeight);
				
				if (typeof height === 'number') {
					DOM.body.style.height = height+"px";	
				}
				if (typeof height === 'string') {
					DOM.body.style.height = height;
				}
				DOM.wrap.style.height = DOM.wrap.offsetHeight +"px";
			}else{
				DOM.body.style.height = "auto";
			}

			return that;
		},
		//弹出位置
		position:function(left,top){
			var that = this,
			wrap  = that.DOM.wrap,
			isFixed = utils.isIE6 ? false : that.config.fixed,
			ie6Fixed = utils.isIE6 && that.config.fixed,
			w = wrap.offsetWidth,
			h = wrap.offsetHeight,
			style =wrap.style,
			ww = doc.documentElement.clientWidth,
			wh = doc.documentElement.clientHeight,
			scrTop=doc.documentElement.scrollTop || doc.body.scrollTop,
			scrLft=doc.documentElement.scrollLeft || doc.body.scrollLeft,
			dl = isFixed ? 0 : scrLft,
			dt = isFixed ? 0 : scrTop;

			style.position = isFixed ? "fixed" : "absolute";			

			if (left || left === 0) {
				left = that._percenttoNumber(left, ww - w);
				if (typeof left === 'number') {
					left = ie6Fixed ? (left += scrLft) : left + dl;
					style.left = Math.max(left, dl) + 'px';
				} else if (typeof left === 'string') {
					style.left = left;
				}
			}
			
			if (top || top === 0) {
				top = that._percenttoNumber(top, wh - h);
				
				if (typeof top === 'number') {
					top = ie6Fixed ? (top += scrTop) : top + dt;
					style.top = Math.max(top, dt) + 'px';
				} else if (typeof top === 'string') {
					style.top = top;
				}
			}
			return that;
		},
		//自定义按钮
		button: function (arr) {
			if (!arr) {
				this.DOM.foot.parentNode.style.display = "none";
				return this;
			}
			var that = this,
				elem = that.DOM.foot,
				listeners = that._listeners = that._listeners || {},
				list = Object.prototype.toString.call(arr).slice(8,-1)==="Array" ? arr : [arr];


            utils.each(list, function (i, val) {
				var name = val.name,
					isNewButton = !listeners[name],
					button = !isNewButton ?
						listeners[name].elem :
						doc.createElement('button');
						
				if (!listeners[name]) {listeners[name] = {};}
				if (val.callback) {listeners[name].callback = val.callback;}
				if (val.id) {button.id = val.id;}
				if (val.className){
					button.className = val.className;
				}else{
					button.className = "md_dialog_default_btn";
				}				
				
				// 提示：请始终为按钮规定 type 属性。Internet Explorer 的默认类型是 "button"，而其他浏览器中（包括 W3C 规范）的默认值是 "submit"。
				// http://www.w3school.com.cn/tags/att_button_type.asp
				button.setAttribute('type', 'button');
                button.setAttribute('data-mark','md_dialog_button');

				if (isNewButton) {
					button.innerHTML = name;
					listeners[name].elem = button;
					elem.appendChild(button);
				}
			});
			
			elem.parentNode.style.display = list.length ? '' : 'none';
			
			return that;
		},
		//关闭弹出
		close:function(){
			var that = this,
			fn = that.config.closeFn,
			wrap  = that.DOM.wrap;

			if(that.closed){
				return that;
			}

			if (typeof fn === 'function' && fn.call(that, win) === false) {
				return that;
			}

			that.closed = true;	

			//移除弹出层
            utils.removeEvent(wrap,"click",that._wrapClick);
            utils.removeEvent(wrap,"mousedown",that._wrapDown);

			//that.DOM.wrap.className ="";

			that._elemBack && that._elemBack();

			if(that.iframe){
				that.iframe.className="";
				that.iframe.src =null;
				that.iframe.parentNode.removeChild(that.iframe);
				that.iframe=null;
			}

			wrap.parentNode.removeChild(wrap);
			Dialog.defaults.zIndex -= 1;

			if(that.mask){
				that.mask.parentNode.removeChild(that.mask);
				that.mask = null;
			}			

			
			Dialog.list[that.config.id] = null;
			delete Dialog.list[that.config.id];
			
		},
		//锁屏
		lock:function(){
			var that = this,
			config = that.config,
			zIndex = Dialog.defaults.zIndex;

			that.mask = doc.createElement("div");
			that.mask.style.cssText="position:fixed;_position:absolute;left:0;top:0;width:100%;height:100%;background:"+config.bg+"; opacity:"+config.opacity+";z-index:"+zIndex+";";			
			that.mask.style.filter = "alpha(opacity:"+ config.opacity*100+")";

			if(utils.isIE6){
				that.mask.style.height = Math.max(doc.documentElement.scrollHeight,doc.documentElement.clientHeight)+"px";
				that.mask.innerHTML = '<iframe src="about:blank" style="width:100%;height:100%;position:absolute;top:0;left:0;filter:alpha(opacity=0)"></iframe>';
			}

			doc.body.appendChild(that.mask);
			return that;
		},
		//定时关闭
		time:function(n){
			var that = this;
			that.timer && clearTimeout(that.timer);
			if(n && typeof n === "number"){
				that.timer = setTimeout(function(){that.close();},n*1000);
			}
			return that;
		},
		//弹出底部广告
		ad:function(ad){
			if(!ad){
				this.DOM.advert.parentNode.style.display="none";
				return this;
			}
			this.DOM.advert.innerHTML = ad;		
			return this;
		},
		setLimit:function(){
			var that = this;
			that.limit =(function () {
						var maxX, maxY,
							wrap = that.DOM.wrap,
							fixed = wrap.style.position === 'fixed',
							ow = wrap.offsetWidth,
							oh = wrap.offsetHeight,
							ww = doc.documentElement.clientWidth,
							wh = doc.documentElement.clientHeight,
							scrTop=doc.documentElement.scrollTop || doc.body.scrollTop,
							scrLft=doc.documentElement.scrollLeft || doc.body.scrollLeft,							
							dl = fixed ? 0 : scrLft,
							dt = fixed ? 0 : scrTop;
							
						// 坐标最大值限制
						maxX = ww - ow + dl;
						maxY = wh - oh + dt;
						
						return {
							minX: dl,
							minY: dt,
							maxX: maxX,
							maxY: maxY
						};
					})();

			return that;
		},
		//自定义按钮事件触发
		_click: function (name) {
			var that = this,
				fn = that._listeners[name] && that._listeners[name].callback;
			return typeof fn !== 'function' || fn.call(that, win) !== false ?
				that.close() : that;
		},
		//百分比转数值
		_percenttoNumber: function (thisValue, maxValue) {
			if (!thisValue && thisValue !== 0 || typeof thisValue === 'number') {
				return thisValue;
			}
			if (thisValue.indexOf('%') !== -1) {
				thisValue = parseInt(maxValue * thisValue.split('%')[0] / 100);
			}
			return thisValue;
		},
		//设置wrap宽高
		_setWrapSize:function(){
			var that = this,
			DOM = that.DOM,
			wrap = DOM.wrap,
			config = that.config;

			if(config.width==="auto"){
				wrap.style.width = "auto";
				setTimeout(function(){wrap.style.width = wrap.offsetWidth + "px";},0);
			}

			if(config.height==="auto"){
				wrap.style.height = "auto";
				setTimeout(function(){wrap.style.height = wrap.offsetHeight + "px";},0);
			}

			if(utils.isIE6){
				setTimeout(function(){
					DOM.ie6fix.style.height = wrap.offsetHeight + "px";
					DOM.ie6fix.style.width = wrap.offsetWidth + "px";
				},0);
			}

		},
		//为弹出添加事件
		_addEvent:function(){
			var that = this,
			DOM = that.DOM,
			wrap  = DOM.wrap,
			style = wrap.style,
			config = that.config;

			that._wrapClick = function(e){
				var evt = utils.getEvent(e),
				tag = utils.getTarget(evt);

				if(tag === DOM.close_btn){
					that.close();
				}

				if(tag.nodeName.toLowerCase() === "button" && tag.getAttribute("data-mark")==="md_dialog_button" ){
					that._click(tag.innerHTML);
				}
				that._setWrapSize();
			};
			that._wrapDown = function(e){
				var evt = utils.getEvent(e),
				tag = utils.getTarget(evt),
				offsetLeft =wrap.offsetLeft,
				offsetTop = wrap.offsetTop,
				l = evt.clientX-offsetLeft,
				t = evt.clientY-offsetTop,
				magneticNum,limit,lastTop,scrTop,lastY,				
				mousemove = function(e){
					var evt = utils.getEvent(e),
					X = evt.clientX - l,
					Y = evt.clientY - t,
					left,top;

	                if(limit){
	                	if(X<limit.minX+magneticNum){
	                		left = limit.minX;
	                	}else if(X>limit.maxX-magneticNum){
	                		left = limit.maxX;
	                	}else{
	                		left = X;
	                	}

	                	if(Y<limit.minY+magneticNum){
	                		top =limit.minY;
	                	}else if(Y>limit.maxY-magneticNum){
	                		top = limit.maxY;
	                	}else{
	                		top = Y;
	                	}	                	
	                }else{
	                	scrTop=document.documentElement.scrollTop || document.body.scrollTop;            	
	                	lastTop = wrap.style.position === 'fixed' ? 0 : scrTop;
	                	lastY = Y <= lastTop ? lastTop : Y;
	                	left = X;
	                	top = lastY;
	                }

	                style.left = left+"px";
	                style.top = top+"px";
					return false;
				},
				mouseup = function(){
                    utils.removeEvent(doc,"mousemove",mousemove);
                    utils.removeEvent(doc,"mouseup",mouseup);
					if(tag.releaseCapture){
						tag.releaseCapture();
					}
				};

				wrap.style.zIndex = Dialog.defaults.zIndex +=1;

				if(tag === DOM.title){
										
					if(!config.drag){
						return false;
					}

					if(config.limit){
						that.setLimit();
						limit = that.limit;
						magneticNum = config.magnetic && typeof config.magnetic === "number" ? config.magnetic : 0;
					}

					if(tag.setCapture){
						tag.setCapture();
					}

					if(evt.preventDefault){
		                evt.preventDefault();
		                evt.stopPropagation();
		            }

		            if (utils.isIE){
	                    evt.returnValue = false;
	                    evt.cancelBubble = true;
	                }

                    utils.clsSelect();

                    utils.addEvent(doc,"mousemove",mousemove);
                    utils.addEvent(doc,"mouseup",mouseup);
				}
			};

            utils.addEvent(wrap,"click",that._wrapClick);
            utils.addEvent(wrap,"mousedown",that._wrapDown);
		},
		//获取节点
		_getDOM: function () {
			var wrap = doc.createElement('div'),
				iframe = "",
				body = doc.body;
			wrap.style.cssText = 'position:absolute;left:0;top:0;';
			if(utils.isIE6){
				iframe = '<iframe class="md_dialog_ie6fix" src="about:blank" style="position:absolute;top:0;left:0;z-index:-1;filter:alpha(opacity=0);"></iframe>';
			}
			wrap.innerHTML = iframe + this.template;
			body.appendChild(wrap);
			
			var name, i = 0,
				DOM = {wrap:wrap},
				els = wrap.getElementsByTagName('*'),
				elsLen = els.length;
			for (; i < elsLen; i ++) {
				name = els[i].className.split('md_dialog_')[1];
				if (name) {
                    DOM[name] = els[i];
                }
			}
			
			return DOM;
		},
		//模板
		template:'<div class="md_dialog_layer">'
	+			'<table class="md_dialog_table">'
	+				'<tr class="md_dialog_head">'
	+					'<td>'
	+						'<div class="md_dialog_bar"><div class="md_dialog_title"></div><a href="javascript:void(0)" class="md_dialog_close_btn">&times;</a></div>'					
	+					'</td>'
	+				'</tr>'
	+				'<tr>'
	+					'<td class="md_dialog_body">'
	+						'<div class="md_dialog_content">'
	+							'<div class="md_dialog_icon"></div>'
	+							'<div class="md_dialog_txt"></div>'
	+						'</div> '
	+					'</td>'
	+				'</tr>'
	+				'<tr>'
	+					'<td class="md_dialog_foot"></td>'
	+				'</tr>'
	+				'<tr>'
	+					'<td class="md_dialog_advert"></td>'
	+				'</tr>'				
	+			'</table>'
	+		'</div>'

	};

	//存储定义了ID的弹出
	Dialog.list = {};

	//默认配置
	Dialog.defaults = {
			width: 'auto',				
			height: 'auto',
			title:"标题",
			content:'<div class="md_dialog_loading"></div>',
			left: '50%',				
			top: '40%',
			zIndex: 10000,
			drag:true,
			padding:'20px 25px',
			lock: true,
			fixed:false,
			icon:null,
			bg:'#000',
			opacity: 0.3,
			closeFn:null,
			time:0,
			ad:null,
			button:null,
			style:null,
			limit:true,
			magnetic:null,
			init:null,
			autoMiddle:true
	}
	
	if ( typeof define === "function") {
			define( "webdialog", [], function () { return Dialog; } );
	}else{
		win.webAlert = Dialog;
	}
})();