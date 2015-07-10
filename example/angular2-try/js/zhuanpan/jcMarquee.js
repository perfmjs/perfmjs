// 文字无限滚动插件
;(function($){
	$.fn.jcMarquee = function(options) {
		var defaults = {             // 插件默认的一些参数
			'margin_bottom':'0',   // 距离底部的距离
			'margin_right':'0',    // 距离右边的距离
            'speed':'10'            // 文字滚动速度
		};
		var options = $.extend(defaults,options);      // 将两个或更多对象的内容合并到第一个对象。
		return this.each(function() {
	        var $marquee = $(this),              // 获得本身这个对象
			    $marquee_scroll = $marquee.children('ul');        
			$marquee_scroll.append("<li class='clone'>"+"</li>");
			var cloneLi = $marquee_scroll.find('li.clone');
			$marquee_scroll.find('li').eq(0).children().clone().appendTo(cloneLi); // 对象中的实际内容被复制了一份，包含了两个li，当然li标签下的div也
                                                                                    //   多了一倍；复制的目的在于给文字不间断向左滚动提供过渡。
			var $marquee_left = $marquee_scroll.find('li');

            var x = 0;
            $marquee_scroll.css('width','100000%');
            $marquee_left.find('div').css({'margin-right':options.margin_right});  // 根据参数设置样式
            $marquee_left.css({'margin-right':options.margin_right});
            function Marquee_x(){
                $marquee.scrollLeft(++x);                   // 设置每个匹配元素的水平滚动条位置。
                var _margin = parseInt($marquee_left.find('div').css('margin-right'));
                if(x==$marquee_left.width()+_margin) { x = 0 };  // 当文字滚动一遍后归0，再等待下一轮的滚动，从而达到文字不间断向上滚动的效果；
            };
            var MyMar=setInterval(Marquee_x,options.speed);  // setInterval() 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式。
            $marquee.hover(function(){    // 鼠标悬浮事件
                clearInterval(MyMar);      // clearInterval() 方法可取消由 setInterval() 设置的 timeout。
            },function(){
                MyMar=setInterval(Marquee_x,options.speed);
            });
		});
	};
})(jQuery);