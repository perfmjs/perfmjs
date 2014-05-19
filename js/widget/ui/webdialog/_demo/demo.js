(function(){

	//判断IE6
	var isIE6 = !+'\v1' && ([/MSIE (\d)\.0/i.exec(navigator.userAgent)][0][1] == 6);
	
	//document.getElementById简化函数
	var _$ = function (id){
		return 'string' == typeof id ? document.getElementById(id) : id;
	};
	
	//页面就绪，允许你绑定一个在DOM文档载入完成后执行的函数
	var domReady = !+'\v1' ? function(f){(function(){
			try{
				document.documentElement.doScroll('left');
			} catch (error){
				setTimeout(arguments.callee, 0);
				return;
			};
			f();
		})();
	} : function(f){
		document.addEventListener('DOMContentLoaded', f, false);
	};
	
	//在页面就绪后绑定事件
	domReady(function(){
		_$('page').style.display = 'block';
		
	
		//--------------------------webAlert演示脚本开始------------------------------//
		_$('web_btn1').onclick = function(){
			webAlert({title:'图片查看',lock:true,  time:2, content:'<img width="300" height="200" src="http://www.hunanyishi.cn/images/main.jpg" />'});
			return false;
		};
		
		_$('web_btn2').onclick = function(){
			webAlert({title:'google', url:'http://code.google.com/p/webAlert/', width:640, height:320});//url参数其实就是iframe
			return false;
		};
		
		_$('web_btn3').onclick = function(){
			webAlert({title:'功夫兔', content:'<object width="420" height="363"><param name="movie" value="http://www.tudou.com/v/bXwe7XgTxuA"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><param name="wmode" value="opaque"></param><embed src="http://www.tudou.com/v/bXwe7XgTxuA" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" wmode="opaque" width="420" height="363"></embed></object>', fixed:true});
			return false;
		};
		
		_$('web_btn4').onclick = function(){
			webAlert({content:'你人品稳定么？', fixed:true, yesText:'我很稳定', style:'confirm'}, function(){}, function(){});//style参数可以填写多个，用空格隔开。具体有什么请看皮肤css文件
			return false;
		};
		
		_$('web_btn5').onclick = function(){
			webAlert({content:'我很稳定', style:'alert', lock:true}, function(){});//lock参数就是锁屏，它会中断用户操作，用于显示非常重要的消息。慎用
			return false;
		};
		
		_$('web_btn6').onclick = function(e){
			//获取对象的坐标，让对话框在按钮附近弹出
			var e = e || window.event,
			_x,
			_y;
			if(e.pageX || e.pageY){
				_x = e.pageX;
				_y = e.pageY;
			} else {
				_x = e.clientX + document.body.clientLeft;
				_y = e.clientY + Math.max(document.body.scrollTop, document.documentElement.scrollTop);
			};
			
			var _this = this;
			webAlert({id:'menu_4834783',content:'<input style="width:200px;" id="M_dfd" type="text" value="hello world!" />',left:_x, top:_y, style:'noTitle noBorder'}, function(){ _this.innerHTML = _$('M_dfd').value; });//使用id参数，可以防止点击弹出多个对话框
			return false;
		};
		
		_$('web_btn7').onclick = function(){
			webAlert({content:'您收到 <strong>2</strong> 条消息', left:'right', top:'bottom', time:'100', fixed:true});//left和top坐标可以使用关键字，当然也可以使用数字
			return false;
		};
		//--------------------------webAlert演示脚本结束------------------------------//
		
		//皮肤切换(不支持IE6，因为png皮肤的缘故)
		if (!isIE6) {
			function mySkin(s){
				_$('webAlertSkin').href = s;
			};
			_$('skin_0').click();
			_$('skin_0').onclick = function(){
				mySkin('skin/aero/aero.css');
			};
			_$('skin_1').onclick = function(){
				mySkin('skin/chrome/chrome.css');
			};
			_$('skin_2').onclick = function(){
				mySkin('skin/facebook/facebook.css');
			};
			_$('skin_3').onclick = function(){
				mySkin('skin/mini/mini.css');
			};
			_$('skin_4').onclick = function(){
				mySkin('skin/aero/aero.css');
				$('skin_0').click();
				webAlert({content:'自己动手，丰衣足食', lock:true});
			};
			_$('showBg').onclick = function(){
				if (!$('test_3544')) {
					document.getElementsByTagName('body')[0].className = 'showBg';
					webAlert({id:'test_3544', content:'<div id="topMenu" style="background:#000; width:200px; height:2em;line-height:2em;text-align:center; filter:alpha(opacity=70); opacity:0.7;">[<a href="#" style="color:#FFF" onclick="showWin();return false">打开新对话框</a>]&nbsp;&nbsp;[<a id="bgCloseBtn" href="#" style="color:#FFF" onclick="bgShow();return false">关闭</a>]</div>', left:'left', top:'top', style:'noSkin', fixed:true});
				} else {
					bgShow();
				};
				return false;
			};
		};
		
	
		
		
	});

})();

//显示一个新对话框
function showWin(){
			webAlert({content:'欢迎使用 "webAlert" 对话框组件！', fixed:true, lock:false,style:'succeed'}, function(){webAlert({title:' ', content:'谢谢观赏', lock:true, time:2})});
};

//显示背景
function bgShow(){
	var body = document.getElementsByTagName('body')[0];
	if(body.className != 'showBg') {
		body.className = 'showBg';
		document.getElementById('bgCloseBtn').innerHTML = '关闭背景';
	} else {
		body.className = '';
		document.getElementById('bgCloseBtn').innerHTML = '打开背景';
	};
};