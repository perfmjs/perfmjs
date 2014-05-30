perfmjs.plugin('module1', function($$) {
	$$.base("base.module1", {
		init: function(eventproxy) {
            this.options['eventproxy'] = eventproxy;
			this._bindEvent();
			return this;
		},
		
		//简易的MVC分层模式，以下三个函数分别对应controller、modal、view层。
		//模块开发时请使用相同的函数名称，便于团队合作开发。
		_bindEvent: function() {
			var self = this;
            if ($$.utils.isJQueryLoaded()) {
                $('#eventproxyBtn').unbind();
                $('#eventproxyBtn').bind('click', function () {
                    self.options['eventproxy'].emit($$.appconfig.events.heartbeat, {msg: "send from Module1"});
                });
            }
		},
		
		_fetchdata: function(){
			$$.app.utility.getRPCJsonp(url,{
				data:"name=John&location=Boston",
				success:function(content){
					//do nothing
				}
			});
		},
		
		_renderView: function(node, data){
			var template = '<% for ( var i = 0; i < $data.length; i++ ) { %>\
				<dl>\
					<dt>\
						<a href="javascript:;">\
							<img alt="" src="<%= $data[i].src %>" width="100" />\
						</a>\
					</dt>\
					<dd class="title"><a href="javascript:;" title="<%= $data[i].title %>"><%= $data[i].title.cut(14,"...") %></a></dd>\
					<dd class="price"><span class="cny">￥</span> <em><%= $data[i].price.toFixed(2) %></em></dd>\
					<dd class="describe"><%= $util.trim($data[i].describe) %></dd>\
				</dl>\
				<% } %>';
			$$.app.config.renderHTML(template,data,node);
		},
		end: 0
	});
	$$.base.module1.defaults = {
        eventproxy: {},
		scope: 'singleton',
		end: 0
	};
});