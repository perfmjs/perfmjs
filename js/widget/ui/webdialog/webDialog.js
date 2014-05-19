(function() {
	/*
	 *	获取webAlert路径
	 *	
	 *	用于调用外部文件
	*/
	var path,
	t = document.getElementsByTagName('script');
	t = t[t.length-1].src.replace(/\\/g, '/');
	path = (t.lastIndexOf('/') < 0) ? '.' : t.substring(0, t.lastIndexOf('/'));
	
	/*
	 *	加载对话框设置
	 *	
	 *	必须待document.body就绪才能使用webDialog,否则报document.body不存在. 所以必须在dom就绪或者window.onload之后调用
	*/
	var load = function(o, y, n, c) {
		if (o.id && document.getElementById(o.id)) return;//如果定义了ID，不允许重复
		
		//在父页面弹出
		if (o.parent) {
			o.parent = false;
			try{
				window.top.webAlert(o, y, n, c);
				return;
			}catch(e){};
		};
		
		var i = newBox(
		).html(
			o.title || '提示',		//标题
			o.url || 'about:blank',	//iframe地址
			o.content,				//内容
			y,						//确定按钮回调函数
			n,						//取消按钮回调函数
			o.yesText || '确定',	//确定按钮文本
			o.noText || '取消',		//取消按钮文本
			o.style || '',			//自定义clsassName
			c,						//对话框关闭时回调函数
			o.time,					//自动关闭对话框时间(秒)
			o.id					//给对话框设置ID
		).align(
			o.width || 'auto',		//内容宽度(默认数值的单位为:px)
			o.height || 'auto',		//内容高度(默认数值的单位为:px)
			o.left || 'center',		//对话框left值
			o.top || 'center',		//对话框top值
			o.fixed,				//是否启用静止定位(默认:false)
			o.lock					//是否锁屏(默认:false)
		);
		return i;
	},
	
	art,
	boxs = [],
	onmouse = false,
	ie6PngRepair = false,
	dom = document.documentElement || document.body,
	IE = !+'\v1';
	IE6 = IE && ([/MSIE (\d)\.0/i.exec(navigator.userAgent)][0][1] == 6),
	Each = function(a, b) {
		for (var i = 0, len = a.length; i < len; i++) b(a[i], i);
	},
	C = {
		x: 0,	//距离文档的X轴坐标
		y: 0,	//距离文档的Y轴坐标
		t: 0,	//对话框top值
		l: 0,	//对话框left值
		w: 0,	//对话框宽度
		h: 0,	//对话框高度
		st: 0,	//被滚动条卷去的文档高度
		sl: 0,	//被滚动条卷去的文档宽度
		ddw: 0,	//浏览器内容可视宽度
		ddh: 0,	//浏览器内容可视高度
		dbw: 0,	//页面总宽度
		dbh: 0	//页面总高度
	},
	z = 999999999,//对话框初始叠加高度
	pageLock = 0,//锁屏遮罩计数器
	
	/*{
	 *	DOM就绪绑定事件
	 *
	 *	用于在dom就绪执行函数，比window.onload更快，无需等待图片与iframe等元素加载
	 */
	domReady = !+'\v1' ? function(fn){(function(){
			try{
				document.documentElement.doScroll('left');
			} catch (error){
				setTimeout(arguments.callee, 0);
				return;
			};
			fn();
		})();
	} : function(fn){
		document.addEventListener('DOMContentLoaded', fn, false);
	},
	
	//创建xhtml元素节点
	$ce = function (name){
		return document.createElement(name);
	},
	
	//创建文本节点
	$ctn = function (txt){
		return document.createTextNode(txt);
	},
	
	/*{
	 *	样式操作
	 */
	hasClass = function(element,className){
		var reg = new RegExp('(\\s|^)'+className+'(\\s|$)');
		return element.className.match(reg);
	},
	addClass = function(element,className){//添加类
		if(!hasClass(element, className)){
			element.className += ' '+className;
		};
	},
	removeClass = function(element,className){//移除类
		if(hasClass(element, className)){
			var reg = new RegExp('(\\s|^)'+className+'(\\s|$)');
			element.className = element.className.replace(reg,' ');
		};
	},
	getClass = function(element,attribute){//读取元素CSS属性值
		return element.currentStyle ? element.currentStyle[attribute] : document.defaultView.getComputedStyle(element, false)[attribute];   
	},
	addStyle = function(css) {//向head添加样式
		var D = document,
		S = this.style;
		if(!S){
			S = this.style = D.createElement('style');
			S.setAttribute('type', 'text/css');
			D.getElementsByTagName('head')[0].appendChild(S);
		};
		S.styleSheet && (S.styleSheet.cssText += css) || S.appendChild(D.createTextNode(css));
	},
	
	//鼠标事件分配
	cmd = function(evt, x) {
		var e = evt || window.event;
		C.x = e.clientX;
		C.y = e.clientY;
		C.t = parseInt(this.target.style.top);
		C.l = parseInt(this.target.style.left);
		C.w = this.target.clientWidth;
		C.h = this.target.clientHeight;
		C.ddw = dom.clientWidth;
		C.ddh = dom.clientHeight;
		C.dbw = Math.max(dom.clientWidth, dom.scrollWidth);
		C.dbh = Math.max(dom.clientHeight, dom.scrollHeight);
		C.sl = dom.scrollLeft;
		C.st = dom.scrollTop;
		onmouse = true;
		art = this;
		art.zIndex();
		if (x) {
			document.onmousemove = function(a) {
				resize.call(art, a, x);//调整对话框大小
			};
		} else {
			document.onmousemove = function(a) {
				drag.call(art, a);//拖动
			};
		};
		document.onmouseup = function() {
			onmouse = false;
			document.onmouseup = null;
			if (document.body.releaseCapture) art.target.releaseCapture();//IE释放鼠标监控
		};
		
		//IE下鼠标超出视口仍可监控
		if (document.body.setCapture) {
			art.target.setCapture();
			art.target.onmousewheel = function (){
				window.scrollTo(0, document.documentElement.scrollTop - window.event.wheelDelta / 4);
			};
		};
	},

	//拖动
	drag = function(a) {
		if (onmouse === false) return false;
		var e = a || window.event,
		_x = e.clientX,
		_y = e.clientY,
		_l = parseInt(C.l - C.x + _x - C.sl + dom.scrollLeft);
		_t = parseInt(C.t - C.y + _y - C.st + dom.scrollTop);
			
		if (getClass(art.target, 'position') == 'fixed' || getClass(art.target, 'fixed') == 'true') {
			if (_l + C.w > C.ddw) {
				_l = C.ddw - C.w;
			};
			if (_t + C.h > C.ddh) {
				_t = C.ddh - C.h;
			};	
		} else {
			if (_l + C.w > C.dbw) {
				_l = C.dbw - C.w;
			};
			if (_t + C.h > C.dbh) {
				_t = C.dbh - C.h;
			};
		};
		if (_l < 0) _l = 0;
		if (_t < 0) _t = 0;
		art.target.style.left = _l + 'px';
		art.target.style.top = _t + 'px';
		return false;
	},
	
	//调整对话框大小
	resize = function(a, x) {
		if (onmouse === false) return false;
		var e = a || window.event,
		_x = e.clientX,
		_y = e.clientY,
		_w = C.w + _x - C.x + x.w,
		_h = C.h + _y - C.y + x.h;
		if (_w > 0) x.obj.style.width = _w + 'px';
		if (_h > 0) x.obj.style.height = _h + 'px';
		return false;
	},
	
	//生成对话框结构
	newBox = function() {
		var j = -1;
		Each(boxs,
			function(o, i) {
				if (o.free === true) j = i;//重用标记
			}
		);
		if (j >= 0) return boxs[j];
		
		/*{
		 *	九宫格布局
		 *	
		 *	基于table 与 div,自适应
		 */
		var ui_title_wrap = $ce('td');//标题栏
		var ui_title = $ce('div');//标题与按钮外套
		var ui_title_text = $ce('div');//标题文字内容
		var ui_close = $ce('a');//关闭按钮
		ui_title_wrap.className = 'ui_title_wrap';
		ui_title.className = 'ui_title';
		ui_title_text.className ='ui_title_text';
		ui_close.className ='ui_close';
		ui_close.href = 'javascript:void(0)';
		ui_close.appendChild($ctn('×'));
		ui_title.appendChild(ui_title_text);
		ui_title.appendChild(ui_close);
		ui_title_wrap.appendChild(ui_title);
		
		var ui_content_wrap = $ce('td');//内容区
		var ui_content = $ce('div');//内容包裹
		ui_content_wrap.className = 'ui_content_wrap';
		ui_content.className = 'ui_content';
		ui_content_wrap.appendChild(ui_content);
		
		var yesBtn = $ce('button'),//确定按钮
		yesWrap = $ce('span'),
		noBtn = $ce('button'),//取消按钮
		noWrap = $ce('span');
		yesWrap.className = 'ui_yes';
		noWrap.className = 'ui_no';
		
		var ui_bottom_wrap = $ce('td');//底部按钮区
		var ui_bottom = $ce('div');
		var ui_btns = $ce('div');
		var ui_resize = $ce('div');
		ui_bottom_wrap.className = 'ui_bottom_wrap';
		ui_bottom.className = 'ui_bottom';
		ui_btns.className = 'ui_btns';
		ui_resize.className = 'ui_resize';
		ui_bottom.appendChild(ui_btns);
		ui_bottom.appendChild(ui_resize);
		ui_bottom_wrap.appendChild(ui_bottom);
		
		var ui_dialog_main = $ce('table');//内容表格
		var cTbody = $ce('tbody');
		ui_dialog_main.className = 'ui_dialog_main';
		for(var r = 0; r < 3; r++){
			_tr = $ce('tr');
			if (r == 0) _tr.appendChild(ui_title_wrap);
			if (r == 1) _tr.appendChild(ui_content_wrap);
			if (r == 2) _tr.appendChild(ui_bottom_wrap);
			cTbody.appendChild(_tr);
		};
		ui_dialog_main.appendChild(cTbody);
		
		var bTable = $ce('table');//外边框表格
		var bTbody = $ce('tbody');
		for(var r=0;r<3;r++){
			_tr = $ce('tr');
			for(var d=0; d<3; d++){
				_td = $ce('td');
				if(r == 1 && d == 1) {
					_td.appendChild(ui_dialog_main);
				}else{
					_td.className = 'ui_border r' +r+ 'd' +d;
				}
				_tr.appendChild(_td);
			};
			bTbody.appendChild(_tr);
		};
		bTable.appendChild(bTbody);

		var ui_dialog = $ce('div');
		ui_dialog.className = 'ui_dialog';
		ui_dialog.appendChild(bTable);
		if (IE6) {
			var ui_ie6_select_mask = $ce('iframe');
			ui_ie6_select_mask.className = 'ui_ie6_select_mask';
			ui_dialog.appendChild(ui_ie6_select_mask);
		};

		var ui_overlay = $ce('div');//锁屏遮罩
		ui_overlay.className = 'ui_overlay';
		ui_overlay.appendChild($ce('div'));
		
		var ui_dialog_wrap = $ce('div');//外套
		ui_dialog_wrap.className = 'ui_dialog_wrap';
		ui_dialog_wrap.appendChild(ui_dialog);
		
		var $ = {};
		$.target = ui_dialog;
		$.target.style.zIndex = ++z;
		
		//增大对话框叠加高度
		$.zIndex = function(o) {
			var x = o ? o : ui_dialog;
			x.style.zIndex = ++z;
			if (IE6) ui_dialog_wrap.style.zIndex = ++z;//IE6叠加高度受具有绝对或者相对定位的父元素z-index影响
			return $;
		};
		
		//关闭对话框
		var closeFn = null;
		$.close = function(f) {
			$.clearTimeout();
			if (f) {
				closeFn = f;
				return $;
			};
			
			onmouse = false;
			$.free = true;
			function _close(){
				$.clearTimeout();
				if (ie6PngRepair) {//如果开启了IE6 png自动修复则销毁元素，防止下一次重复调用而出现背景图像错位
					ui_dialog_wrap.parentNode.removeChild(ui_dialog_wrap);
					$.free = false;
					return false;
				};
				
				ui_dialog.style.cssText = ui_title_text.innerHTML = ui_content.innerHTML = ui_btns.innerHTML = ui_dialog_wrap.id = ui_content.id = '';//清空设置(cssText清除后将会隐藏对话框)
				removeClass(ui_content, 'ui_iframe');//移除嵌入框架专属样式
				removeClass(ui_dialog_wrap, 'ui_fixed');//移除静止定位属性
				bTable.className = '';//移除风格属性
				if (closeFn) {//执行回调函数
					closeFn();
					closeFn = null;
				};
			};
			if (ui_dialog_wrap.className.indexOf('ui_lock') > -1){
				$.alpha(ui_overlay, 1, function(){
					ui_overlay.style.cssText = '';//隐藏遮罩
					if (pageLock == 1) removeClass(document.getElementsByTagName('html')[0], 'ui_page_lock');//移除锁屏样式
					pageLock --;
					removeClass(ui_dialog_wrap, 'ui_lock');
					_close();
				});
			} else {
				_close();
			};
			var a = true;
			Each(boxs, function(o, i) {
				if (!o.free && o.lock) a = false;
			});
		};
		 var timeoutArray=new Array();
		//定时关闭对话框
		$.time = function(t) {
			var timeoutId=setTimeout(function(){
				$.close();
			}, 1000 * t);
			timeoutArray.push(timeoutId);
			return $;
		};
		$.clearTimeout=function(){
			while(timeoutArray.length>0){
				var timeoutId=timeoutArray.shift();
				if(timeoutId){
			       clearTimeout(timeoutId); 
				}
			}
		};
		//消息内容构建(标题,url,html,确定回调函数,取消回调函数,确定按钮文本,取消按钮文本,样式)
		$.html = function(title, url, content, yesFn, noFn, yesText, noText, style, closeFn, time, id) {
			ui_title_text.innerHTML = '<span class="ui_title_icon"></span>' +title;//写入标题
			if (id) {
				ui_dialog_wrap.id = id;//给对话框定义唯一ID
				ui_content.id = id+ 'Content';//给消息区添加ID
			};
			var _this = this;
			if (yesFn) {
				yesBtn.innerHTML = yesText;
				noBtn.innerHTML = noText;
				yesWrap.appendChild(yesBtn);
				ui_btns.appendChild(yesWrap);
				if (noFn) {
					noBtn.onclick = function() {
						var n = noFn();
						if (n == undefined || n) _this.close();//如果回调函数返回false则不关闭对话框
					};
					noWrap.appendChild(noBtn);
					ui_btns.appendChild(noWrap);
				} else {
					noFn = null;
				};
				yesBtn.onclick = function() {
					var y = yesFn();
					if (y == undefined || y) _this.close();//如果回调函数返回false则不关闭对话框
				};
			};
			
			if (content) {
				ui_content.innerHTML = '<span class="ui_dialog_icon"></span>' + content;//写入消息内容
			} else {
				var f = $ce('iframe');//iframe消息
				f.src = url;
				ui_content.appendChild(f);//写入嵌入式窗口
				addClass(ui_content, 'ui_iframe');
			};
			bTable.className += '' + style;//写入'style'参数定义的类
			ui_dialog.style.display = 'block';//显示对话框
			
			//自动赋焦点会造成页面滚动条重新定位,哪怕恢复之前的位置也没有用,故注释掉此代码.囧
			if (closeFn) $.close(closeFn);
			if (time){ 
				$.time(time);
			}else{
				$.clearTimeout();
			}
			$.free = false;
			return $;
		};//$.html end
		
		//锁屏
		$.lock = function(){
			var h = document.getElementsByTagName('html')[0];
			addClass(h, 'ui_page_lock');
			addClass(ui_dialog_wrap, 'ui_lock');
			$.zIndex(ui_overlay);
			ui_dialog_wrap.appendChild(ui_overlay);
			ui_overlay.style.display = 'block';
			pageLock ++;
			$.alpha(ui_overlay, 10);
			return $;
		};
		
		//透明渐变(元素, 初始透明值, 回调函数, [自身调用赋值])
		$.alpha = function(obj, int , fn, x){
			if(!x) i = int;
		 	s = 0.5;
			s = (int == 0) ? s : -s;
			i += s;
			if(IE){
			  try{
				if(obj.filters){
					 obj.filters.alpha.opacity = i * 10;
				 }else{
					 obj.style.filter = "alpha(opacity=" + (i * 10) + ")";
				 }
			   }catch(e){
				    obj.style.filter = "alpha(opacity=" + (i * 10) + ")";
			   }
			}else{
				obj.style.opacity = i;
			}
			
			if (i > 0 && i < 1) {
				setTimeout(function(){
					$.alpha(obj, int, fn, i);
				}, 0);
			} else if(fn) {
				fn();
			};
			return $;
		};
		
		//位置(宽度, 高度, 横坐标, 纵坐标, 静止定位, 关闭时的回调函数)
		$.align = function(width, height, left, top, fixed, lock, c) {
			//如果不带单位则使用像素为单位
			if(parseInt(width) == width) width = width + 'px';
			if(parseInt(height) == height) height = height + 'px';
			ui_content_wrap.style.width = width;
			ui_content_wrap.style.height = height;
			var dd = document.documentElement;
			var db = document.body;
			C.l = 0;
			C.t = 0;
			C.w = ui_dialog.clientWidth;
			C.h = ui_dialog.clientHeight;
			C.ddw = dom.clientWidth;
			C.ddh = dom.clientHeight;
			C.dbw = Math.max(dom.clientWidth, dom.scrollWidth);
			C.dbh = Math.max(dom.clientHeight, dom.scrollHeight);
			//C.sl = dom.scrollLeft;
			C.sl = Math.max(dd.scrollLeft, db.scrollLeft);//兼容chrome与Safari
			//C.st = dom.scrollTop;
			C.st = Math.max(dd.scrollTop, db.scrollTop);
			
			if (lock) fixed = true;
			var minX, minY, maxX, maxY, centerX, centerY;
			if (fixed) {
				if (IE6) addClass(document.getElementsByTagName('html')[0], 'ui_ie6_fixed');
				addClass(ui_dialog_wrap, 'ui_fixed');
				
				minX = 0;
				maxX = C.ddw - C.w;
				centerX = maxX / 2;
				minY = 0;
				maxY = C.ddh - C.h;
				//黄金比例垂直居中
				centerY = (C.ddh * 0.382 - C.h / 2 > 0) ?  C.ddh * 0.382 - C.h / 2 : maxY / 2;
			} else {
				minX = C.sl;
				maxX = C.ddw + minX - C.w;
				centerX = maxX / 2;
				minY = C.st;
				maxY = C.ddh + minY - C.h;
				//黄金比例垂直居中
				centerY =  (C.ddh * 0.382 - C.h / 2 + minY > minY) ? C.ddh * 0.382 - C.h / 2 + minY : (maxY + minY) / 2;
			};
			if(left == 'center'){
				C.l = centerX > 0 ? centerX : 0;
			}else if(left == 'left'){
				C.l = minX;
			}else if(left == 'right'){
				C.l = maxX;
			}else{
				if (fixed) left = left - C.sl;//把原点移到浏览器视口
				if (left < minX) {
					left = left + C.w;
				} else if (left > maxX) {
					left = left - C.w;
				};
				C.l = left;
			};
			if (top == 'center'){
				C.t = centerY > 0 ? centerY : 0;
			} else if (top == 'top'){
				C.t = minY;
			} else if (top == 'bottom'){
				C.t = maxY;
			} else {
				if (fixed) top = top - C.st;//把原点移到浏览器视口
				if (top < minY) {
					top = top + C.h;
				} else if (top > maxY) {
					top = top - C.h;
				};
				C.t = top;
			};
			ui_dialog.style.left = C.l + 'px';
			ui_dialog.style.top = C.t + 'px';
			if (lock) $.lock();
			$.zIndex(ui_dialog);
			return $;
		};
		
		//拖动事件
		Each([ui_title_text], function(o, i) {
			o.onmousedown = function(a) {
				cmd.call($, a, false);
				addClass(ui_dialog_wrap, 'ui_move');
			};
			o.onmouseup = function() {//IE未知原因导致此无效,待查
				removeClass(ui_dialog_wrap, 'ui_move');
			};
			o.onselectstart = function(){
				return false;//禁止选择文字
			};
		});
		
		//调整窗口大小的把柄事件
		ui_resize.onmousedown = function(a) {
			var d = ui_dialog;
			var c = ui_content_wrap;
			cmd.call($, a, {obj:c, w:c.clientWidth - d.clientWidth, h:c.clientHeight - d.clientHeight });
		};
		
		//鼠标靠近按钮触发样式
		if (IE6) {
			Each([yesWrap, noWrap], function(o, i) {
				o.onmouseover = function() {
					addClass(o, 'ui_hover');
				};
				o.onmouseout = function() {
					removeClass(o, 'ui_hover');
				};
			});
		};
		
		//关闭按钮事件
		ui_close.onclick = function(){$.close();};
		document.onkeyup = function(evt){//ESC键关闭弹出层
			var e = evt || window.event;
			if(e.keyCode == 27) $.close();
		};
		
		//向页面插入对话框代码
		document.body.appendChild(ui_dialog_wrap);

		return boxs[boxs.push($) - 1];
	};//newBox end
	
	/*{
	 *	webAlert兼容框架样式[内部版本1.0.5]
	 *	
	 *	支持跨浏览器全屏屏遮罩, IE6完美静止定位支持, IE6下拉控件遮盖, 消息智能对齐
	 *	如果皮肤CSS需要针对IE6应用png 32透明和背景位置bug修复，请写入这句：* html { ie6PngRepair:true }
	 *	关闭IE6中下拉控件可被对话框强制遮盖的功能(因为开启后透明的皮肤下方将出现白底)，请在皮肤CSS中写入这句：* html .ui_ie6_select_mask { display:none!important }
	 */
	var artLayout = '* html body{margin:0}.ui_title_icon,.ui_content,.ui_dialog_icon,.ui_btns span{display:inline-block;*zoom:1;*display:inline}.ui_dialog{text-align:left;display:none;position:absolute;top:0;left:-99999em;_overflow:hidden}.ui_dialog table{border:0;margin:0;border-collapse:collapse}.ui_dialog td{padding:0}.ui_title_icon{vertical-align:middle}.ui_title_text{overflow:hidden;cursor:default;-moz-user-select:none;user-select:none}.ui_close{display:block;position:absolute;outline:none}.ui_content_wrap{height:auto;text-align:center}.ui_content{margin:0px;text-align:left}.ui_dialog_icon{vertical-align:middle}.ui_content.ui_iframe{margin:0;*padding:0;display:block;height:100%}.ui_iframe iframe{width:100%;height:100%;border:none;overflow:auto}.ui_bottom{position:relative}.ui_resize{position:absolute;right:0;bottom:0;z-index:1;cursor:nw-resize;_font-size:0}.ui_btns{text-align:center;white-space:nowrap}.ui_btns span{margin:5px 10px}.ui_btns button{cursor:pointer}.ui_overlay{display:none;position:absolute;top:0;left:0;width:100%;height:100%;filter:alpha(opacity=0);opacity:0;_overflow:hidden}.ui_overlay div{height:100%}* html .ui_ie6_select_mask{width:99999em;height:99999em;position:absolute;top:0;left:0;z-index:-1}.ui_move .ui_title_text{cursor:move}html >body .ui_dialog_wrap.ui_fixed .ui_dialog{position:fixed}* html .ui_dialog_wrap.ui_fixed .ui_dialog{fixed:true}* html.ui_ie6_fixed{background:url(*) fixed}* html.ui_ie6_fixed body{height:100%}* html .ui_dialog_wrap.ui_fixed{width:100%;height:100%;position:absolute;left:expression(documentElement.scrollLeft+documentElement.clientWidth-this.offsetWidth);top:expression(documentElement.scrollTop+documentElement.clientHeight-this.offsetHeight)}html.ui_page_lock >body{overflow:hidden}* html.ui_page_lock{overflow:hidden}* html.ui_page_lock select,* html.ui_page_lock .ui_ie6_select_mask{visibility:hidden}html.ui_page_lock >body .ui_dialog_wrap.ui_lock{width:100%;height:100%;position:fixed;top:0;left:0}';
	addStyle(artLayout);
	/*}*/
	
	if (IE6) {
		document.execCommand('BackgroundImageCache', false, true);//开启IE6CSS背景图片缓存
		/*{
		 *	IE6 PNG 32 透明与背景位置修复
		 *
		 *	在CSS文件 写入 * html { ie6PngRepair:true; } 即可开启此功能，默认关闭
		 *	开启此功能会导致webAlert遮盖不住IE6的下拉控件，建议针对IE6制作全透明的png 8位或者gif的背景
		 *	开启此功能让调整对话框大小拖动手柄失效
		 */
		//ie6PngRepair = getClass(document.getElementsByTagName('html')[0], 'ie6PngRepair') == 'true' ? true : false;//检验皮肤CSS中是否开启此功能
		if (ie6PngRepair) {
			//png背景重复与定位支持
			var script = $ce('script');
			script.src = path + '/iepngfix/iepngfix_tilebg.js';//修复png css背景位置定位
			document.getElementsByTagName('head')[0].appendChild(script);
			
			//png背景半透明支持
			addStyle('.ui_resize, .ui_ie6_select_mask { display:none; } td.ui_border, td.ui_title_wrap *, .ui_dialog_icon  { behavior: url("' +path+ '/iepngfix/iepngfix.htc")}');//修复png半透明(没有写上按钮，因为实际应用中有点小问题.囧)
		};
	};
	/*}*/
	domReady(function(){
		//对现代浏览器预加载结构与背景图片
		if (!IE) webAlert({}, function(){}, function(){}).close();
	});
	window.webAlert = load;
})();
/**
 *  组装合买弹出层html代码
 * @param userName 合买方案发起者 例如:北单高手
 * @param lotteryName 彩票种类中文名称 例如 双色球
 * @param buyAmount 认购金额 例如 20
 * @param confirmBetHrefId 确认投注按钮(超链接)id
 * @return html code
 */
function createWebAlertContext_hm2(userName,lotteryName,buyAmount,confirmBetHrefId){
	var arr=new Array();
	arr.push('<div class="qrgm_box">');
	arr.push('<div class="c_c">');
	arr.push('<div class="p_lft">');
	arr.push('<div class="m_rt">');
	arr.push('<p class="text999 txt_center">本次认购<span class="txt_333">'+userName+'</span>发起的 <span class="red">'+lotteryName+'</span> 合买方案:</p>');
	arr.push('<p class="txt_center">认购金额: <strong class="red font16">'+commSplit(buyAmount,3,',')+'</strong> 元</p>');
	arr.push('</div>');
	arr.push('</div>');
	arr.push('</div>');
	arr.push('<div class="c_b">');   		
	arr.push('<a id="'+confirmBetHrefId+'"  class="btn_80_28_a" href="javascript:void(0)" >确认投注</a>'); 
	arr.push('</div>');
	arr.push('</div>');
	return arr.join("");
}
/**
 * 金额字符分割方法
 * @param str 字符串/数字  例如：2000
 * @param step 多少个字符分割 例如：3
 * @param splitor 分割字符 例如 ,
 * @return
 */
function commSplit (str, step, splitor) {  
    str = str.toString();
	var result = [];
	if (str.indexOf('.') >= 0) {
		result.push(str.split('.')[0]);
		result.push('.' + str.split('.')[1]);
	} else {
		result.push(str);
	}
	var len = result[0].length;
	if (len > step) {
		var l1 = len % step, l2 = parseInt(len / step), arr = [], first = result[0]
				.substr(0, l1);
		if (first != '') {
			arr.push(first);
		}
		for ( var i = 0; i < l2; i++) {
			arr.push(result[0].substr(l1 + i * step, step));
		}
		result[0] = arr.join(splitor);
	}
	return result.join('');  
}