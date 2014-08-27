/**
 * config.js
 * @overview:搜索环境和参数配置
 * @date: 2012-11-30
*/
perfmjs.plugin('appconfig', function($$) {
	$$.utils.namespace('appconfig');
	$$.appconfig.lazymodule = {
		lazymodule1:{
			js: ['lib/example/lazyloadmodule1.js'],
			css:[$$.currentDomain + '/perfmjs/css/app/search/v4.0/core/example/lazyloadmodule1.css']
		},
		//这里示例了一个延迟加载模块有多种展现模式时的文件定义方式（魔方项目）
		lazymodule2:{
			combine1:{
				js: ['lib/example/lazyloadmodule2.js'],
				css:[$$.currentDomain + '/perfmjs/css/app/search/v4.0/core/example/lazyloadmodule21.css']
			},
			combine2:{
				js: ['lib/example/lazyloadmodule2.js'],
				css:['currentDomain/perfmjs/css/app/search/v4.0/core/example/lazyloadmodule22.css']
			},
			combine3:{
				js: ['lib/example/lazyloadmodule2.js'],
				css:['currentDomain/perfmjs/css/app/search/v4.0/core/example/lazyloadmodule33.css']
			}
		},
		lazymodule3:{
			js: ['lib/example/lazyloadmodule3.js'],
			css:['currentDomain/perfmjs/css/app/search/v4.0/core/example/lazyloadmodule3.css']
		},
		bigrender1:{
			combine1:{
				js: ['lib/example/bigrender1.js'],
				css:['currentDomain/perfmjs/css/app/search/v4.0/core/example/bigrender1.css']
			}
		},
		loadqq:{
			js: ['lib/example/loadqq.js'],
			css:[]
		},
		end:0
	};
	$$.appconfig.events = {
		heartbeat: 'perfmjs/module/heartbeat',
		end:0
	};
});