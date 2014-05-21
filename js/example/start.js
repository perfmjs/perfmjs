/**
 * 模块加载管理类，负责所有模块的注册及应用程序的初始化入口。
 * 模块的加载分为三类：
 * 1） 页面load时就需要被加载，并需要立即执行初始化的模块。									-- 首屏加载模块(NormalModule)
 * 2） 页面load时就需要被加载，但不需要立即执行初始化，而是后期通过事件驱动才初始化的模块。 -- 延迟初始化模块(LazyInitModule)
 * 3） 页面load完成后，通过事件驱动加载的模块，譬如 曝光事件，click事件、mouseover事件等。  -- 延迟加载模块(LazyLoadModule)
 * 
 * 以上三种模块都在此类中统一定义管理，注册和初始化的触发在此类中完成。
 * date:2012.11.30
 */
perfmjs.plugin('start', function($$) {
	$$.base("base.start", {
		init: function() {
			$$.app.newInstance();
			this.firstViewModuleInit();
            this.tryJQuery();
			return this;
		},
		
		/**
		* 所有的普通模块的注册及初始化操作定义在此函数中。
		* 默认情况下，普通模块注册时并不会自动初始化。若想改变默认值，则config中添加{init:true}参数
		*/
		firstViewModuleInit:function() {
			$$.app.instance.register("module1", $$.module1);
			$$.app.instance.register("module2", $$.module2, {callback:function(){
				//alert('started base.module2');
			}});
			$$.app.instance.register("module3", $$.module3);
			$$.app.instance.startAll();
		},
        /**
         * 测试jquery功能
         */
        tryJQuery: function() {
            if (!$$.utils.isJQueryLoaded()) {
                alert('如果想使用jQuery框架的功能，请加载jquery模块!');
                return;
            }
            $('#jq_try_btn').unbind();
            $('#jq_try_btn').bind('click', function() {
                alert('jQuery is loaded, clicked me!');
            });
        },
		end:0
	}, $$.base.prototype, $$.base.defaults);
	$$.base.start.defaults = {
		lazyurl: $$.appconfig.lazymodule,
		scope: 'singleton',
		end: 0
	};
	//整个应用的入口函数
	$$.ready(document, function() {
		$$.start.newInstance();
	});
});
